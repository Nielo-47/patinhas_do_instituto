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
    status: string,
    neutered: boolean,
    lastVaccinationDate: Date,
    distinctiveFeatures: string,
    photos: string[],
    createdAt: Date
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
  static fromDict(dict: { [key: string]: any }): Cat {
    return new Cat(
      dict.id,
      dict.name,
      dict.sex,
      dict.vaccinated,
      dict.usualLocation,
      dict.status,
      dict.neutered,
      new Date(dict.lastVaccinationDate),
      dict.distinctiveFeatures,
      dict.photos,
      new Date(dict.createdAt)
    );
  }

  /**
   * Converts this Cat instance to a dictionary object.
   *
   * @returns A dictionary containing cat properties.
   */
  asDict(): { [key: string]: any } {
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

/**
 * Enum-like object representing possible statuses for a cat.
 */
class CatStatus {
  static readonly Adopted: { code: "adotado"; label: "Adotado" };
  static readonly OnCampus: { code: "campus"; label: "No campus" };
  static readonly OnTreatment: { code: "tratamento"; label: "Em tratamento" };
  static readonly Fostered: { code: "adotado"; label: "Adotado" };
  static readonly Deceased: { code: "falecido"; label: "Falecido" };
}
