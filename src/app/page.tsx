"use server";

import Gato from "@/models/gato";
import { obterTodosOsGatos } from "@/actions/gatos";
import CartaoGato from "@/components/cartao_gato/CartaoGato";
import "./home.scss";

async function Home() {
  const gatos = await obterTodosOsGatos().then((gatos) =>
    gatos.map((g) => Gato.fromDict(g))
  );

  return (
    <div className="container">
      <h1 className="title">Cats</h1>
      <div className="cat-grid">
        {gatos.map((gato) => (
          <CartaoGato key={gato.id} gato={gato} />
        ))}
      </div>
    </div>
  );
}
export default Home;
