import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs';
import { Person } from 'src/app/models/person.model';

@Component({
    selector: 'app-presents',
    templateUrl: './presents.component.html',
    styleUrls: ['./presents.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PresentsComponent {
  list: Person[];

  constructor(
    private http: HttpClient,
  ){
    this.http.get('list-person')
    .pipe(map((data: any)=>{
      return data.map(post => {
        return {
          id: post._id,
          ...post
        }
      })
    }))
    .subscribe((data: Person[]) => {
      this.list = data
    })
  }
}
