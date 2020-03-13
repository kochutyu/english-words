import { FormControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

export class MyValidators {
    subscribe$: Subscription;
    users: any[] = [];
    constructor(public lol: number) {
        // this.lol = lol
    }


    static checkEmail(control: FormControl): { [key: string]: boolean } {
        const email = new RegExp('^[-._a-z0-9]+@([a-z0-9]+\\.)+[a-z]{2,6}$')
        if (!email.test(control.value)) {
            return {
                'checkEmail': true
            }
        } else {
            return null
        }
    }



    static checkFirstSymbol(control: FormControl): { [key: string]: any } {
        let firstSymbol: RegExp = new RegExp('^[A-ZА-ЯА-ЯЙЦУКЕНГШЩЗХЇФІВАПРОЛДЖЄЯЧСМИТЬБЮ]{1}');
        if (!firstSymbol.test(control.value)) {
            // console.log(this.users);
            
            return {
                'checkFirstSymbol': true
            }
        }
        else {
            return null
        }
    }

    public passwordValidator(control: FormControl): ValidationErrors {
        const value = control.value;
        /** Проверка на содержание цифр */
        const hasNumber = /[0-9]/.test(value);
        /** Проверка на содержание заглавных букв */
        const hasCapitalLetter = /[A-Z]/.test(value);
        /** Проверка на содержание прописных букв */
        const hasLowercaseLetter = /[a-z]/.test(value);
        /** Проверка на минимальную длину пароля */
        const isLengthValid = value ? value.length > 7 : false;
        
        /** Общая проверка */
        const passwordValid = hasNumber && hasCapitalLetter && hasLowercaseLetter && isLengthValid;
        console.log('kik');
        
        if (!passwordValid) {
            return { invalidPassword: 'Пароль не прошел валидацию' };
        }
        return null;
    }
}

