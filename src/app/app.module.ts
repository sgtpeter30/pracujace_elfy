import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeComponent } from './tree/tree.component';
import { LettersComponent } from './tree/letters/letters.component';
import { PresentsComponent } from './tree/presents/presents.component';
import { PresentComponent } from './tree/presents/present/present.component';
import { LetterComponent } from './tree/letters/letter/letter.component';
import { BaseUrlInterceptor } from './http-interceptor';
import { WriteLetterComponent } from './tree/letters/write-letter/write-letter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatDialogModule} from '@angular/material/dialog'; 

export const environment = {
  production: true,
  // apiUrl: "https://straszna-fabryka-swietego-mikolaja.loca.lt"
  // apiUrl: "http://localhost:3000"
  apiUrl: "https://assuring-apparently-foal.ngrok-free.app"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TreeComponent,
    LettersComponent,
    PresentsComponent,
    PresentComponent,
    LetterComponent,
    WriteLetterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: TreeComponent},
      { path: 'tree/letters', component: LettersComponent},
      { path: 'tree/letters/letter/:id', component: LetterComponent},
      { path: 'tree/letters/write-letter', component: WriteLetterComponent},
      { path: 'tree/presents', component: PresentsComponent},
      { path: 'tree/presents/present/:id', component: PresentComponent},
      { path: 'admin', component: HomeComponent},
    ]),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: "BASE_API_URL", useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
