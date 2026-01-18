import { Component, ElementRef, inject, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { form } from '@angular/forms/signals';
import { ColorField, DateField, LiveFormBuilder, LiveFormComponent, LiveFormModel, TextField } from '@props-and-tinkering/pt-core';
import { drawPapyrus } from 'src/app/functions/papyrus';
import { SantaLetter } from 'src/app/models/santa-letter.model';
import { UserService } from 'src/app/services';
import { LetterService } from '../letter.service';
import { NewLetterService } from '../new-letter-service';

@Component({
  selector: 'app-new-write-letter',
  imports: [
    LiveFormComponent
  ],
  templateUrl: './new-write-letter.component.html',
  styleUrl: './new-write-letter.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class NewWriteLetterComponent {
  @ViewChild('papyrusCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  userService = inject(UserService)
  newLetterService = inject(NewLetterService)
  
  lfb: LiveFormBuilder = new LiveFormBuilder()
  letterFormSignal = signal<SantaLetter>({
    person: this.userService.userLogin(),
    submissionDate: new Date(),
    additionalInfo: {
      topSize: "",
      otherNotes: "",
      jacketSize: "",
      shoeSize: "",
      bottomSize: "",
      favouriteColor: "",
      hatedColor: "",
      favSmell: "",
      hateSmell: "",
      favTaste: "",
      hateTaste: ""
    },
    presentsList: []
  })
  letterForm = form<SantaLetter>(this.letterFormSignal)
  letterLiveBuilder!: LiveFormModel<SantaLetter>


  ngOnInit(): void {
    this.letterLiveBuilder = ({
      name: 'letterForm',
      controls: {
        person: this.lfb.controls({
          label: "Podpis",
          class: "sign",
          component: TextField,
        }),
        additionalInfo: this.lfb.group({
          otherNotes: this.lfb.controls({
            label: "Dodatkowe notatki",
            component: TextField
          }),
          topSize: this.lfb.controls({
            label: "wielkość koszulek",
            component: TextField
          }),
          jacketSize: this.lfb.controls({
            label: "wielkość kurtek/płaszczy",
            component: TextField
          }),
          bottomSize: this.lfb.controls({
            label: "wielkość spodni",
            component: TextField
          }),
          shoeSize: this.lfb.controls({
            label: "rozmiar butów",
            component: TextField
          }),
          favouriteColor: this.lfb.controls({
            label: "Ulubione kolory",
            component: TextField
          }),
          hatedColor: this.lfb.controls({
            label: "NIElubiane kolory",
            component: TextField,
          }),
          favSmell: this.lfb.controls({
            label: "Ulubione zapachy",
            component: TextField,
          }),
          hateSmell: this.lfb.controls({
            label: "NIElubiane zapachy",
            component: TextField,
          }),
          favTaste: this.lfb.controls({
            label: "Ulubione smaki",
            component: TextField,
          }),
          hateTaste: this.lfb.controls({
            label: "NIElubiane smaki",
            component: TextField,
          }),
        }),
        submissionDate: this.lfb.controls({
          component: DateField,
          hidden: true
        }),
        presentsList: this.lfb.group({
          // name: ['', Validators.required],
          // link: '',
          // additionalInfo: '',
          // timesPicked: '',
        })
      }
    })

    drawPapyrus(this.canvasRef.nativeElement)
  }

  ngAfterViewInit(): void {
    drawPapyrus(this.canvasRef.nativeElement)
  }
  
  submitForm(){
    if(this.letterForm().invalid()){
      console.log("robisz coś źle")
    }
    const letter = this.letterForm().value();
    this.newLetterService.sendLetter(letter)    
  }
}
