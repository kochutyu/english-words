import { Injectable } from '@angular/core';
import { IWords } from '../model/words';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  words: IWords[] = [];
  selectWord: IWords;

  id: number;
  word: string = '';
  transcription: string = '';
  translate: string = '';
  constructor() {
  }

  // previousWord(previousWord?: IWords): IWords { 
  //   return previousWord;
  // }
  previousWord: IWords;
  randomWord(arr: IWords[]): IWords{
    const rand = Math.floor(Math.random() * Math.max(arr.length));
    this.selectWord = arr[rand];
    this.id = this.selectWord.id;
    this.word = this.selectWord.word;
    this.transcription = this.selectWord.transcription;
    this.translate = this.selectWord.translate;
    // console.log(this.selectWord);
    const randomWord = new IWords(this.id, this.word, this.transcription, this.translate);

    if (JSON.stringify(this.previousWord) !== JSON.stringify(randomWord)) {
      this.previousWord = randomWord;
    }

    return randomWord;
  }
}
