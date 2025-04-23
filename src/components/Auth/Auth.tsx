"use client";

import React, { useState, FormEvent } from "react";
import { AtSign, Key, User, UserPlus } from "lucide-react";
import styles from "./Auth.module.scss";

type Page = "login" | "cadastro" | "esqueciSenha" | "logout";

export default function DialogLogIn() {
  const [page, setPage] = useState<Page>("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [nome, setNome] = useState("");

  const usuarioLogado = false;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log("Fazer login", { email, senha, lembrar });
  };

  const handleCadastro = (e: FormEvent) => {
    e.preventDefault();
    console.log("Fazer cadastro", { nome, email });
  };

  const handleEsqueciSenha = (e: FormEvent) => {
    e.preventDefault();
    console.log("Recuperar senha para", email);
  };

  const renderContent = () => {
    if (usuarioLogado) {
      return <PaginaLogOut email={email} />;
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
            onChangeNome={(val) => setNome(val)}
            onChangeEmail={(val) => setEmail(val)}
            onSubmit={handleCadastro}
            onGoToLogin={() => setPage("login")}
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
      default:
        return null;
    }
  };

  return <div className={styles.dialog}>{renderContent()}</div>;
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
  onChangeNome: (val: string) => void;
  onChangeEmail: (val: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onGoToLogin: () => void;
};

function PaginaCadastro({
  nome,
  email,
  onChangeNome,
  onChangeEmail,
  onSubmit,
  onGoToLogin,
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
      <button type="submit" className={styles.button}>
        <UserPlus size={16} /> Cadastrar
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
};

function PaginaLogOut({ email }: PaginaLogOutProps) {
  return (
    <div className={styles.logout}>
      <h2 className={styles.title}>Bem vindo, Protetor!</h2>
      <p className={styles.info}>Logado como: {email || "email@exemplo.com"}</p>
      <button
        className={styles.button}
        onClick={() => console.log("Fazer Logout placeholder")}
      >
        Fazer Logout
      </button>
    </div>
  );
}
