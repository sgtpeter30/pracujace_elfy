import { Present } from "./present.model";

export interface Person{
  id: number,
  person: string,
  submissionDate: Date,
  presentsList: Present[];
}