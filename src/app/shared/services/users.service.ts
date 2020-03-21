import { Injectable } from '@angular/core';
import { IUser } from '../model/user.model';
import { IWords } from '../model/words';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  loginStatus: boolean = false;
  nickNameIsBusy: boolean = false;
  wrongNickNameOrPassword: boolean = false;
  user: IUser;
  users: IUser[] = [];

  constructor(
    private fs: AngularFirestore
  ) { 
    this.users = []
  }

  getNewDataAboutWordsInfo(user: IUser, randomWord: IWords, arrPush: any[]): void { 
    const id = user.id;
    const nickName = user.nickName;
    const password = user.password;
    const learnedWords = user.learnedWords;
    const notLearnedWords = user.notLarnedWords;

    arrPush.push(JSON.stringify(randomWord));

    const newUser = new IUser(nickName, password, learnedWords, notLearnedWords);
    this.fs.doc(`users/${id}`).delete();
    this.fs.collection('users').add(JSON.parse(JSON.stringify(user)));
  }
}
