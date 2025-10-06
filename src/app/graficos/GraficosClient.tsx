"use client";

import { useMemo } from "react";
import Link from "next/link";
import Gato, { StatusGato } from "@/models/gato";
import styles from "./graficos.module.scss";

interface GraficosClientProps {
  gatos: Gato[];
}

export default function GraficosClient({ gatos }: GraficosClientProps) {
  const stats = useMemo(() => {
    const total = gatos.length;
    const masculinos = gatos.filter((g) => g.sexo === "MASCULINO").length;
    const femininos = gatos.filter((g) => g.sexo === "FEMININO").length;
    const sexoDesconhecido = gatos.filter((g) => g.sexo === "DESCONHECIDO").length;

    const vacinados = gatos.filter((g) => g.vacinado === "SIM").length;
    const naoVacinados = gatos.filter((g) => g.vacinado === "NAO").length;

    const castrados = gatos.filter((g) => g.castrado === "SIM").length;
    const naoCastrados = gatos.filter((g) => g.castrado === "NAO").length;

    const noCampus = gatos.filter((g) => g.status === StatusGato.no_campus).length;
    const emTratamento = gatos.filter((g) => g.status === StatusGato.em_tratamento).length;
    const adotados = gatos.filter((g) => g.status === StatusGato.adotado).length;
    const falecidos = gatos.filter((g) => g.status === StatusGato.falecido).length;
    const desconhecido = gatos.filter((g) => g.status === StatusGato.desconhecido).length;

    return {
      total,
      sexo: {
        masculinos,
        femininos,
        desconhecido: sexoDesconhecido,
        percMasculinos: total > 0 ? Math.round((masculinos / total) * 100) : 0,
        percFemininos: total > 0 ? Math.round((femininos / total) * 100) : 0,
        percDesconhecido: total > 0 ? Math.round((sexoDesconhecido / total) * 100) : 0,
      },
      vacinacao: {
        vacinados,
        naoVacinados,
        percVacinados: total > 0 ? Math.round((vacinados / total) * 100) : 0,
      },
      castracao: {
        castrados,
        naoCastrados,
        percCastrados: total > 0 ? Math.round((castrados / total) * 100) : 0,
      },
      status: {
        noCampus,
        emTratamento,
        adotados,
        falecidos,
        desconhecido,
        percNoCampus: total > 0 ? Math.round((noCampus / total) * 100) : 0,
        percEmTratamento: total > 0 ? Math.round((emTratamento / total) * 100) : 0,
        percAdotados: total > 0 ? Math.round((adotados / total) * 100) : 0,
        percFalecidos: total > 0 ? Math.round((falecidos / total) * 100) : 0,
        percDesconhecido: total > 0 ? Math.round((desconhecido / total) * 100) : 0,
      },
    };
  }, [gatos]);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Estatísticas dos Gatos do Campus</h1>
        <p className={styles.total}>Total de gatos cadastrados: {stats.total}</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Distribuição por Sexo</h2>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={styles.label}>Masculino:</span>
              <span className={styles.value}>
                {stats.sexo.masculinos} ({stats.sexo.percMasculinos}%)
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Feminino:</span>
              <span className={styles.value}>
                {stats.sexo.femininos} ({stats.sexo.percFemininos}%)
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Desconhecido:</span>
              <span className={styles.value}>
                {stats.sexo.desconhecido} ({stats.sexo.percDesconhecido}%)
              </span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Status de Vacinação</h2>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={styles.label}>Vacinados:</span>
              <span className={styles.value}>
                {stats.vacinacao.vacinados} ({stats.vacinacao.percVacinados}%)
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Não vacinados:</span>
              <span className={styles.value}>{stats.vacinacao.naoVacinados}</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Status de Castração</h2>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={styles.label}>Castrados:</span>
              <span className={styles.value}>
                {stats.castracao.castrados} ({stats.castracao.percCastrados}%)
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Não castrados:</span>
              <span className={styles.value}>{stats.castracao.naoCastrados}</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Status Geral</h2>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={styles.label}>No Campus:</span>
              <span className={styles.value}>
                {stats.status.noCampus} ({stats.status.percNoCampus}%)
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Em Tratamento:</span>
              <span className={styles.value}>
                {stats.status.emTratamento} ({stats.status.percEmTratamento}%)
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Adotados:</span>
              <span className={styles.value}>
                {stats.status.adotados} ({stats.status.percAdotados}%)
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Falecidos:</span>
              <span className={styles.value}>
                {stats.status.falecidos} ({stats.status.percFalecidos}%)
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Desconhecido:</span>
              <span className={styles.value}>
                {stats.status.desconhecido} ({stats.status.percDesconhecido}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/" className={styles.button}>
          Ver gatos
        </Link>
      </div>
    </div>
  );
}
