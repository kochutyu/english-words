import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationFormComponent } from './components/modal/registration-form/registration-form.component';
import { ModalService } from './shared/services/modal.service';
import { LearnNewWordsComponent } from './pages/learn-new-words/learn-new-words.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'sign-up', component: RegistrationFormComponent, canActivate: [ModalService] },
      { path: 'log-in', component: RegistrationFormComponent, canActivate: [ModalService] },
    ]
  },
  { path: 'learn-new-words', component: LearnNewWordsComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
