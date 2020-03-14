import { Injectable } from '@angular/core';
import { IWords } from '../model/words';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  words: IWords[] = [];
  selectWord: IWords;

  word: string = '';
  transcription: string = '';
  translate: string = '';
  constructor() {
  }

  randomWord(arr: IWords[]): void{
    const rand = Math.floor(Math.random() * Math.max(arr.length));
    this.selectWord = arr[rand];
    this.word = this.selectWord.word;
    this.transcription = this.selectWord.transcription;
    this.translate = this.selectWord.translate;
    console.log(this.selectWord);
    
  }
}
