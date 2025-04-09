import Gato from "@/models/gato";
import { obterTodosOsGatos } from "@/actions/gatos";

async function Home() {
  const gatos = await obterTodosOsGatos().then((gatos) =>
    gatos.map((g) => Gato.fromDict(g))
  );

  return (
    <div>
      <h1>Cats</h1>
      <ul>
        {gatos.map((g) => (
          <li key={g.id}>
            {g.nome} - {g.sexo} - {g.status} - {g.caracteristicasMarcantes}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
