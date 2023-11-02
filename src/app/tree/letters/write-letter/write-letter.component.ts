import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlackListResponse, BlackListService } from './black-list.service';
import { HttpClient } from '@angular/common/http';
import { Person } from 'src/app/models/person.model';
import { LetterService } from '../letter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Present } from 'src/app/models/present.model';

@Component({
  selector: 'app-write-letter',
  templateUrl: './write-letter.component.html',
  styleUrls: ['./write-letter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
// todo rozszerzyć o typy
// export interface Present {
//   name: string, 
//   link: string, 
//   additionalInfo: string
// }
export class WriteLetterComponent {

  presentsLetter = this.fb.group({
    person: ['', Validators.required],
    submissionDate: [new Date],
    presentsList: this.fb.array([])
  })

  @ViewChild('dialog') dialog: ElementRef
  @ViewChild('letter') letter: ElementRef

  id: string = this.activatedRoute.snapshot.paramMap.get('id');
  letterData: Person = this.letterService.getLetter(this.id)

  dialogText: string = '';
  
  constructor(
    private fb: FormBuilder,
    private blackListService: BlackListService,
    private http: HttpClient,
    private letterService: LetterService,
    private activatedRoute: ActivatedRoute
  ){
    const letterData = this.letterData
    if(!letterData){
      this.addPresent()
    }else{
      this.resumeLetter(letterData)
    }
  }

  get getPresentsList(){
    return this.presentsLetter.get('presentsList') as FormArray
  }
  removePresent(index){
    this.getPresentsList.removeAt(index)
  }

  addPresent(){
    const present = this.fb.group({
      name: ['', Validators.required],
      link: '',
      additionalInfo: '',
    });
    this.getPresentsList.push(present);
  }

  resumeLetter(letter: Person){
    this.presentsLetter.controls.person.setValue(letter.person);
    letter.presentsList.forEach((present: Present) =>{
      const oldPresent = this.fb.group({
        name: [present.name, Validators.required],
        link: present.link,
        additionalInfo: present.additionalInfo,
      });
      this.getPresentsList.push(oldPresent);
    })
    
  }

  closeDialog(){
    this.dialog.nativeElement.close();
  }

  private validateFunction(): boolean{
    let blackListResponse: BlackListResponse
    this.getPresentsList.controls.forEach((element: FormGroup) => {
      blackListResponse = this.blackListService.isOnBlackList(element.get('name').value, element.get('additionalInfo').value)
      if(blackListResponse.isBlackList){
        this.dialogText = blackListResponse.dialogText;
      }
    });


    if(blackListResponse.isBlackList){
      this.dialogText = blackListResponse.dialogText
      this.dialog.nativeElement.showModal()
      return false
    }
    return this.presentsLetter.valid
  }

  private sendForm(){
    const body = this.presentsLetter.value;
    if(this.letterData){
      return this.http.put('modify-letter/'+this.id, body).subscribe(resp=>{
        console.log(resp);
        this.letter.nativeElement.classList.add('send');
      });
    }
    return this.http.post('send-letter', body).subscribe(resp=>{
      console.log(resp);
      this.letter.nativeElement.classList.add('send');
    });
  }

  submit(){
    if(this.validateFunction()){
      this.sendForm()
    }
  }
}
