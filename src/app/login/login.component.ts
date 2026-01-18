
import { Component, Inject, inject, signal, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { InputFieldComponent, LiveFormBuilder, LiveFormComponent, LiveFormModel, PasswordField, TextField } from '@props-and-tinkering/pt-core';
import { UserService } from '../services/user.service';
import { LoginModel } from '../models/login.model';
import { Schema, schema, required, form } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    LiveFormComponent
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private userService = inject(UserService)
  lfb: LiveFormBuilder = new LiveFormBuilder()

  showLoginLoader: boolean = false

  loginLiveForm!: LiveFormModel<LoginModel>
  loginSignal = signal<LoginModel>({
    login: "",
    password: ""
  })
  private liveFormSchema: Schema<LoginModel> = schema<LoginModel>((rootPath) => {
    required(rootPath.login)
    required(rootPath.password)
  })

  liveForm = form<LoginModel>(this.loginSignal, this.liveFormSchema)

  ngOnInit(): void {
    this.loginLiveForm = {
      name: 'loginForm',
      controls: {
        login: this.lfb.controls({
          label: 'Login',
          component: TextField,
        }),
        password: this.lfb.controls({
          label: 'Hasło',
          component: PasswordField,
        })
      },
    }
  }

  protected async loginUser() {
    this.showLoginLoader = true;
    const formValue = this.liveForm().value();
    if (formValue) {
      await this.userService.loginUser(formValue as User);
      this.showLoginLoader = false;
    } else {
      this.showLoginLoader = false;
    }
  }

}
