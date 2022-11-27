import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TreeComponent,
    LettersComponent,
    PresentsComponent,
    PresentComponent,
    LetterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: '', component: TreeComponent},
      { path: 'tree/letters', component: LettersComponent},
      { path: 'tree/letters/letter/:id', component: LetterComponent},
      { path: 'tree/presents', component: PresentsComponent},
      { path: 'admin', component: HomeComponent},
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
