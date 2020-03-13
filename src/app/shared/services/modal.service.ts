import { Injectable, ViewChild, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  registrationFormStatus: boolean = false; // false - registrationForm hide; true - registrationForm show
  registrationStatus: boolean = false; // false - login; true - registration
  modal: boolean = false;

  hideModal: ElementRef;

  constructor() { }
}
