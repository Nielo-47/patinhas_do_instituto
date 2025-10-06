"use client";

import { useState, useContext } from "react";
import { UserContext } from "@/providers/UserContext";
import { adicionarGato, atualizarGato } from "@/actions/gatos";
import { DadosGato, Sexo, StatusInformacao, StatusGato } from "@/models/gato";
import { X } from "lucide-react";
import styles from "./CadastroGato.module.scss";

interface CadastroGatoProps {
  onClose: () => void;
  gato?: DadosGato | null;
  onSuccess?: () => void;
}

export default function CadastroGato({ onClose, gato, onSuccess }: CadastroGatoProps) {
  const { user } = useContext(UserContext);
  const isEditing = !!gato;

  const [formData, setFormData] = useState<Partial<DadosGato>>({
    nome: gato?.nome || "",
    sexo: gato?.sexo || Sexo.desconhecido,
    vacinado: gato?.vacinado || StatusInformacao.desconhecido,
    castrado: gato?.castrado || StatusInformacao.desconhecido,
    status: gato?.status || StatusGato.desconhecido,
    localHabitual: gato?.localHabitual || "",
    caracteristicas_marcantes: gato?.caracteristicas_marcantes || "",
    data_ultima_vacinacao: gato?.data_ultima_vacinacao || undefined,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!user) {
        setError("Você precisa estar autenticado");
        return;
      }

      const gatoData: DadosGato = {
        id: gato?.id || crypto.randomUUID(),
        nome: formData.nome!,
        sexo: formData.sexo!,
        vacinado: formData.vacinado!,
        castrado: formData.castrado!,
        status: formData.status!,
        localHabitual: formData.localHabitual!,
        caracteristicas_marcantes: formData.caracteristicas_marcantes || "",
        fotos: gato?.fotos || [],
        data_criacao: gato?.data_criacao || new Date(),
        data_ultima_vacinacao: formData.data_ultima_vacinacao
          ? new Date(formData.data_ultima_vacinacao)
          : undefined,
        criado_em: gato?.criado_em || new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      };

      if (isEditing) {
        await atualizarGato(gatoData);
      } else {
        await adicionarGato(gatoData);
      }

      if (onSuccess) {
        onSuccess();
      }

      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Erro ao salvar gato");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{isEditing ? "Editar Gato" : "Cadastrar Novo Gato"}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="nome">Nome *</label>
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
              <label htmlFor="sexo">Sexo *</label>
              <select
                id="sexo"
                value={formData.sexo}
                onChange={(e) => setFormData({ ...formData, sexo: e.target.value as any })}
                required
                disabled={loading}
              >
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="DESCONHECIDO">Desconhecido</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="vacinado">Vacinado *</label>
              <select
                id="vacinado"
                value={formData.vacinado}
                onChange={(e) => setFormData({ ...formData, vacinado: e.target.value as any })}
                required
                disabled={loading}
              >
                <option value="SIM">Sim</option>
                <option value="NAO">Não</option>
                <option value="DESCONHECIDO">Desconhecido</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="castrado">Castrado *</label>
              <select
                id="castrado"
                value={formData.castrado}
                onChange={(e) => setFormData({ ...formData, castrado: e.target.value as any })}
                required
                disabled={loading}
              >
                <option value="SIM">Sim</option>
                <option value="NAO">Não</option>
                <option value="DESCONHECIDO">Desconhecido</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                required
                disabled={loading}
              >
                <option value="campus">No Campus</option>
                <option value="tratamento">Em Tratamento</option>
                <option value="adotado">Adotado</option>
                <option value="falecido">Falecido</option>
                <option value="desconhecido">Desconhecido</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="data_ultima_vacinacao">Data da última vacinação</label>
              <input
                type="date"
                id="data_ultima_vacinacao"
                value={
                  formData.data_ultima_vacinacao
                    ? new Date(formData.data_ultima_vacinacao).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, data_ultima_vacinacao: e.target.value as any })
                }
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="localHabitual">Local onde costuma ser encontrado *</label>
            <input
              type="text"
              id="localHabitual"
              value={formData.localHabitual}
              onChange={(e) => setFormData({ ...formData, localHabitual: e.target.value })}
              placeholder="Ex: Prédio da Biblioteca"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="caracteristicas_marcantes">Características marcantes</label>
            <textarea
              id="caracteristicas_marcantes"
              value={formData.caracteristicas_marcantes}
              onChange={(e) =>
                setFormData({ ...formData, caracteristicas_marcantes: e.target.value })
              }
              placeholder="Ex: Mancha branca no peito, orelha cortada"
              rows={3}
              disabled={loading}
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? "Salvando..." : isEditing ? "Atualizar" : "Cadastrar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
