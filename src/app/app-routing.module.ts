import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlNotFoundComponent } from '../pages/url-not-found/url-not-found.component';
import { HomeComponent } from '../pages/home/home.component';
import { SelectorComponent } from '../components/selector/selector.component';
import { SavingsPageComponent } from '../pages/savings-page/savings-page.component';
import { BudgetPageComponent } from '../pages/budget-page/budget-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'options', component: SelectorComponent },
  { path: 'savings', component: SavingsPageComponent },
  { path: 'budget', component: BudgetPageComponent },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: UrlNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
