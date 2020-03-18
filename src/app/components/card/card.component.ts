import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, AfterViewInit } from '@angular/core';
import { IWords } from 'src/app/shared/model/words';
import { FireService } from 'src/app/shared/services/fire.service';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {

  // words: IWords[] = [];

  @Input() words: IWords[];

  @ViewChild('card', { static: false }) card: ElementRef;

  constructor(
    private r: Renderer2,
    public db: FireService,
    public cs: CardService
  ) { }
  ngAfterViewInit(): void {
    console.log(this.words);

  }
  arr: any[] = [];
  selectWord: IWords;
  word: string = '';
  transcription: string = '';
  translate: string = '';
  rotadeStatus: boolean = false;
  ngOnInit(): void {
    if (sessionStorage.getItem('words')) {
      const words: IWords[] = JSON.parse(sessionStorage.getItem('words'));
      this.cs.randomWord(words);
    }
  }

  rotade(): void {
    // this.card.nativeElement.click()
    if (this.rotadeStatus) {
      this.r.setStyle(this.card.nativeElement, 'transform', `rotateY(0deg)`);
      this.rotadeStatus = false;
    } else {
      this.r.setStyle(this.card.nativeElement, 'transform', `rotateY(-180deg)`);
      this.rotadeStatus = true;
    }
  }

}