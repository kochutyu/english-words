import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { IWords } from 'src/app/shared/model/words';
import { FireService } from 'src/app/shared/services/fire.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // words: IWords[] = [];

  @Input() words: IWords[];

  @ViewChild('card', { static: false }) card: ElementRef;

  constructor(
    private r: Renderer2,
    public db: FireService,
  ) { }
  arr: any[] = [];
  selectWord: IWords;
  word: string = '';
  transcription: string = '';
  translate: string = '';
  ngOnInit(): void {
    this.db.getCollection('english').subscribe(arr => {

      this.words = arr.map(words => {
        return {
          ...words.payload.doc.data(),
          id: words.payload.doc.id
        };
      }).filter(item => item.id === "akcCwY55Cb6RBgYJCHfh")[0].words.
        map(item => JSON.parse(item));

      this.word = this.words[1000].word;
      this.transcription = this.words[1000].transcription;
      this.translate = this.words[1000].translate;
      console.log('lol =>',this.word);

    })
  }
  rotadeStatus: boolean = false;
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
