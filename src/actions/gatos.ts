"use server";

import { DadosGato } from "@/models/gato";
import { getDatabaseServerClient } from "@/supabase/server";

export async function adicionarGato(cat: DadosGato): Promise<void> {
  const database = await getDatabaseServerClient();
  const { data, error } = await database.from("gatos").insert(cat);
  if (error) throw error;
}

export async function obterGato(id: string): Promise<DadosGato> {
  const database = await getDatabaseServerClient();
  const { data, error } = await database.from("gatos").select("*").eq("id", id);
  if (error) throw error;
  return data[0];
}

export async function atualizarGato(cat: DadosGato): Promise<void> {
  const database = await getDatabaseServerClient();
  const { data, error } = await database
    .from("gatos")
    .update(cat)
    .eq("id", cat.id);
  if (error) throw error;
}

export async function deleteCat(id: string): Promise<void> {
  const database = await getDatabaseServerClient();
  const { data, error } = await database.from("gatos").delete().eq("id", id);
  if (error) throw error;
}

export async function obterTodosOsGatos(): Promise<DadosGato[]> {
  const database = await getDatabaseServerClient();
  const { data, error } = await database.from("gatos").select("*");
  if (error) throw error;
  return data || [];
}
