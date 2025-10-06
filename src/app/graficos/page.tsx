import { obterTodosOsGatos } from "@/actions/gatos";
import Gato from "@/models/gato";
import GraficosClient from "./GraficosClient";

export default async function GraficosPage() {
  const gatosData = await obterTodosOsGatos();
  const gatos = gatosData.map((g) => Gato.fromDict(g));

  return <GraficosClient gatos={gatos} />;
}
