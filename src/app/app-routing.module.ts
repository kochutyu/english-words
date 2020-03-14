import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationFormComponent } from './components/modal/registration-form/registration-form.component';
import { ModalService } from './shared/services/modal.service';

// export class MyGuard implements CanActivate {
//   constructor(private modal: ModalService) { 

//   }
//   canActivate() {
//     // if (this.modal.registrationFormStatus) {
//     //   return true;
      
//     // } else {
//     //   return false;
//     // }
//       return true;

//   }
// }


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'sign-up', component: RegistrationFormComponent, canActivate: [ModalService] },
      { path: 'log-in', component: RegistrationFormComponent, canActivate: [ModalService] },
  ]},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
