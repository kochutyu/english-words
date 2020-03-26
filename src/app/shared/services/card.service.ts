import { Injectable } from '@angular/core';
import { IWords } from '../model/words';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  allWords: boolean = true;
  words: IWords[] = [];
  selectWord: IWords;

  id: number;
  word: string = '';
  transcription: string = '';
  translate: string = '';
  constructor(
    private userS: UsersService
  ) {
  }


  previousWord: IWords;
  randomWord(): IWords {
    const arr = this.words;
    const rand = Math.floor(Math.random() * Math.max(arr.length));

    this.selectWord = arr[rand];
    this.id = this.selectWord.id;
    this.word = this.selectWord.word;
    this.transcription = this.selectWord.transcription;
    this.translate = this.selectWord.translate;
    const randomWord = new IWords(this.id, this.word, this.transcription, this.translate);

    if (JSON.stringify(this.previousWord) !== JSON.stringify(randomWord)) {
      this.previousWord = randomWord;
    }

    return randomWord;
  }

}
