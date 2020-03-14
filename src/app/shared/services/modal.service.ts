import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModalService implements CanActivate {
  registrationFormStatus: boolean = false; // false - registrationForm hide; true - registrationForm show
  registrationStatus: boolean = false; // false - login; true - registration
  modal: boolean = false;

  hideModal: ElementRef;

  constructor(
    private router: Router
  ) { }

  canActivate() {
    if (this.registrationFormStatus) {
      return true;

    } else {
      this.router.navigate(['/']);

      return false;
    }

  }
}
