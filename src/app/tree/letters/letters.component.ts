import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/app/app.module';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LettersComponent {
  list: any;
  constructor(
    private http: HttpClient,
    public sanitizer: DomSanitizer
  ){
    this.http.get('sortedList').subscribe(data => {
      this.list = data
    })
  }

}
