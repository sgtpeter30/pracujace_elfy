import { Present } from "./present.model";

export interface Person{
  id: string,
  person: string,
  submissionDate: Date,
  presentsList: Present[];
}