import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/shared/services/app.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FireService } from 'src/app/shared/services/fire.service';
import { IUser } from 'src/app/shared/model/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from 'src/app/shared/services/users.service';
import { Observable, Subscription } from 'rxjs';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { IWords } from 'src/app/shared/model/words';

@Component({
     selector: 'app-registration-form',
     templateUrl: './registration-form.component.html',
     styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
     form: FormGroup;

     users: IUser[] = [];
     users$: Subscription;

     words: IWords[] = [];
     words$: Subscription;

     constructor(
          public app: AppService,
          public modal: ModalService,
          private fs: AngularFirestore,
          public userS: UsersService,
          public validatorS: ValidatorsService,
          private db: FireService
     ) { }



     ngOnInit(): void {
          this.getUsers(); // ! info about users
          !sessionStorage.getItem('words') ? this.getWords() : null; // ! for sessionStorage
          this.checkRegisterOrLogin();
     }





     ngOnDestroy() {
          this.users$.unsubscribe();
     }




     checkRegisterOrLogin(): void {
          if (this.modal.registrationStatus) {
               this.signInFormGroup()
          } else {
               this.logInFormGroup()
          }
     }





     getUsers(): void {
          this.users$ = this.db.getCollection('users').subscribe(actionArr => {
               this.users = actionArr.map(item => {
                    return {
                         ...item.payload.doc.data(),
                         id: item.payload.doc.id
                    };
               });
               console.log('users => ', this.users);
          });
     }





     getWords(): void {
          this.words$ = this.db.getCollection('english').subscribe(arr => {
               this.words = arr.map(words => {
                    return {
                         ...words.payload.doc.data(),
                         id: words.payload.doc.id
                    };
               }).filter(item => item.id === "akcCwY55Cb6RBgYJCHfh")[0].words.
                    map(item => JSON.parse(item));
               sessionStorage.setItem('words', JSON.stringify(this.words));
               this.words$.unsubscribe()
               console.log(this.words);
          })
     }





     logInFormGroup(): void {
          this.form = new FormGroup({
               nickName: new FormControl('', [Validators.required]),
               password: new FormControl('', [Validators.required])
          });
     }





     signInFormGroup(): void {
          this.form = new FormGroup({
               nickName: new FormControl('', [Validators.required, Validators.minLength(3)]),
               password: new FormControl('', [Validators.required, Validators.minLength(6)]),
          });
     }





     signInForm(): void {

          this.modal.registrationStatus = true;
          this.signInFormGroup();
     }





     logInForm(): void {
          this.modal.registrationStatus = false;
          this.logInFormGroup();
     }





     newUser(): IUser {
          const nickName = this.form.get('nickName').value;
          const password = this.form.get('password').value;
          const user = new IUser(nickName, password);
          this.userS.user = JSON.parse(JSON.stringify(user));
          return this.userS.user;
     }





     register(): void {
          this.userS.wrongNickNameOrPassword = false;
          const nickNameIsBusy: boolean = this.users.some(item => item.nickName === this.form.get('nickName').value);
          if (!nickNameIsBusy) {
               this.userS.nickNameIsBusy = false;
               this.fs.collection('users').add(this.newUser());
               this.userS.loginStatus = true;
               this.modal.hideModal.nativeElement.click();
               this.form.reset();
          } else {
               this.newUser();
               this.userS.nickNameIsBusy = true;
          }
     }





     enter(): void {
          this.userS.nickNameIsBusy = false;

          const nickName = this.form.get('nickName').value;
          const password = this.form.get('password').value;
          const user: IUser[] = this.users.filter(userItem => userItem.nickName === nickName && userItem.password === password);

          if (user[0]) {

               this.userS.user = user[0];
               this.userS.loginStatus = true;
               this.modal.hideModal.nativeElement.click();
               this.userS.wrongNickNameOrPassword = false;
          } else {

               this.userS.wrongNickNameOrPassword = true;
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
