import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PresentComponent {
  letter: any;
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
    this.http.get('sortedList/'+this.id).subscribe(data => this.letter = data)
  }
  sendData(){
    this.http.put('sortedList/'+this.id, this.letter).subscribe(data => this.letter = data)
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
