import { CommonModule } from '@angular/common';
import { Component, Inject, inject, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { InputFieldComponent, LiveFormBuilder, LiveFormComponent, LiveFormModel, User, UserService } from 'pt-core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    LiveFormComponent,
  ],
  providers:[],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private userService = inject(UserService)

  showLoginLoader: boolean = false

  lfb: LiveFormBuilder = new LiveFormBuilder()
  loginLiveForm!: LiveFormModel
  @ViewChild('loginForm') loginForm!: LiveFormComponent
  
  ngOnInit(): void {
    this.loginLiveForm = {
      name: 'loginForm',
      group: {
        login: this.lfb.controls({
          label: 'Login',
          component: InputFieldComponent,
          validators: ()=> Validators.required
        }),
        password: this.lfb.controls({
          label: 'Hasło',
          component: InputFieldComponent,
          inputType: 'password',
          validators: ()=> [Validators.required]
        })
      },
    }
  }

  protected async loginUser(){
    this.showLoginLoader = true;
    const formValue = this.loginForm.getValueIfValid();
    if(formValue){
      await this.userService.loginUser(formValue as User);
      this.showLoginLoader = false;
    }else{
      this.showLoginLoader = false;
    }
  }

}
