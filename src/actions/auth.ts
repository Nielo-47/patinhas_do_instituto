"use server";

import { getDatabaseServerClient } from "@/supabase/server";
import { handleError } from "@/utils/handle_error";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export const logInAction = async (email: string, password: string) => {
  try {
    const { auth } = await getDatabaseServerClient();
    const { error } = await auth.signInWithPassword({ email, password });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const logOutAction = async () => {
  try {
    const { auth } = await getDatabaseServerClient();
    const { error } = await auth.signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signUpAction = async (
  email: string,
  password: string,
  nome: string
) => {
  try {
    const database = await getDatabaseServerClient();
    const { auth } = database;

    const { data: sessionData } = await auth.getSession();
    if (!sessionData.session) {
      return { errorMessage: "Você precisa estar autenticado para cadastrar um protetor" };
    }

    const cadastradoPor = sessionData.session.user.id;

    const { data, error } = await auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
      },
    });

    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Erro ao criar usuário");

    const { error: dbError } = await database.from("protetores").insert({
      id: userId,
      nome,
      email,
      fotos: [],
      cadastrado_por: cadastradoPor,
    });

    if (dbError) {
      throw dbError;
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const resetPasswordAction = async (email: string, url:string) => {
  try {
    const { auth } = await getDatabaseServerClient();
    const { error } = await auth.resetPasswordForEmail(email, {
      redirectTo: `${url}/recuperar-senha`,
    });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export async function getAuthSessionAction() {
  const { auth } = await getDatabaseServerClient();

  const { data, error } = await auth.getSession();

  if (error || !data.session) {
    return { error: error?.message || "Session not found", accessToken: null };
  }

  return { accessToken: data.session.access_token };
}

export async function updatePasswordAction(newPassword: string) {
  const { auth } = await getDatabaseServerClient();
  const { error } = await auth.updateUser({ password: newPassword });
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/"); // Optional: clear any session caching
  return { success: true };
}
