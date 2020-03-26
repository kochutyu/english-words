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
import { Router } from '@angular/router';

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
          private db: FireService,
          private router: Router,
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
          const learnedWords: string[] = [];
          const notLearnedWords: string[] = [];
          const user = new IUser(nickName, password, learnedWords, notLearnedWords);
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

          if (user[0]) { // if user exist

               if (sessionStorage.getItem('user')) { // if user exist in sessionStorage
                    const userStringify = JSON.stringify(user[0]);
                    const sessionStorageUserStringify = sessionStorage.getItem('user');
                    if (userStringify === sessionStorageUserStringify) {
                         this.userS.user = user[0];
                    } else {
                         alert('update');
                         this.userS.user = JSON.parse(sessionStorage.getItem('user'));

                         this.fs.collection('users').doc(this.userS.user.id).update({ // update data
                              learnedWords: this.userS.user.learnedWords,
                              notLarnedWords: this.userS.user.notLarnedWords,
                         });
                    }

               } else {
                    this.userS.user = user[0];
               }

               // save user insessionStorage
               sessionStorage.setItem('user', JSON.stringify(user[0]));

               this.userS.loginStatus = true;
               this.modal.hideModal.nativeElement.click();
               this.userS.wrongNickNameOrPassword = false;
               this.router.navigate(['/learn-new-words']);
               console.log(user[0]);

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
