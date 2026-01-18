import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { SantaLetter } from "src/app/models/santa-letter.model";

@Injectable({
  providedIn: 'root',
})
export class NewLetterService {
  letter = signal<SantaLetter>
  http = inject(HttpClient)

  public async sendLetter(letter: SantaLetter){
    this.http.post('/send-letter', letter)
  }

}