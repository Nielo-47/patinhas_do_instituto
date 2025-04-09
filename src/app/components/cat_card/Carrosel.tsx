"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CarouselClientProps {
  urls: string[];
  nome: string;
}

export default function CarouselClient({ urls, nome }: CarouselClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? urls.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Image
        src={urls[currentIndex]}
        alt={`Foto do gato ${nome}`}
        width={300}
        height={200}
        className="cat-image"
        unoptimized
      />
      {urls.length > 1 && (
        <div className="carousel-controls">
          <button
            className="carousel-button prev"
            onClick={prevSlide}
            aria-label="Foto anterior"
          >
            &#10094;
          </button>
          <div className="carousel-indicators">
            {urls.map((_, index) => (
              <span
                key={index}
                className={`indicator ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          <button
            className="carousel-button next"
            onClick={nextSlide}
            aria-label="Próxima foto"
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}
