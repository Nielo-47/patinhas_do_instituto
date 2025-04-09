import { getDatabaseServerClient } from "@/supabase/server";
import { handleError } from "@/utils/handle_error";

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

export const signUpAction = async (email: string, password: string) => {
  try {
    const { auth } = await getDatabaseServerClient();
    const { data, error } = await auth.signUp({ email, password });

    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Error signing up");

    await auth.signUp({ email: email, password: password });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
