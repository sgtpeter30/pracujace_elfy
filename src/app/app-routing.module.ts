import { Component, NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LettersComponent } from './tree/letters/letters.component';
import { WriteLetterComponent } from './tree/letters/write-letter/write-letter.component';
import { PresentComponent } from './tree/presents/present/present.component';
import { PresentsComponent } from './tree/presents/presents.component';
import { TreeComponent } from './tree/tree.component';
import { LoginComponent } from './login/login.component';
import { PermissionsService, userLogged } from './services';
import { SigninComponent } from 'src/signin/signin.component';
import { NewWriteLetterComponent } from './tree/letters/new-write-letter/new-write-letter.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'secure-your-soul',
    component: SigninComponent,
  },
  {
    path: 'home',
    component: TreeComponent,
    canActivate: [userLogged]
  },
  { 
    path: 'tree/letters', 
    component: LettersComponent,
    canActivate: [userLogged]
  },
  { 
    path: 'tree/letters/write-letter/:id', 
    component: WriteLetterComponent,
    canActivate: [userLogged]
  },
  { 
    path: 'tree/letters/write-letter', 
    component: WriteLetterComponent,
    canActivate: [userLogged]
  },
  { 
    path: 'tree/letters/write-letter-new', 
    component: NewWriteLetterComponent,
    canActivate: [userLogged]
  },
  { 
    path: 'tree/presents', 
    component: PresentsComponent,
    canActivate: [userLogged]
  },
  { 
    path: 'tree/presents/present/:id', 
    component: PresentComponent,
    canActivate: [userLogged]
  },
  { 
    path: 'admin', 
    component: HomeComponent,
    canActivate: [userLogged]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    PermissionsService,
  ]
})
export class AppRoutingModule { }
