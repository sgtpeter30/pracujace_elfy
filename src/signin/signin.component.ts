import { Component, inject, signal } from '@angular/core';
import { form, PathKind, required, Schema, schema, SchemaPathTree, validateTree } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { LiveFormBuilder, LiveFormComponent, LiveFormModel, PasswordField, TextField } from '@props-and-tinkering/pt-core';
import { User } from 'src/app/login/user.model';
import { MatError } from "@angular/material/input";
import { UserService } from 'src/app/services';

interface UserCreation extends User{
  passwordVerification: string;
}

function customValidator(root: SchemaPathTree<UserCreation, PathKind.Root>){

  validateTree(root, ctx => {
    const root = ctx.value()
    const passwordFieldValue = root.password
    const passwordFieldVerifyValue = root.passwordVerification
    if(passwordFieldValue !== passwordFieldVerifyValue){
      return {
        kind: "passwordMissmatch",
        message: "Hasła się nie zgadzają!"
      }
    }
    return null;
  })
}

@Component({
  selector: 'app-signin',
  imports: [
    LiveFormComponent,
    MatButtonModule,
    MatError
],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  userService = inject(UserService)
  lfb: LiveFormBuilder = new LiveFormBuilder()
  signInFormSignal = signal<UserCreation>({
    login: "",
    password: "",
    passwordVerification: ""
  })
  private liveFormSchema: Schema<UserCreation> = schema<UserCreation>((rootPath)=>{
    required(rootPath.login)
    required(rootPath.password)
    required(rootPath.passwordVerification)
    customValidator(rootPath)
  })
  signInForm = form<UserCreation>(this.signInFormSignal, this.liveFormSchema)
  signInLiveBuilder!: LiveFormModel<UserCreation>


  ngOnInit(): void {
    this.signInLiveBuilder = ({
      name: 'signInForm',
      controls: {
        login: this.lfb.controls({
          label: "login",
          component: TextField,
        }),
        password: this.lfb.controls({
          label: "Hasło",
          component: PasswordField
        }),
        passwordVerification: this.lfb.controls({
          label: "Powtórz hasło",
          component: PasswordField
        })
      }
    })
  }


  signIn(){
    const formValue = this.signInForm().value()
    this.userService.createUser({
      login: formValue.login,
      password: formValue.password
    }) 
  }
}
