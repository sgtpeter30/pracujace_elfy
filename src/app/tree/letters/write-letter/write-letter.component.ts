import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-write-letter',
  templateUrl: './write-letter.component.html',
  styleUrls: ['./write-letter.component.scss']
})
export class WriteLetterComponent {

  presentsLetter = this.fb.group({
    presentsList: this.fb.array([])
  })
  
  constructor(
    private fb: FormBuilder
  ){
    this.addPresent()
  }

  get getPresentsList(){
    return this.presentsLetter.get('presentsList') as FormArray
  }
  addPresent(){
    const present = this.fb.group({
      name: [''],
      link: '',
      additional: '',
    });
    this.getPresentsList.push(present)
  }


  onSubmit(){}

}
