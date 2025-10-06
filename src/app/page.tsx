import Gato from "@/models/gato";
import { obterTodosOsGatos } from "@/actions/gatos";
import HomeClient from "./HomeClient";

async function Home() {
  const gatosData = await obterTodosOsGatos();
  const gatos = gatosData.map((g) => Gato.fromDict(g));

  return <HomeClient gatos={gatos} />;
}

export default Home;
