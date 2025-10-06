"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/providers/UserContext";
import { Protetor } from "@/actions/usuarios";
import { signUpAction } from "@/actions/auth";
import { User, Mail, UserPlus } from "lucide-react";
import styles from "./protetores.module.scss";

interface ProtetoresClientProps {
  protetores: Protetor[];
}

export default function ProtetoresClient({ protetores }: ProtetoresClientProps) {
  const { user, isProtetor } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signUpAction(formData.email, formData.password, formData.nome);

      if (result.errorMessage) {
        setError(result.errorMessage);
      } else {
        setSuccess(true);
        setFormData({ nome: "", email: "", password: "" });
        setTimeout(() => {
          setShowForm(false);
          setSuccess(false);
          window.location.reload();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar protetor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Protetores do Instituto</h1>
        <p>Pessoas dedicadas ao cuidado dos gatos do campus</p>
      </div>

      {isProtetor && (
        <div className={styles.actions}>
          <button onClick={() => setShowForm(!showForm)} className={styles.addButton}>
            <UserPlus size={20} />
            Cadastrar novo protetor
          </button>
        </div>
      )}

      {showForm && isProtetor && (
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Cadastrar Novo Protetor</h2>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>Protetor cadastrado com sucesso!</div>}

            <div className={styles.field}>
              <label htmlFor="nome">Nome completo</label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" disabled={loading} className={styles.submitButton}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={loading}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {protetores.map((protetor) => (
          <div key={protetor.id} className={styles.card}>
            <div className={styles.avatar}>
              <User size={48} />
            </div>
            <h3>{protetor.nome}</h3>
            <div className={styles.info}>
              <Mail size={16} />
              <span>{protetor.email}</span>
            </div>
          </div>
        ))}
      </div>

      {protetores.length === 0 && (
        <div className={styles.empty}>
          <p>Nenhum protetor cadastrado ainda.</p>
        </div>
      )}
    </div>
  );
}
