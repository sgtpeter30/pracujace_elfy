import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PresentComponent {
  letter: Person;
  id: string = '';
  giftClass: string = 'gift'

  constructor(
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ){
    activeRoute.params.subscribe(value =>{
      this.id = value['id'];
    })
    this.getData();
  }
  getData(){
    this.http.get('get-letter/'+this.id)
    .pipe(map((data: any)=>{
      return data[0]
    }))
    .subscribe((data: Person) => {
      console.log(data);      
      return this.letter = data
    })
  }

  sendData(){
    this.http.put('modify-letter/'+this.id, this.letter).subscribe((data: Person) => this.letter = data)
  }

  addPresent(item: any){
    item.timesPicked = !item.timesPicked? item.timesPicked = 1 : item.timesPicked + 1
    this.sendData()
  }

  removePresent(item: any){
    item.timesPicked = !item.timesPicked? item.timesPicked = 0 : item.timesPicked - 1
    this.sendData()
  }
}
