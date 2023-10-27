import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-presents',
  templateUrl: './presents.component.html',
  styleUrls: ['./presents.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PresentsComponent {
  list: Person[];

  constructor(
    private http: HttpClient,
  ){
    this.http.get('list').subscribe((data: Person[]) => {
      this.list = data
    })
  }
}
