import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LetterComponent {
  letter: any;
  url: string = `http://localhost:3000/sortedList/`
  id: string = ''

  constructor(
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ){
    activeRoute.params.subscribe(value =>{
      this.id = value['id'];
    })

    this.http.get(this.url+'/'+this.id).subscribe(data => this.letter = data)
  }

}
