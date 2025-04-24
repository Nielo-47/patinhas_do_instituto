"use server";

import Gato from "@/models/gato";
import { obterTodosOsGatos } from "@/actions/gatos";
import CartaoGato from "@/components/CartaoGato/CartaoGato";
import "./home.scss";

async function Home() {
  const gatos = await obterTodosOsGatos().then((gatos) =>
    gatos.map((g) => Gato.fromDict(g))
  );

  return (
    <div className="cat-grid">
      {gatos.map((gato) => (
        <CartaoGato key={gato.id} gato={gato} />
      ))}
    </div>
  );
}
export default Home;
