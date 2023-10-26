import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlackListResponse, BlackListService } from './black-list.service';
import { HttpClient } from '@angular/common/http';

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

  dialogText: string = '';
  
  constructor(
    private fb: FormBuilder,
    private blackListService: BlackListService,
    private http: HttpClient,
  ){
    this.addPresent()
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
    this.getPresentsList.push(present)
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
    this.http.post('list', body).subscribe(resp=>{
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
