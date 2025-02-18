export class Cat {
  id: number;
  name: string;
  castrated: boolean;
  vaccinated: boolean;
  dewormed: boolean;
  lastVacinnationDate: Date;
  lastDewormingDate: Date;
  pics: string[];
  description: string;
  status: CatStatus;

  constructor(
    id: number,
    name: string,
    castrated: boolean,
    vaccinated: boolean,
    dewormed: boolean,
    lastVacinnationDate: Date,
    lastDewormingDate: Date,
    pics: string[],
    description: string,
    status: CatStatus
  ) {
    this.id = id;
    this.name = name;
    this.castrated = castrated;
    this.vaccinated = vaccinated;
    this.dewormed = dewormed;
    this.lastVacinnationDate = lastVacinnationDate;
    this.lastDewormingDate = lastDewormingDate;
    this.pics = pics;
    this.description = description;
    this.status = status;
  }
}

enum CatStatus {
  onCampus,
  adopted,
  inTreatment,
  deceased,
  unkwon,
}
