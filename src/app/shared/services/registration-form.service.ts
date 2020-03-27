import { Injectable } from '@angular/core';
import { IUser } from '../model/user.model';
import { Subscription } from 'rxjs';
import { IWords } from '../model/words';
import { Router } from '@angular/router';
import { ValidatorsService } from './validators.service';
import { UsersService } from './users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalService } from './modal.service';
import { AppService } from './app.service';
import { FireService } from './fire.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {

  // get form values
  nickName: string;
  password: string;

  // get users
  users: IUser[] = [];
  users$: Subscription;

  // get all words
  words: IWords[] = [];
  words$: Subscription;

  registerSubmit: boolean;

  constructor(
    public app: AppService,
    public modal: ModalService,
    private fs: AngularFirestore,
    public userS: UsersService,
    public validatorS: ValidatorsService,
    private db: FireService,
    private router: Router,
  ) { }


  getAllWords(): void {
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
    })
  }

  getAllUsers(): void {
    this.users$ = this.db.getCollection('users').subscribe(actionArr => {
      this.users = actionArr.map(item => {
        return {
          ...item.payload.doc.data(),
          id: item.payload.doc.id
        };
      });

      if (this.registerSubmit) {
        this.getRegistredUser();
      }

    });
  }

  newUser(nickName: string, password: string): IUser {
    const learnedWords: string[] = [];
    const notLearnedWords: string[] = [];
    const newUser = new IUser(nickName, password, learnedWords, notLearnedWords);
    return JSON.parse(JSON.stringify(newUser));
  }

  addUserToDatabase(user: IUser): void {
    this.fs.collection('users').add(user);
  }

  getRegistredUser(nickName: string = this.nickName, password: string = this.password): void {
    this.userS.user = this.users.find(item => item.nickName === nickName && item.password === password);
    sessionStorage.setItem('user', JSON.stringify(this.userS.user));
    sessionStorage.setItem('logIn', JSON.stringify(true));
    this.userS.loginStatus = true;
    this.modal.hideModal.nativeElement.click();
    this.router.navigate(['/learn-new-words']);
  }

  register(nickName: string, password: string): void {
    this.nickName = nickName;
    this.password = password;
    const userExist: IUser = this.users.find(item => item.nickName === nickName && item.password === password);

    if (!userExist) {
      const newUser = this.newUser(nickName, password);
      this.addUserToDatabase(newUser);
      this.registerSubmit = true;

    } else {
      this.registerSubmit = false;
    }
  }

  enter(nickName: string, password: string): void { 
    const user: IUser = this.users.find(item => item.nickName === nickName && item.password === password);
    if (user) { 
      const sessionStorageUser: IUser = JSON.parse(sessionStorage.getItem('user'))
      if (sessionStorageUser) {
        if (sessionStorageUser.nickName === user.nickName && sessionStorageUser.password === user.password) {
          if (JSON.stringify(sessionStorageUser.learnedWords) === JSON.stringify(user.learnedWords) && JSON.stringify(sessionStorageUser.notLarnedWords) === JSON.stringify(user.notLarnedWords)) {
            this.getRegistredUser(nickName, password);
          } else { //todo ARRAYS WITH WORDS IN USER ara DIFFERENT
            this.userS.user = sessionStorageUser;
          }
        } else { //todo DIFFERENT USERS
          this.getRegistredUser(nickName, password);
        }
      } else { 
        this.getRegistredUser(nickName, password);
      }
    }
  }

}
