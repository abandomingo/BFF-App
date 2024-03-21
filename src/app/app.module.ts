import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component'; 
import { HomeComponent } from '../pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlNotFoundComponent } from '../pages/url-not-found/url-not-found.component';
import { SurveyComponent } from '../pages/survey/survey.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '../components/cards/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorComponent } from '../components/selector/selector.component';
import { SavingsPageComponent } from '../pages/savings-page/savings-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { NgxChartsModule }from '@swimlane/ngx-charts'; 
import { BudgetPageComponent } from '../pages/budget-page/budget-page.component';
import {MatStepperModule} from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    UrlNotFoundComponent,
    SurveyComponent,
    CardComponent,
    SelectorComponent,
    SavingsPageComponent,
    BudgetPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    NgxChartsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false},
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
