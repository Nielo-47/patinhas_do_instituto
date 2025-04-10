"use server";

import { DadosGato, Foto } from "@/models/gato";
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

export async function deletarGato(id: string): Promise<void> {
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

export async function obterFotosDoGato(gatoId: string): Promise<Foto[]> {
  const database = await getDatabaseServerClient();

  const { data: list, error } = await database.storage
    .from("fotos")
    .list(gatoId + "/");

  if (error) throw error;

  const fotos: Foto[] = (list || []).map((file) => ({
    id: file.name.split(".")[0], // usando o nome do arquivo como ID (removendo extensão)
    url: database.storage.from(`fotos/${gatoId}`).getPublicUrl(file.name).data
      .publicUrl,
    gatoId: gatoId,
  }));

  return fotos;
}
