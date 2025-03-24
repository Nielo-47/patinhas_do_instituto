import { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
import Cat, { CatData } from "../models/cat";

interface Payload {
  eventType: string;
  new: any;
  old: any;
}

interface OnDataChange {
  (callback: (currentData: Cat[]) => void): void;
}
export async function addCat(
  database: SupabaseClient,
  cat: Cat
): Promise<void> {
  const { data, error } = await database.from("cats").insert(cat.asDict());
  if (error) throw error;
}

export async function getCat(
  database: SupabaseClient,
  id: string
): Promise<Cat> {
  const { data, error } = await database.from("cats").select("*").eq("id", id);
  if (error) throw error;
  return Cat.fromDict(data[0]);
}

export async function updateCat(
  database: SupabaseClient,
  cat: Cat
): Promise<void> {
  const { data, error } = await database
    .from("cats")
    .update(cat.asDict())
    .eq("id", cat.id);
  if (error) throw error;
}

export async function deleteCat(
  database: SupabaseClient,
  id: string
): Promise<void> {
  const { data, error } = await database.from("cats").delete().eq("id", id);
  if (error) throw error;
}
export function streamCats(
  database: SupabaseClient,
  initialData: Cat[],
  onDataChange: (currentData: Cat[]) => void,
  filter = null
): RealtimeChannel {
  const channelName = filter ? `cats-filtered` : `cats-all`;

  const subscription: RealtimeChannel = database
    .channel(channelName)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "gatos",
        filter: filter || undefined,
      },
      (payload: Payload) => {
        let updatedData = [...initialData];

        if (payload.eventType === "INSERT") {
          updatedData.push(Cat.fromDict(payload.new));
        } else if (payload.eventType === "UPDATE") {
          updatedData = updatedData.map((cat) =>
            cat.id === payload.new.id ? Cat.fromDict(payload.new) : cat
          );
        } else if (payload.eventType === "DELETE") {
          updatedData = updatedData.filter((cat) => cat.id !== payload.old.id);
        }

        console.log("Updated data:", initialData);

        onDataChange(updatedData);
      }
    )
    .subscribe();

  return subscription;
}

export async function getAllCats(database: SupabaseClient): Promise<Cat[]> {
  const { data, error } = await database.from("gatos").select("*");
  if (error) throw error;
  return (data || []).map((item) => Cat.fromDict(item));
}
