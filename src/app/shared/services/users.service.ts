import { Injectable, ElementRef, Renderer2 } from '@angular/core';
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
  progress: ElementRef;
  progressLine: ElementRef;

  learnedWords: number;
  constructor(
    private fs: AngularFirestore,
  ) {
    this.users = []
  }

  getProgressLearnewWords(): number {
    if (sessionStorage.getItem('words')) {
      const words: IWords[] = JSON.parse(sessionStorage.getItem('words'));
      let percent = this.user.learnedWords.length * 100 / words.length;
      return percent
    }
    return null
  }

  updateDataUserFromStorage(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log('USER',this.user);

    this.fs.collection('users').doc(this.user.id).update({ // update data
      learnedWords: this.user.learnedWords,
      notLarnedWords: this.user.notLarnedWords,
    });
  }
}
