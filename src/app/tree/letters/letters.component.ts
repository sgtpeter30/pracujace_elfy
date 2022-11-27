import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LettersComponent {
  list: any;
  listUrl = 'http://localhost:3000/sortedList'

  constructor(
    private http: HttpClient,
  ){
    this.http.get(this.listUrl).subscribe(data => {
      this.list = data
    })
  }

}
