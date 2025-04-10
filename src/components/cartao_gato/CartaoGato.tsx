import Image from "next/image";
import React, { Suspense } from "react";
import "./CartaoGatoStyle.scss";
import Gato, { Foto } from "@/models/gato";
import { obterFotosDoGato } from "@/actions/gatos";
import { Cat, AlertCircle, Scissors, Syringe } from "lucide-react";

export default function CartaoGato({ gato }: { gato: Gato }) {
  return (
    <div className="cartao-gato" key={gato.id}>
      <div className="cartao-gato__container-imagem">
        <Suspense fallback={<SpinnerCarregamento />}>
          <ExibicaoFotosGato id={gato.id} nome={gato.nome} />
        </Suspense>
      </div>
      <div className="cartao-gato__informacoes">
        <h3 className="cartao-gato__nome">{gato.nome}</h3>
        <div className="cartao-gato__icones">
          {gato.castrado === "SIM" ? (
            <Scissors className="icone" size={20} />
          ) : null}
          {gato.vacinado === "SIM" ? (
            <Syringe className="icone" size={20} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Componente de carregamento com animação
function SpinnerCarregamento() {
  return (
    <div className="container-carregamento">
      <div className="carregando"></div>
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
      <div className="erro">
        <AlertCircle className="icone-erro" size={32} />
        <p>Erro ao carregar fotos</p>
      </div>
    );
  } else if (urls.length === 0) {
    return (
      <div className="sem-fotos">
        <Cat className="icone-sem-foto" size={32} />
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
      className="imagem-gato"
      unoptimized
    />
  );
}
