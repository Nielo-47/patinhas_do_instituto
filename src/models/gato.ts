import createDateFromDDMMYYYY from "../utils/date_helper";

interface Foto {
  id: string;
  url: string;
  gatoId: string;
}

interface DadosGato {
  id: string;
  nome: string;
  sexo: Sexo;
  vacinado: StatusInformacao;
  localHabitual: string;
  status: StatusGato;
  castrado: StatusInformacao;
  caracteristicas_marcantes: string;
  fotos: string[];
  data_criacao: Date;
  data_ultima_vacinacao?: Date;
  atualizado_em?: string;
  criado_em: string;
}

class Gato {
  id: string;
  nome: string;
  sexo: Sexo;
  vacinado: StatusInformacao;
  localHabitual: string;
  status: StatusGato;
  castrado: StatusInformacao;
  caracteristicas_marcantes: string;
  fotos: string[];
  data_criacao: Date;
  data_ultima_vacinacao?: Date;
  atualizado_em?: Date;

  constructor(
    id: string,
    nome: string,
    sexo: Sexo,
    vacinado: StatusInformacao,
    localHabitual: string,
    status: StatusGato,
    castrado: StatusInformacao,
    caracteristicas_marcantes: string,
    fotos: string[],
    data_criacao: Date,
    atualizado_em?: Date,
    data_ultima_vacinacao?: Date
  ) {
    this.id = id;
    this.nome = nome;
    this.sexo = sexo;
    this.vacinado = vacinado;
    this.localHabitual = localHabitual;
    this.status = status;
    this.castrado = castrado;
    this.data_ultima_vacinacao = data_ultima_vacinacao;
    this.caracteristicas_marcantes = caracteristicas_marcantes;
    this.fotos = fotos;
    this.data_criacao = data_criacao;
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
      dict.localHabitual,
      dict.status as StatusGato,
      dict.castrado,
      dict.caracteristicas_marcantes,
      dict.fotos,
      dict.criado_em == null ? new Date(Date.now()) : new Date(dict.criado_em),
      (dict.data_ultima_vacinacao = dict.data_ultima_vacinacao)
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
      data_ultima_vacinacao: this.data_ultima_vacinacao?.toISOString(),
      caracteristicas_marcantes: this.caracteristicas_marcantes,
      fotos: this.fotos,
      data_criacao: this.data_criacao.toISOString(),
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
      this.data_ultima_vacinacao?.getTime() ===
        outroGato.data_ultima_vacinacao?.getTime() &&
      this.caracteristicas_marcantes === outroGato.caracteristicas_marcantes &&
      this.data_criacao.getTime() === outroGato.data_criacao.getTime()
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

enum StatusInformacao {
  sim = "SIM",
  nao = "NAO",
  desconhecido = "DESCONHECIDO",
}

enum Sexo {
  masculino = "MASCULINO",
  feminino = "FEMININO",
  desconhecido = "DESCONHECIDO",
}

export default Gato;
export type { DadosGato, Foto };
export { StatusGato, StatusInformacao, Sexo };
