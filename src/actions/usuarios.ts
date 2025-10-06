"use server";

import { getDatabaseServerClient } from "@/supabase/server";

export interface Protetor {
  id: string;
  nome: string;
  email: string;
  fotos: string[];
  cadastrado_por: string | null;
  criado_em?: Date;
  atualizado_em: Date;
}

export async function obterProtetor(id: string): Promise<Protetor | null> {
  const database = await getDatabaseServerClient();
  const { data, error } = await database
    .from("protetores")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function obterTodosOsProtetores(): Promise<Protetor[]> {
  const database = await getDatabaseServerClient();
  const { data, error } = await database
    .from("protetores")
    .select("*")
    .order("nome");

  if (error) throw error;
  return data || [];
}

export async function criarProtetor(
  nome: string,
  email: string,
  password: string,
  fotos: string[] = []
): Promise<{ success: boolean; error?: string }> {
  try {
    const database = await getDatabaseServerClient();
    const { auth } = database;

    const { data: sessionData } = await auth.getSession();
    if (!sessionData.session) {
      return { success: false, error: "Voce precisa estar autenticado" };
    }

    const cadastradoPor = sessionData.session.user.id;

    const { data: authData, error: authError } = await auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
      },
    });

    if (authError || !authData.user) {
      return { success: false, error: authError?.message || "Erro ao criar usuario" };
    }

    const { error: dbError } = await database.from("protetores").insert({
      id: authData.user.id,
      nome,
      email,
      fotos,
      cadastrado_por: cadastradoPor,
    });

    if (dbError) {
      await auth.admin.deleteUser(authData.user.id);
      return { success: false, error: dbError.message };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Erro desconhecido" };
  }
}

export async function atualizarProtetor(
  id: string,
  dados: Partial<Protetor>
): Promise<{ success: boolean; error?: string }> {
  try {
    const database = await getDatabaseServerClient();

    const { error } = await database
      .from("protetores")
      .update(dados)
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Erro desconhecido" };
  }
}

export async function obterProtetorAtual(): Promise<Protetor | null> {
  try {
    const database = await getDatabaseServerClient();
    const { auth } = database;

    const { data: sessionData } = await auth.getSession();
    if (!sessionData.session) {
      return null;
    }

    return await obterProtetor(sessionData.session.user.id);
  } catch (error) {
    return null;
  }
}
