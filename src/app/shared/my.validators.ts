import { FormControl } from '@angular/forms';

export class MyValidators {
    static checkEmail(control: FormControl): { [key: string]: boolean } {
        const email = new RegExp('^[-._a-z0-9]+@([a-z0-9]+\\.)+[a-z]{2,6}$')
        if (!email.test(control.value)) {
            return {
                'checkEmail': true
            }
        }else{
            return null
        }
    }

    static checkFirstSymbol(control: FormControl): {[key: string]: any} {
        let firstSymbol: RegExp = new RegExp('^[A-ZА-ЯА-ЯЙЦУКЕНГШЩЗХЇФІВАПРОЛДЖЄЯЧСМИТЬБЮ]{1}');
        if(!firstSymbol.test(control.value)){
            return {
                'checkFirstSymbol': true
            }
        }else{
            return null
        }
    }
}