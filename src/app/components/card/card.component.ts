import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, AfterViewInit } from '@angular/core';
import { IWords } from 'src/app/shared/model/words';
import { FireService } from 'src/app/shared/services/fire.service';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  rotadeStatus: boolean = false;

  @Input() words: IWords[];
  @ViewChild('card', { static: false }) card: ElementRef;

  constructor(
    private r: Renderer2,
    public db: FireService,
    public cardS: CardService
  ) { }

  ngOnInit(): void {
    // if (this.cardS.allWords) {
    //   if (sessionStorage.getItem('words')) {
    //     this.words = JSON.parse(sessionStorage.getItem('words'));
    //     this.cardS.words = this.words;
    //     this.cardS.randomWord();
    //   }
    // }
  }

  rotade(): void {
    if (this.rotadeStatus) {
      this.r.setStyle(this.card.nativeElement, 'transform', `rotateY(0deg)`);
      this.rotadeStatus = false;
    } else {
      this.r.setStyle(this.card.nativeElement, 'transform', `rotateY(-180deg)`);
      this.rotadeStatus = true;
    }
  }

}
