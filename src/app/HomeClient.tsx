"use client";

import { useState, useMemo, useContext } from "react";
import Gato, { StatusGato } from "@/models/gato";
import CartaoGato from "@/components/CartaoGato/CartaoGato";
import Filtros from "@/components/Filtros/Filtros";
import CadastroGato from "@/components/CadastroGato/CadastroGato";
import { UserContext } from "@/providers/UserContext";
import styles from "./home.module.scss";

interface HomeClientProps {
  gatos: Gato[];
}

export default function HomeClient({ gatos }: HomeClientProps) {
  const { isProtetor } = useContext(UserContext);
  const [filtroStatus, setFiltroStatus] = useState<StatusGato | null>(null);
  const [pesquisa, setPesquisa] = useState("");
  const [showCadastro, setShowCadastro] = useState(false);

  const gatosFiltrados = useMemo(() => {
    let resultado = gatos;

    if (filtroStatus) {
      resultado = resultado.filter((g) => g.status === filtroStatus);
    }

    if (pesquisa) {
      const termo = pesquisa.toLowerCase();
      resultado = resultado.filter(
        (g) =>
          g.nome.toLowerCase().includes(termo) ||
          g.localHabitual.toLowerCase().includes(termo) ||
          g.caracteristicas_marcantes.toLowerCase().includes(termo)
      );
    }

    return resultado;
  }, [gatos, filtroStatus, pesquisa]);

  const handleFiltroChange = (status: StatusGato | null) => {
    setFiltroStatus(status);
  };

  const handlePesquisar = (valor: string) => {
    setPesquisa(valor);
  };

  const handleCadastrar = () => {
    if (isProtetor) {
      setShowCadastro(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filtros}>
        <Filtros
          total={gatos.length}
          mostrando={gatosFiltrados.length}
          aoCadastrar={handleCadastrar}
          aoPesquisar={handlePesquisar}
          aoMudarFiltro={handleFiltroChange}
          mostrarBotaoCadastro={isProtetor}
        />
      </div>
      <div className={styles.catGrid}>
        {gatosFiltrados.map((gato) => (
          <CartaoGato key={gato.id} gato={gato} />
        ))}
      </div>

      {gatosFiltrados.length === 0 && (
        <div className={styles.empty}>
          <p>Nenhum gato encontrado com os filtros selecionados.</p>
        </div>
      )}

      {showCadastro && (
        <CadastroGato onClose={() => setShowCadastro(false)} />
      )}
    </div>
  );
}
