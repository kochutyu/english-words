import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  registrationFormStatus: boolean = false; // false - registration; true - login
  modal: boolean = false;

  constructor() { }
}
