import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Person } from "src/app/models/person.model";

@Injectable({
  providedIn: 'root',
})
export class LetterService {
  lettersList = new BehaviorSubject<Person[]>({} as Person[])


  public uploadList(list: Person[]){
    this.lettersList.next(list);
  }

  public getList(){
    return this.lettersList.getValue();
  }

  public getLetter(id: string){
    const list = this.lettersList.getValue();
    console.log(id);    
    console.log(list);
    const A = [{a: 1}, {a: 2}]
    return list.find(letter=> letter.id === id)
    
  }
}