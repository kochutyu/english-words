import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  lol: IUser[] = [];

  constructor() { }

  public passwordValidator(control: FormControl): ValidationErrors {
    const value = control.value;
    /** Проверка на содержание цифр */
    const hasNumber = /[0-9]/.test(value);
    /** Проверка на содержание заглавных букв */
    const hasCapitalLetter = /[A-Z]/.test(value);
    /** Проверка на содержание прописных букв */
    const hasLowercaseLetter = /[a-z]/.test(value);
    /** Проверка на минимальную длину пароля */
    const isLengthValid = value.length > 5 ? true : false;

    /** Общая проверка */
    const passwordValid = hasNumber && hasCapitalLetter && hasLowercaseLetter && isLengthValid;
    if (!passwordValid) {
      return {
        hasNumber,
        hasCapitalLetter,
        hasLowercaseLetter,
        isLengthValid
      }
    }
    return null;
  }

  public validEmail(control: FormControl): ValidationErrors {
    const value = control.value;
    const email = new RegExp('^[-._a-z0-9]+@([a-z0-9]+\\.)+[a-z]{2,6}$');
    
    const validEmail = email.test(control.value);
    if (!validEmail) {
      return {
        'checkEmail': true
      }
    }
    return null
  }

  public getArr( arr: any[]): void{
    
  }
}
