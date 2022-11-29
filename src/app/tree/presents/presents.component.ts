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

  constructor(
    private http: HttpClient,
  ){
    this.http.get('sortedList').subscribe(data => {
      this.list = data
    })
  }
}
