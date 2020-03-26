import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { IWords } from 'src/app/shared/model/words';
import { Subscription, Observable } from 'rxjs';
import { FireService } from 'src/app/shared/services/fire.service';
import { CardService } from 'src/app/shared/services/card.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { IUser } from 'src/app/shared/model/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-learn-new-words',
  templateUrl: './learn-new-words.component.html',
  styleUrls: ['./learn-new-words.component.scss']
})
export class LearnNewWordsComponent implements OnInit, OnDestroy {

  words: IWords[] = [];
  subscribeUser$: Subscription;
  thisUser: IUser[];
  constructor(
    public db: FireService,
    private cardS: CardService,
    public userS: UsersService,
    public fs: AngularFirestore,
    private r: Renderer2
  ) { }

  user$: Subscription;
  users: IUser[];

  allUsersWord: string[];

  @ViewChild('learnWord', { static: false }) learnWord: ElementRef;
  @ViewChild('rememberWord', { static: false }) rememberWord: ElementRef;
  ngOnInit(): void {
    this.cardS.allWords = false;
    this.randomWord();


    // this.user$ = this.db.getCollection('users').subscribe(actionArr => {
    //   this.users = actionArr.map(item => {
    //     return {
    //       ...item.payload.doc.data(),
    //       id: item.payload.doc.id
    //     };
    //   }).filter(item => item.id === this.userS.user.id);
    //   this.userS.user = this.users[0]
    //   console.log('USER => ', this.users[0]);
    // });

  }

  ngOnDestroy(): void {

  }

  randomWord(): IWords {
    // console.log('this.allUsersWord', this.allUsersWord);

    if (sessionStorage.getItem('words')) {
      const sessionStorageWords: string = sessionStorage.getItem('words');

      // get user all words
      this.allUsersWord = this.userS.user.learnedWords.concat(this.userS.user.notLarnedWords);

      const AllWordsSession: IWords[] = JSON.parse(sessionStorageWords);
      let AllWordsSessionItemStringify = AllWordsSession.map(item => JSON.stringify(item));
      const allUsersWord = this.allUsersWord;

      // filter out words for dissimilar
      allUsersWord.forEach(userWord => {
        AllWordsSessionItemStringify = AllWordsSessionItemStringify.filter(fordFromSessionStorage => fordFromSessionStorage !== userWord);
      });

      // done filter words
      const filterWords: IWords[] = AllWordsSessionItemStringify.map(item => JSON.parse(item));

      // save user insessionStorage
      sessionStorage.setItem('user', JSON.stringify(this.userS.user));

      this.cardS.words = filterWords;

      const word: IWords = this.cardS.randomWord();
      return word;
    }
  }

  nextWord(): void {
    this.r.setAttribute(this.learnWord.nativeElement, 'disabled', 'disabled');
    this.r.setAttribute(this.rememberWord.nativeElement, 'disabled', 'disabled');

    this.r.setStyle(this.userS.progress.nativeElement, 'backgroundColor', `rgb(177, 238, 78)`);

    const newWord: string[] = this.userS.user.learnedWords;
    newWord.push(JSON.stringify(this.cardS.previousWord));

    this.r.setStyle(this.userS.progress.nativeElement, 'width', `${this.userS.getProgressLearnewWords()}%`);

    this.r.setStyle(this.userS.progress.nativeElement, 'backgroundColor', `rgb(125, 177, 40)`);

    this.fs.collection('users').doc(this.userS.user.id).update({
      learnedWords: newWord
    });

    setTimeout(() => {
      this.r.setStyle(this.userS.progress.nativeElement, 'backgroundColor', `rgb(177, 238, 78)`);
    }, 300);
    setTimeout(() => {
      this.r.removeAttribute(this.learnWord.nativeElement, 'disabled');
      this.r.removeAttribute(this.rememberWord.nativeElement, 'disabled');
    }, 200)
    this.randomWord();
  }

  didNotRemeberWord(): void {
    this.r.setAttribute(this.learnWord.nativeElement, 'disabled', 'disabled');
    this.r.setAttribute(this.rememberWord.nativeElement, 'disabled', 'disabled');

    const newWord: string[] = this.userS.user.notLarnedWords;
    newWord.push(JSON.stringify(this.cardS.previousWord));

    this.fs.collection('users').doc(this.userS.user.id).update({
      notLarnedWords: newWord
    });

    setTimeout(() => {
      this.r.removeAttribute(this.learnWord.nativeElement, 'disabled');
      this.r.removeAttribute(this.rememberWord.nativeElement, 'disabled');
    }, 200)
    this.randomWord();
  }
}
