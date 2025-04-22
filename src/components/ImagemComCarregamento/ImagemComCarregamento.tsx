"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import styles from "./ImagemComCarregamento.module.scss";

type Props = ImageProps;

export default function ImagemComCarregamento(props: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <div className={styles.loader} />}
      <Image
        {...props}
        onLoad={() => setLoading(false)}
        className={`${styles.image} ${
          loading ? styles.loader : styles.visible
        } ${props.className}`}
      />
    </>
  );
}
