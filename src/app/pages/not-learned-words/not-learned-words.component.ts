import { Component, OnInit, Renderer2 } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { CardService } from 'src/app/shared/services/card.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-not-learned-words',
  templateUrl: './not-learned-words.component.html',
  styleUrls: ['./not-learned-words.component.scss']
})
export class NotLearnedWordsComponent implements OnInit {

  constructor(
    private userS: UsersService,
    private cardS: CardService,
    private r: Renderer2,
    private fs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.randomWord();
  }

  randomWord(): void {

    // get user`s notLarnedWords
    this.cardS.words = this.userS.user.notLarnedWords.map(item => JSON.parse(item));

    if (this.userS.user.notLarnedWords.length > 0) {
      this.cardS.randomWord();
    } else {

      // if haven`t words in notLarnedWords
      delete this.cardS.word;
      this.cardS.transcription = "The words are over";
      delete this.cardS.translate;
    }

    // save user insessionStorage
    sessionStorage.setItem('user', JSON.stringify(this.userS.user));

  }

  nextWord(): void {
    if (this.userS.user.notLarnedWords.length > 0) {

      // learned user word
      const learnedWords: string[] = this.userS.user.learnedWords;
      learnedWords.push(JSON.stringify(this.cardS.previousWord));

      // delete user word
      this.userS.user.notLarnedWords = this.userS.user.notLarnedWords.filter(item => item !== JSON.stringify(this.cardS.previousWord));
      const notLarnedWords = this.userS.user.notLarnedWords;

      // get new word
      this.randomWord();

      // get progress
      this.r.setStyle(this.userS.progress.nativeElement, 'width', `${this.userS.getProgressLearnewWords()}%`);

      // update database
      this.fs.collection('users').doc(this.userS.user.id).update({
        learnedWords,
        notLarnedWords
      });
    }
  }

  didNotRemeberWord(): void {
    this.randomWord()
  }

}
