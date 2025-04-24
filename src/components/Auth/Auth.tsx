"use client";

import React, { useState, FormEvent, useEffect, useTransition } from "react";
import { AtSign, Key, Loader2, LogOut, User, UserPlus } from "lucide-react";
import styles from "./Auth.module.scss";
import {
  getAuthSessionAction,
  logInAction,
  logOutAction,
  resetPasswordAction,
  signUpAction,
} from "@/actions/auth";
import { getDatabaseBrowserClient } from "@/supabase/client";
import { error } from "console";

type Page = "login" | "cadastro" | "esqueciSenha" | "logout";

interface DialogLogInProps {
  closeDialog: () => void;
}

export default function DialogLogIn({ closeDialog }: DialogLogInProps) {
  const [page, setPage] = useState<Page>("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [nome, setNome] = useState("");
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const usuarioLogado = false;

  useEffect(() => {
    const saved = localStorage.getItem("lembrarEmail");
    const email = localStorage.getItem("email");

    const getUserSession = async () => {
      const { error, accessToken } = await getAuthSessionAction();

      if (!error) {
        setPage("logout");
      }
    };

    getUserSession();

    if (saved === "true") {
      setLembrar(true);
      setEmail(email || "");
    }
  }, []);

  useEffect(() => {
    setErrorMessage(null);
  }, [page]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    startTransition(async () => {
      try {
        const result = await logInAction(email, senha);
        if (result.errorMessage) {
          setErrorMessage(result.errorMessage);
          return;
        }

        if (lembrar) {
          localStorage.setItem("lembrarEmail", "true");
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("lembrarEmail");
          localStorage.removeItem("email");
        }

        // Handle successful login
        console.log("Login successful");
        setPage("logout");
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("Ocorreu um erro ao fazer login");
      }
    });
  };

  const handleCadastro = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const password = senha;
        const result = await signUpAction(email, password);

        if (result.errorMessage) {
          setErrorMessage(result.errorMessage);
          console.error("Error signing up:", result.errorMessage);
          return;
        }

        // Handle successful registration
        setPage("login");
        // You could add a success message here
      } catch (error) {
        console.error("Error during signup:", error);
        setErrorMessage("Ocorreu um erro ao cadastrar");
      }
    });
  };

  const handleEsqueciSenha = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const result = await resetPasswordAction(email, window.location.href);

      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
        console.error(
          "Erro ao enviar email de recuperação:",
          result.errorMessage
        );
        return;
      }

      // Handle successful password reset request
      console.log("Email de recuperação enviado para", email);
      // You could add a success message here
    } catch (error) {
      console.error("Password reset error:", error);
      setErrorMessage("Ocorreu um erro ao enviar o email de recuperação");
    }
  };

  async function handleLogout() {
    setErrorMessage(null);
    startTransition(async () => {
      try {
      const { errorMessage } = await logOutAction();

      if (errorMessage) {
        setErrorMessage(errorMessage);
        console.error("Erro ao fazer logout:", errorMessage);
        return;
      }

      // Handle successful logout
      setPage("login");
      } catch (error) {
      console.error("Logout error:", error);
      setErrorMessage("Ocorreu um erro ao fazer logout");
      }
    });
  }

  const renderContent = () => {
    if (usuarioLogado) {
      return <PaginaLogOut email={email} onSubmit={handleLogout} />;
    }

    switch (page) {
      case "login":
        return (
          <PaginaLogin
            email={email}
            senha={senha}
            lembrar={lembrar}
            onChangeEmail={(val) => setEmail(val)}
            onChangeSenha={(val) => setSenha(val)}
            onChangeLembrar={(val) => setLembrar(val)}
            onSubmit={handleLogin}
            onForgotPassword={() => setPage("esqueciSenha")}
            onGoToCadastro={() => setPage("cadastro")}
          />
        );
      case "cadastro":
        return (
          <PaginaCadastro
            nome={nome}
            email={email}
            senha={senha}
            onChangeNome={(val) => setNome(val)}
            onChangeEmail={(val) => setEmail(val)}
            onChangeSenha={(val) => setSenha(val)}
            onSubmit={handleCadastro}
            onGoToLogin={() => setPage("login")}
            isPending={isPending}
          />
        );
      case "esqueciSenha":
        return (
          <PaginaEsqueciSenha
            email={email}
            onChangeEmail={(val) => setEmail(val)}
            onSubmit={handleEsqueciSenha}
            onGoToLogin={() => setPage("login")}
          />
        );
      case "logout":
        return <PaginaLogOut email={email} onSubmit={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.dialog}>
      {isPending ? (
        <div className={styles.spinnerContainer}>
          <Loader2 className={styles.spinner} />
        </div>
      ) : (
        <>
          {renderContent()}
          <div className={styles.errorMessageContainer}>
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

type PaginaLoginProps = {
  email: string;
  senha: string;
  lembrar: boolean;
  onChangeEmail: (val: string) => void;
  onChangeSenha: (val: string) => void;
  onChangeLembrar: (val: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onForgotPassword: () => void;
  onGoToCadastro: () => void;
};

function PaginaLogin({
  email,
  senha,
  lembrar,
  onChangeEmail,
  onChangeSenha,
  onChangeLembrar,
  onSubmit,
  onForgotPassword,
  onGoToCadastro,
}: PaginaLoginProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.title}>Seja bem vindo Protetor!</h2>
      <hr className={styles.divider} />
      <div>
        <div className={styles.field}>
          <label>Email</label>
          <div className={styles.inputGroup}>
            <AtSign size={20} className={styles.icon} />
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => onChangeEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.field}>
          <label>Senha</label>
          <div className={styles.inputGroup}>
            <Key size={20} className={styles.icon} />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => onChangeSenha(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>
      </div>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="lembrar"
          checked={lembrar}
          onChange={(e) => onChangeLembrar(e.target.checked)}
        />
        <label htmlFor="lembrar">Lembrar deste email</label>
      </div>
      <button type="submit" className={styles.button}>
        Fazer Login
      </button>
      <div className={styles.links}>
        <button
          type="button"
          onClick={onForgotPassword}
          className={styles.linkButton}
        >
          Esqueci a senha
        </button>
        <button
          type="button"
          onClick={onGoToCadastro}
          className={styles.linkButton}
        >
          Cadastro
        </button>
      </div>
    </form>
  );
}

type PaginaCadastroProps = {
  nome: string;
  email: string;
  senha: string;
  onChangeNome: (val: string) => void;
  onChangeEmail: (val: string) => void;
  onChangeSenha: (val: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onGoToLogin: () => void;
  isPending: boolean;
};

function PaginaCadastro({
  nome,
  email,
  senha,
  onChangeNome,
  onChangeEmail,
  onChangeSenha,
  onSubmit,
  onGoToLogin,
  isPending,
}: PaginaCadastroProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.title}>Cadastro</h2>
      <hr className={styles.divider} />
      <div className={styles.field}>
        <label>Nome</label>
        <div className={styles.inputGroup}>
          <User size={20} className={styles.icon} />
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => onChangeNome(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.field}>
        <label>Email</label>
        <div className={styles.inputGroup}>
          <AtSign size={20} className={styles.icon} />
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.field}>
        <label>Senha</label>
        <div className={styles.inputGroup}>
          <Key size={20} className={styles.icon} />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => onChangeSenha(e.target.value)}
            required
            minLength={6}
          />
        </div>
      </div>
      <button type="submit" className={styles.button} disabled={isPending}>
        <UserPlus size={16} /> {isPending ? "Cadastrando..." : "Cadastrar"}
      </button>
      <div className={styles.links}>
        <button
          type="button"
          onClick={onGoToLogin}
          className={styles.linkButton}
          disabled={isPending}
        >
          Voltar para Login
        </button>
      </div>
    </form>
  );
}

type PaginaEsqueciSenhaProps = {
  email: string;
  onChangeEmail: (val: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onGoToLogin: () => void;
};

function PaginaEsqueciSenha({
  email,
  onChangeEmail,
  onSubmit,
  onGoToLogin,
}: PaginaEsqueciSenhaProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.title}>Esqueceu sua senha?</h2>
      <p className={styles.info}>
        Por favor, insira seu e-mail cadastrado para receber instruções para
        redefinir sua senha.
      </p>
      <div className={styles.field}>
        <label>Email</label>
        <div className={styles.inputGroup}>
          <AtSign size={20} className={styles.icon} />
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" className={styles.button}>
        Enviar E-mail
      </button>
      <div className={styles.links}>
        <button
          type="button"
          onClick={onGoToLogin}
          className={styles.linkButton}
        >
          Voltar para Login
        </button>
      </div>
    </form>
  );
}

type PaginaLogOutProps = {
  email: string;
  onSubmit: () => void;
};

function PaginaLogOut({ email, onSubmit }: PaginaLogOutProps) {
  return (
    <div className={styles.logout}>
      <h2 className={styles.title}>Bem vindo, Protetor!</h2>
      <p className={styles.info}>Logado como: {email || "email@exemplo.com"}</p>
      <button className={styles.button} onClick={onSubmit}>
        <LogOut size={16} />
        Fazer Logout
      </button>
    </div>
  );
}
