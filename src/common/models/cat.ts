import createDateFromDDMMYYYY from "../utils/date_helper";

interface CatData {
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
  createdAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Cat {
  id: string; // Unique identifier for the cat
  name: string; // Name of the cat
  sex: string; // Sex of the cat
  vaccinated: boolean; // Vaccination status
  usualLocation: string; // Usual location of the cat
  status: CatStatus; // Current status of the cat
  neutered: boolean; // Neutering status
  lastVaccinationDate?: Date; // Date of the last vaccination
  distinctiveFeatures: string; // Distinctive features of the cat
  photos: string[]; // Array of photo unique identifiers
  createdAt: Date; // Date when the cat record was created

  constructor(
    id: string,
    name: string,
    sex: string,
    vaccinated: boolean,
    usualLocation: string,
    status: CatStatus,
    neutered: boolean,
    distinctiveFeatures: string,
    photos: string[],
    createdAt: Date,
    lastVaccinationDate?: Date
  ) {
    this.id = id;
    this.name = name;
    this.sex = sex;
    this.vaccinated = vaccinated;
    this.usualLocation = usualLocation;
    this.status = status;
    this.neutered = neutered;
    this.lastVaccinationDate = lastVaccinationDate;
    this.distinctiveFeatures = distinctiveFeatures;
    this.photos = photos;
    this.createdAt = createdAt;
  }

  /**
   * Creates a Cat instance from a dictionary object.
   *
   * @param dict - Dictionary containing cat properties.
   * @returns A new Cat instance.
   */
  static fromDict(dict: CatData): Cat {
    return new Cat(
      dict.id,
      dict.nome,
      dict.sexo,
      dict.vacinado,
      dict.local,
      dict.status as CatStatus,
      dict.castrado,
      dict.caracteristicas_marcantes,
      dict.fotos,
      dict.createdAt == null ? new Date(Date.now()) : new Date(dict.createdAt),
      dict.data_ultima_vacinacao
        ? createDateFromDDMMYYYY(dict.data_ultima_vacinacao)
        : undefined
    );
  }

  /**
   * Converts this Cat instance to a dictionary object.
   *
   * @returns A dictionary containing cat properties.
   */
  asDict(): {
    [key: string]: string | undefined | boolean | Date | string[] | CatStatus;
  } {
    return {
      id: this.id,
      name: this.name,
      sex: this.sex,
      vaccinated: this.vaccinated,
      usualLocation: this.usualLocation,
      status: this.status,
      neutered: this.neutered,
      lastVaccinationDate: this.lastVaccinationDate?.toISOString(),
      distinctiveFeatures: this.distinctiveFeatures,
      photos: this.photos,
      createdAt: this.createdAt.toISOString(),
    };
  }

  /**
   * Compares this cat object with another cat object to determine if they are equal.
   *
   * @param otherCat - The other cat object to compare with.
   * @returns `true` if all properties of both cat objects are equal, otherwise `false`.
   */
  isEqual(otherCat: Cat): boolean {
    return (
      this.id === otherCat.id &&
      this.name === otherCat.name &&
      this.sex === otherCat.sex &&
      this.vaccinated === otherCat.vaccinated &&
      this.usualLocation === otherCat.usualLocation &&
      this.status === otherCat.status &&
      this.neutered === otherCat.neutered &&
      this.lastVaccinationDate?.getTime() ===
        otherCat.lastVaccinationDate?.getTime() &&
      this.distinctiveFeatures === otherCat.distinctiveFeatures &&
      this.createdAt.getTime() === otherCat.createdAt.getTime()
    );
  }
}

enum CatStatus {
  adopted = "adotado",
  on_campus = "campus",
  on_treatment = "tratamento",
  deceased = "falecido",
  unknown = "desconhecido",
}

export default Cat;
export type { CatData };
export { CatStatus };
