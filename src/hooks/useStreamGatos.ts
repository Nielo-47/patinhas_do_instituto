"use client";

import { DadosGato } from "@/models/gato";
import { getDatabaseBrowserClient } from "@/supabase/client";

interface Payload {
  eventType: string;
  new: any;
  old: any;
}

export async function streamGatos(
  initialData: DadosGato[],
  onDataChange: (currentData: DadosGato[]) => void,
  filter = null
): Promise<any> {
  const database = getDatabaseBrowserClient();

  const channel = database
    .channel(`cats-all`)
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
          updatedData.push(payload.new);
        } else if (payload.eventType === "UPDATE") {
          updatedData = updatedData.map((cat) =>
            cat.id === payload.new.id ? payload.new : cat
          );
        } else if (payload.eventType === "DELETE") {
          updatedData = updatedData.filter((cat) => cat.id !== payload.old.id);
        }

        onDataChange(updatedData);
      }
    )
    .subscribe();

  return channel;
}
