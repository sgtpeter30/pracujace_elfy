import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TreeComponent } from './tree/tree.component';
import { LettersComponent } from './tree/letters/letters.component';
import { PresentsComponent } from './tree/presents/presents.component';
import { PresentComponent } from './tree/presents/present/present.component';
import { BaseUrlInterceptor } from './http-interceptor';
import { WriteLetterComponent } from './tree/letters/write-letter/write-letter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { LoginComponent } from './login/login.component';
import { AuthInterceptorService } from './services';
import { RefreshInterceptorService } from './services/refresh.interceptor.service';
import { AppRoutingModule } from './app-routing.module';

export const environment = {
  production: true,
  // apiUrl: "https://straszna-fabryka-swietego-mikolaja.loca.lt"
  // apiUrl: "http://localhost:3000"
  apiUrl: "http://localhost:2412"
//   apiUrl: "http://localhost:3200"
  // apiUrl: "https://assuring-apparently-foal.ngrok-free.app/api"
};

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        TreeComponent,
        LettersComponent,
        PresentsComponent,
        PresentComponent,
        WriteLetterComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatInputModule,
        MatDialogModule,
    ], 
    providers: [
        { provide: "BASE_API_URL", useValue: environment.apiUrl },
        // { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: RefreshInterceptorService, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
