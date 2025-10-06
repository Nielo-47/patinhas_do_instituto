import { obterTodosOsProtetores } from "@/actions/usuarios";
import ProtetoresClient from "./ProtetoresClient";

export default async function ProtetoresPage() {
  const protetores = await obterTodosOsProtetores();

  return <ProtetoresClient protetores={protetores} />;
}
