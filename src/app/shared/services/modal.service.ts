import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  registrationFormStatus: boolean = false; // false - registrationForm hide; true - registrationForm show
  registrationStatus: boolean = false; // false - registration; true - registration
  modal: boolean = false;

  constructor() { }
}
