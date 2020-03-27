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
import { RegistrationFormService } from 'src/app/shared/services/registration-form.service';

@Component({
     selector: 'app-registration-form',
     templateUrl: './registration-form.component.html',
     styleUrls: ['./registration-form.component.scss']
})

export class RegistrationFormComponent implements OnInit, OnDestroy {
     form: FormGroup;

     // get users
     users: IUser[] = [];
     users$: Subscription;

     // get all words
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
          public registrationFormS: RegistrationFormService
     ) { }



     ngOnInit(): void {
          this.registrationFormS.getAllUsers(); //todo GET INFO ABOUT ALL USERS
          !sessionStorage.getItem('words') ? this.registrationFormS.getAllWords() : null; //todo GET ALL WORDS
          this.checkRegisterOrLogin();
     }

     ngOnDestroy() {
          this.registrationFormS.users$.unsubscribe(); //* REMOVE INFO ABOUT ALL USERS
     }

     //todo MY CODE
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

     checkRegisterOrLogin(): void {
          if (this.modal.registrationStatus) {
               this.signInFormGroup()
          } else {
               this.logInFormGroup()
          }
     }

     submit(): void {
          const nickName = this.form.get('nickName').value;
          const password = this.form.get('password').value;
          if (this.modal.registrationStatus) {
               this.registrationFormS.register(nickName, password); //todo REGISTER USER
          } else {
               this.registrationFormS.enter(nickName, password); //todo LOGIN USER
          }
     }





}
