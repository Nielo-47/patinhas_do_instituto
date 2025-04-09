import Image from "next/image";
import React from "react";
import "./CartaoGatoStyle.scss";
import Gato, { Foto } from "@/models/gato";
import { obterFotosDoGato } from "@/actions/gatos";
import CarouselClient from "./Carrosel";

// Server Component
export default async function CartaoGato({ id, nome }: Gato) {
  // Fetch data on the server
  let fotos: Foto[] = [];
  let erro = false;

  try {
    fotos = await obterFotosDoGato(id);
  } catch (error) {
    erro = true;
    console.error("Error fetching cat photos:", error);
  }

  const urls = erro ? [] : fotos.map((f) => f.url);

  return (
    <div className="cat-card" key={id}>
      <div className="cat-card__image-container">
        {erro ? (
          <div className="error">Erro ao carregar fotos</div>
        ) : urls.length === 0 ? (
          <div className="no-photos">Nenhuma foto disponível</div>
        ) : (
          <CarouselClient urls={urls} nome={nome} />
        )}
      </div>
      <div className="cat-card__info">
        <h3 className="cat-card__name">{nome}</h3>
        <div className="cat-card__icons">
          <i className="icon fa fa-scissors"></i>
          <i className="icon fa fa-syringe"></i>
        </div>
      </div>
    </div>
  );
}
