import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component'; 
import { HomeComponent } from '../pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from '../components/button/button.component';
import { UrlNotFoundComponent } from '../pages/url-not-found/url-not-found.component';
import { SurveyComponent } from '../pages/survey/survey.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet, provideRouter } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ButtonComponent,
    UrlNotFoundComponent,
    SurveyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterOutlet,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
