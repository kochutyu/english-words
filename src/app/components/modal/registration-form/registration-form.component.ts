import { Component, OnInit, HostListener, ElementRef, ViewChild, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { AppService } from 'src/app/shared/services/app.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { MyValidators } from 'src/app/shared/my.validators';
import { FireService } from 'src/app/shared/services/fire.service';
import { IUser } from 'src/app/shared/model/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from 'src/app/shared/services/users.service';
import { Observable, Subscription } from 'rxjs';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
     selector: 'app-registration-form',
     templateUrl: './registration-form.component.html',
     styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit, OnDestroy, AfterViewInit {
     form: FormGroup;


     constructor(
          public app: AppService,
          public modal: ModalService,
          private fs: AngularFirestore,
          public userS: UsersService,
          public validatorS: ValidatorsService,
          private db: FireService
     ) {
     }
     ngAfterViewInit(): void {
          this.validatorS.lol = this.users
     }

     @ViewChild('exit', { static: true }) exit: ElementRef;
     @ViewChild('btn', { static: true }) btn: ElementRef;

     users: IUser[] = [];
     subscribe$: Subscription;




     ngOnInit(): void {
          this.getUsers();
          if (this.modal.registrationStatus) {

               this.signInFormGroup()
          } else {

               this.logInFormGroup()
          }

     }




     ngOnDestroy() {
          this.subscribe$.unsubscribe();
     }





     getUsers(): void {


          this.subscribe$ = this.db.getCollection('users').subscribe(actionArr => {
               this.users = actionArr.map(item => {
                    return {
                         ...item.payload.doc.data(),
                         id: item.payload.doc.id
                    };
               });
               console.log('users => ', this.users);
          });


     }





     logInFormGroup(): void {
          this.form = new FormGroup({
               email: new FormControl('', [Validators.required, MyValidators.checkEmail]),
               password: new FormControl('', [Validators.required, Validators.minLength(6)])
          });
     }





     signInFormGroup(): void {
          this.form = new FormGroup({
               firstName: new FormControl('', [Validators.required, MyValidators.checkFirstSymbol]),
               lastName: new FormControl('', [Validators.required, MyValidators.checkFirstSymbol]),
               email: new FormControl('', [Validators.required, MyValidators.checkEmail]),
               password: new FormControl('', [Validators.required, Validators.minLength(6)]),
          });
     }





     signInForm(): void {

          function locking() {

               let count = 1;
               let bracketsConfig = [['lol', 'google'], ['facebook', 'index'], ['angular']];
               let str = "lolgoogle. Вот вийшло замінити";
               
               function restart() {

                    const newArr = bracketsConfig.map(item => item.join('')).forEach(item => {
                         
                         if (str.includes(item)) {
                              str = str.replace(item, '');
                              restart()
                              
                         }
                         return null
                    });
               }

               restart() 
               
               
               console.log(str);




               return function restart() {
                    exitFromCycle: for (let index = 0; index < 5; index++) {
                         count += 1;
                         const lastIndex = 4
                         console.log(count);

                         if (count === 100) break exitFromCycle
                         if (index === lastIndex) restart()
                    }
               }

          }

          const restart = locking();


          this.modal.registrationStatus = true;
          this.signInFormGroup();
     }





     logInForm(): void {
          this.modal.registrationStatus = false;
          this.logInFormGroup();
     }





     newUser(): IUser {
          const firstName = this.form.get('firstName').value;
          const lastName = this.form.get('lastName').value;
          const email = this.form.get('email').value;
          const password = this.form.get('password').value;
          const user = new IUser(firstName, lastName, email, password);
          this.userS.user = JSON.parse(JSON.stringify(user));
          return this.userS.user;
     }





     register(): void {
          this.userS.wrongEmailOrPassword = false;

          const emailIsBusy: boolean = this.users.some(item => item.email === this.form.get('email').value);

          if (!emailIsBusy) {

               this.userS.emailIsBusy = false;
               this.fs.collection('users').add(this.newUser());
               this.userS.loginStatus = true;
               this.modal.hideModal.nativeElement.click();
               this.form.reset();
          } else {

               this.newUser();
               this.userS.emailIsBusy = true;
          }
     }





     enter(): void {
          this.userS.emailIsBusy = false;

          const email = this.form.get('email').value;
          const password = this.form.get('password').value;
          const user: IUser[] = this.users.filter(userItem => userItem.email === email && userItem.password === password);

          if (user[0]) {

               this.userS.user = user[0];
               this.userS.loginStatus = true;
               this.modal.hideModal.nativeElement.click();
               this.userS.wrongEmailOrPassword = false;
          } else {

               this.userS.wrongEmailOrPassword = true;
          }
     }





     submit(): void {
          if (this.modal.registrationStatus) {

               console.log(this.modal.registrationStatus);
               this.register();
          } else {

               console.log(this.modal.registrationStatus);
               this.enter();
          }
     }





}
