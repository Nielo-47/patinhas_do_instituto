"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./recuperarSenha.module.scss";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { updatePasswordAction } from "@/actions/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    const result = await updatePasswordAction(newPassword);

    if (result?.error) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }

    setStatus("success");
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <div className={styles.container}>
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Nova Senha</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Digite a nova senha"
          minLength={6}
          required
        />
        <button type="submit" className={styles.button}>
          Atualizar senha
        </button>
        {status === "success" && (
          <p className={styles.success}>
            <CheckCircle2 size={18} /> Senha redefinida com sucesso!
          </p>
        )}
        {status === "error" && (
          <p className={styles.error}>
            <AlertCircle size={18} /> Não foi possível atualizar a senha. $
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
