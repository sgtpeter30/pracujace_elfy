import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-presents',
  templateUrl: './presents.component.html',
  styleUrls: ['./presents.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PresentsComponent {
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
