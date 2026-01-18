import { Present } from "./present.model";

export interface SantaLetter{
  person: string,
  submissionDate: Date,
  additionalInfo: {
    otherNotes: string,
    topSize: string,
    jacketSize: string,
    bottomSize: string,
    shoeSize: string,
    favouriteColor: string;
    hatedColor: string;
    favTaste: string;
    hateTaste: string;
    favSmell: string;
    hateSmell: string;
  },
  presentsList: Present[];
}