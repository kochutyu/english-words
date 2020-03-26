import { Component, OnInit, Renderer2 } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { CardService } from 'src/app/shared/services/card.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IWords } from 'src/app/shared/model/words';

@Component({
  selector: 'app-repeat-words',
  templateUrl: './repeat-words.component.html',
  styleUrls: ['./repeat-words.component.scss']
})
export class RepeatWordsComponent implements OnInit {

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

    // concat two arrays: learnedWords and  notLarnedWords
    const learnedWords: IWords[] = this.userS.user.learnedWords.map(item => JSON.parse(item));
    const notLarnedWords: IWords[] = this.userS.user.notLarnedWords.map(item => JSON.parse(item));
    this.cardS.words = learnedWords.concat(notLarnedWords);
    console.log(this.cardS.words);


    if (this.cardS.words.length > 0) {
      this.cardS.randomWord();
    }

    // save user insessionStorage
    sessionStorage.setItem('user', JSON.stringify(this.userS.user));

  }

  nextWord(): void {
    console.log(this.cardS.previousWord);
    this.randomWord();

  }

  didNotRemeberWord(): void {
    const previousWord: IWords = this.cardS.previousWord;
    const findWordIndex: number = this.cardS.words.findIndex(item => item.id === previousWord.id);
    console.log('findWordIndex:',findWordIndex);
    const learnedWordsLength: number = this.userS.user.learnedWords.length;
    console.log('learnedWordsLength: ', learnedWordsLength);
    const notLarnedWordsLength: number = this.userS.user.notLarnedWords.length;
    console.log('notLarnedWordsLength: ', notLarnedWordsLength);


    console.log('----------------------------');
    if (findWordIndex < learnedWordsLength) {
      
      console.log('learnedWordsLength');

      // remove word from learnedWords
      this.userS.user.learnedWords = this.userS.user.learnedWords.filter(item => item !== JSON.stringify(previousWord));
      const learnedWords = this.userS.user.learnedWords;

      // add to notLearnedWords
      this.userS.user.notLarnedWords.push(JSON.stringify(previousWord));
      const notLarnedWords = this.userS.user.notLarnedWords;

      this.r.setStyle(this.userS.progress.nativeElement, 'backgroundColor', `red`);
      this.r.setStyle(this.userS.progress.nativeElement, 'width', `${this.userS.getProgressLearnewWords()}%`);

      this.fs.collection('users').doc(this.userS.user.id).update({
        learnedWords,
        notLarnedWords
      });

    } else {
      console.log('notLarnedWordsLength');
      // this.r.setStyle(this.userS.progress.nativeElement, 'backgroundColor', `green`);

    }
    setTimeout(() => {
      this.r.setStyle(this.userS.progress.nativeElement, 'backgroundColor', `rgb(177, 238, 78)`);
    }, 300);
    

    this.randomWord()
  }

}
