import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlNotFoundComponent } from '../pages/url-not-found/url-not-found.component';
import { SurveyComponent } from '../pages/survey/survey.component';
import { HomeComponent } from '../pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'survey', component: SurveyComponent },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: UrlNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
