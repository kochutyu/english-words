import { Component, OnInit, OnDestroy } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.subscribeUser$ = this.db.getCollection('users').subscribe(actionArr => {
      this.thisUser = actionArr.map(item => {
        return {
          ...item.payload.doc.data(),
          id: item.payload.doc.id
        };
      }).filter(item => item.nickName === this.userS.user.nickName && item.password === this.userS.user.password);
      // console.log('thisUser   => ', this.thisUser);
      // this.userS.user = this.thisUser[0];
    });

  }

  ngOnDestroy(): void {
    this.subscribeUser$.unsubscribe()
  }

  randomWord(): IWords {
    if (sessionStorage.getItem('words')) {
      const words: IWords[] = JSON.parse(sessionStorage.getItem('words'));
      const word: IWords = this.cardS.randomWord(words);
      return word;
    }
  }

  nextWord(): void {
    this.userS.learnedWords = this.userS.user.learnedWords.length;
    
    this.userS.getNewDataAboutWordsInfo(this.userS.user, this.cardS.previousWord, this.userS.user.learnedWords);
    this.randomWord();

    // console.log(this.userS);
    
  }

  didNotRemeberWord(): void {
    this.userS.getNewDataAboutWordsInfo(this.userS.user, this.cardS.previousWord, this.userS.user.notLarnedWords);
    this.randomWord();
  }
}
