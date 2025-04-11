import Image from "next/image";
import React, { Suspense } from "react";
import Gato, { Foto } from "@/models/gato";
import { obterFotosDoGato } from "@/actions/gatos";
import { Cat, AlertCircle, Scissors, Syringe } from "lucide-react";
import styles from "./CartaoGato.module.scss";

export default function CartaoGato({ gato }: { gato: Gato }) {
  return (
    <div className={styles.cartaoGato} key={gato.id}>
      <div className={styles.containerImagem}>
        <Suspense fallback={<SpinnerCarregamento />}>
          <ExibicaoFotosGato id={gato.id} nome={gato.nome} />
        </Suspense>
      </div>
      <div className={styles.informacoes}>
        <h2 className={styles.nome}>{gato.nome}</h2>
        <div className={styles.divisor}></div>
        <div className={styles.icones}>
          {gato.castrado === "SIM" ? (
            <Scissors className={styles.icone} size={20} />
          ) : null}
          {gato.vacinado === "SIM" ? (
            <Syringe className={styles.icone} size={20} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Componente de carregamento com animação
function SpinnerCarregamento() {
  return (
    <div className={styles.containerCarregamento}>
      <div className={styles.carregando}></div>
      <p>Carregando fotos...</p>
    </div>
  );
}

// Componente que busca e exibe fotos do gato
async function ExibicaoFotosGato({ id, nome }: { id: string; nome: string }) {
  let fotos: Foto[] = [];
  let erro = false;

  try {
    fotos = await obterFotosDoGato(id);
  } catch (error) {
    erro = true;
    console.error("Erro ao buscar fotos do gato:", error);
  }

  const urls = erro ? [] : fotos.map((f) => f.url);

  if (erro) {
    return (
      <div className={styles.erro}>
        <AlertCircle className={styles.iconeErro} size={32} />
        <p>Erro ao carregar fotos</p>
      </div>
    );
  } else if (urls.length === 0) {
    return (
      <div className={styles.semFotos}>
        <Cat className={styles.iconeSemFoto} size={32} />
        <p>Nenhuma foto disponível</p>
      </div>
    );
  }

  return (
    <Image
      src={urls[0]}
      alt={`Foto do gato ${nome}`}
      width={300}
      height={200}
      // 2. Usar styles.nomeDaClasse (camelCase)
      className={styles.imagemGato}
      unoptimized // Mantenha se necessário
    />
  );
}