import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/shared/services/fire.service';
import { IWords } from 'src/app/shared/model/words';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  words: IWords[] = [];
  constructor(
    public db: FireService,
    private cs: CardService
  ) { }

  ngOnInit(): void {
    this.db.getCollection('english').subscribe(arr => {

      this.words = arr.map(words => {
        return {
          ...words.payload.doc.data(),
          id: words.payload.doc.id
        };
      }).filter(item => item.id === "akcCwY55Cb6RBgYJCHfh")[0].words.
        map(item => JSON.parse(item));
      console.log('lol ddd=>', this.words);

    })
  }

  change(): void {
    this.cs.randomWord(this.words)
  }

}
