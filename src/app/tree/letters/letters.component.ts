import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/app/app.module';
import { Person } from 'src/app/models/person.model';
import { map } from 'rxjs';
import { LetterService } from './letter.service';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LettersComponent {
  list: Person[];
  constructor(
    private http: HttpClient,
    public sanitizer: DomSanitizer,
    private letterService: LetterService
  ){
    this.http.get('list')
    .pipe(map((data: any)=>{
      return data.map(letter => {
        return {
          id: letter._id,
          ...letter
        }
      })
    }))
    .subscribe((data: Person[]) => {
      console.log(data);
      this.list = data;
      this.letterService.uploadList(data);
    })
  }

}
