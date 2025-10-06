"use client";

import { useState } from "react";
import { StatusGato } from "@/models/gato";
import styles from "./Filtros.module.scss";
import { Search } from "lucide-react";

interface FiltrosProps {
  total: number;
  mostrando: number;
  aoCadastrar?: () => void;
  aoPesquisar?: (valor: string) => void;
  aoMudarFiltro?: (status: StatusGato | null) => void;
  mostrarBotaoCadastro?: boolean;
}

export default function Filtros({
  total,
  mostrando,
  aoCadastrar = () => {},
  aoPesquisar = () => {},
  aoMudarFiltro = () => {},
  mostrarBotaoCadastro = false,
}: FiltrosProps) {
  const abas = [
    { chave: null, label: "Todos", status: null },
    { chave: "campus", label: "No Campus", status: StatusGato.no_campus },
    { chave: "tratamento", label: "Em Tratamento", status: StatusGato.em_tratamento },
    { chave: "adotado", label: "Adotados!", status: StatusGato.adotado },
    { chave: "falecido", label: "Falecidos", status: StatusGato.falecido },
    { chave: "desconhecido", label: "Desconhecido", status: StatusGato.desconhecido },
  ];

  const [abaAtiva, setAbaAtiva] = useState<string | null>(null);
  const [consulta, setConsulta] = useState("");

  const aoClicarAba = (chave: string | null, status: StatusGato | null) => {
    setAbaAtiva(chave);
    aoMudarFiltro(status);
  };

  const aoMudarBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setConsulta(valor);
    aoPesquisar(valor);
  };

  return (
    <div>
      <div className={styles.container}>
        <nav className={styles.abas}>
          {abas.map(({ chave, label, status }) => (
            <button
              key={chave || "todos"}
              className={
                chave === abaAtiva
                  ? `${styles.itemAba} ${styles.ativo}`
                  : styles.itemAba
              }
              onClick={() => aoClicarAba(chave, status)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className={styles.barraAcoes}>
        <span className={styles.textoInfo}>
          Mostrando {mostrando} de {total} gatos
        </span>

        {mostrarBotaoCadastro && (
          <button className={styles.botaoCadastrar} onClick={aoCadastrar}>
            Cadastrar novo
          </button>
        )}

        <div className={styles.wrapperBusca}>
          <Search />
          <input
            type="text"
            placeholder="Pesquisar"
            value={consulta}
            onChange={aoMudarBusca}
          />
        </div>
      </div>
    </div>
  );
}
