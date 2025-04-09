import createDateFromDDMMYYYY from "../utils/date_helper";

interface Foto {
  id: string;
  url: string;
  gatoId: string;
}

interface DadosGato {
  id: string;
  nome: string;
  sexo: string;
  vacinado: boolean;
  local: string;
  status: string;
  castrado: boolean;
  data_ultima_vacinacao?: string;
  caracteristicas_marcantes: string;
  fotos: string[];
  criado_em: string;
  atualizado_em: string;
}

class Gato {
  id: string; // Identificador único do gato
  nome: string; // Nome do gato
  sexo: string; // Sexo do gato
  vacinado: boolean; // Status de vacinação
  localHabitual: string; // Local habitual do gato
  status: StatusGato; // Status atual do gato
  castrado: boolean; // Status de castração
  dataUltimaVacinacao?: Date; // Data da última vacinação
  caracteristicasMarcantes: string; // Características marcantes do gato
  fotos: string[]; // Array de identificadores únicos das fotos
  dataCriacao: Date; // Data de criação do registro do gato

  constructor(
    id: string,
    nome: string,
    sexo: string,
    vacinado: boolean,
    localHabitual: string,
    status: StatusGato,
    castrado: boolean,
    caracteristicasMarcantes: string,
    fotos: string[],
    dataCriacao: Date,
    dataUltimaVacinacao?: Date
  ) {
    this.id = id;
    this.nome = nome;
    this.sexo = sexo;
    this.vacinado = vacinado;
    this.localHabitual = localHabitual;
    this.status = status;
    this.castrado = castrado;
    this.dataUltimaVacinacao = dataUltimaVacinacao;
    this.caracteristicasMarcantes = caracteristicasMarcantes;
    this.fotos = fotos;
    this.dataCriacao = dataCriacao;
  }

  /**
   * Cria uma instância de Gato a partir de um objeto dicionário.
   *
   * @param dict - Dicionário contendo as propriedades do gato.
   * @returns Uma nova instância de Gato.
   */
  static fromDict(dict: DadosGato): Gato {
    return new Gato(
      dict.id,
      dict.nome,
      dict.sexo,
      dict.vacinado,
      dict.local,
      dict.status as StatusGato,
      dict.castrado,
      dict.caracteristicas_marcantes,
      dict.fotos,
      dict.criado_em == null ? new Date(Date.now()) : new Date(dict.criado_em),
      dict.data_ultima_vacinacao
        ? createDateFromDDMMYYYY(dict.data_ultima_vacinacao)
        : undefined
    );
  }

  /**
   * Converte esta instância de Gato para um objeto dicionário.
   *
   * @returns Um dicionário contendo as propriedades do gato.
   */
  asDict(): {
    [key: string]: string | undefined | boolean | Date | string[] | StatusGato;
  } {
    return {
      id: this.id,
      nome: this.nome,
      sexo: this.sexo,
      vacinado: this.vacinado,
      localHabitual: this.localHabitual,
      status: this.status,
      castrado: this.castrado,
      dataUltimaVacinacao: this.dataUltimaVacinacao?.toISOString(),
      caracteristicasMarcantes: this.caracteristicasMarcantes,
      fotos: this.fotos,
      dataCriacao: this.dataCriacao.toISOString(),
    };
  }

  /**
   * Compara este objeto Gato com outro objeto Gato para determinar se são iguais.
   *
   * @param outroGato - O outro objeto Gato para comparar.
   * @returns `true` se todas as propriedades de ambos os gatos forem iguais, caso contrário `false`.
   */
  isEqual(outroGato: Gato): boolean {
    return (
      this.id === outroGato.id &&
      this.nome === outroGato.nome &&
      this.sexo === outroGato.sexo &&
      this.vacinado === outroGato.vacinado &&
      this.localHabitual === outroGato.localHabitual &&
      this.status === outroGato.status &&
      this.castrado === outroGato.castrado &&
      this.dataUltimaVacinacao?.getTime() ===
        outroGato.dataUltimaVacinacao?.getTime() &&
      this.caracteristicasMarcantes === outroGato.caracteristicasMarcantes &&
      this.dataCriacao.getTime() === outroGato.dataCriacao.getTime()
    );
  }
}

enum StatusGato {
  adotado = "adotado",
  no_campus = "campus",
  em_tratamento = "tratamento",
  falecido = "falecido",
  desconhecido = "desconhecido",
}

export default Gato;
export type { DadosGato, Foto };
export { StatusGato };
