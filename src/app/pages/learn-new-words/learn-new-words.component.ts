import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
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

  ngOnInit(): void {
    this.cardS.allWords = false;
    this.randomWord();
  }

  ngOnDestroy(): void {

  }

  randomWord(): IWords {
    if (sessionStorage.getItem('words')) {
      const words: IWords[] = JSON.parse(sessionStorage.getItem('words'));
      this.cardS.words = words;

      const word: IWords = this.cardS.randomWord();
      return word;
    }
  }

  nextWord(): void {
    const newWord: string[] = this.userS.user.learnedWords;
    newWord.push(JSON.stringify(this.cardS.previousWord));
    this.randomWord();

    this.r.setStyle(this.userS.progress.nativeElement, 'width', `${this.userS.getProgressLearnewWords()}%`);

    this.fs.collection('users').doc(this.userS.user.id).update({
      learnedWords: newWord
    });
  }

  didNotRemeberWord(): void {
    const newWord: string[] = this.userS.user.notLarnedWords;
    newWord.push(JSON.stringify(this.cardS.previousWord));
    this.randomWord();

    this.fs.collection('users').doc(this.userS.user.id).update({
      notLarnedWords: newWord
    });
  }
}
