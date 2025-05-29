import Gato, { StatusGato } from "@/models/gato";
import { obterTodosOsGatos } from "@/actions/gatos";
import CartaoGato from "@/components/CartaoGato/CartaoGato";
import styles from "./home.module.scss";
import Filtros from "@/components/Filtros/Filtros";
import { useState } from "react";

type InfoFiltros = {
  status: StatusGato;
  pesquisa: string;

}

async function Home() {
  const [infoFiltros, setInfoFiltros] = useState({})
  const gatos = await obterTodosOsGatos().then((gatos) =>
    gatos.map((g) => Gato.fromDict(g))
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.filtros}>
        <Filtros />
      </div>
    <div className={styles.catGrid}>
        {gatos.map((gato) => (
          <CartaoGato key={gato.id} gato={gato} />
        ))}
      </div>
    </div>
    
  );
}
export default Home;
