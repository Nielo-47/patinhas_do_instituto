"use client";

import { useState } from "react";
import styles from "./Filtros.module.scss";
import { Search } from "lucide-react";

export default function Filtros({
  total = 97,
  mostrando = 50,
  aoCadastrar = () => {},
  aoPesquisar = (valor: string) => {},
}) {
  const abas = [
    { chave: "semCampus", label: "No Campus" },
    { chave: "emTratamento", label: "Em Tratamento" },
    { chave: "adotados", label: "Adotados!" },
    { chave: "falecidos", label: "Falecidos" },
    { chave: "desconhecido", label: "Desconhecido" },
  ];
  const [abaAtiva, setAbaAtiva] = useState(abas[0].chave);
  const [consulta, setConsulta] = useState("");

  const aoClicarAba = (chave: string) => {
    setAbaAtiva(chave);
    // opcional: notificar componente pai
  };

  const aoMudarBusca = (e: { target: { value: any } }) => {
    const valor = e.target.value;
    setConsulta(valor);
    aoPesquisar(valor);
  };

  return (
    <div>
      <div className={styles.container}>
        <nav className={styles.abas}>
          {abas.map(({ chave, label }) => (
            <button
              key={chave}
              className={
                chave === abaAtiva
                  ? `${styles.itemAba} ${styles.ativo}`
                  : styles.itemAba
              }
              onClick={() => aoClicarAba(chave)}
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

        <button className={styles.botaoCadastrar} onClick={aoCadastrar}>
          Cadastrar novo
        </button>
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
