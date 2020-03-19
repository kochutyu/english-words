import { Component, OnInit } from '@angular/core';
import { IWords } from 'src/app/shared/model/words';
import { Subscription } from 'rxjs';
import { FireService } from 'src/app/shared/services/fire.service';
import { CardService } from 'src/app/shared/services/card.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-learn-new-words',
  templateUrl: './learn-new-words.component.html',
  styleUrls: ['./learn-new-words.component.scss']
})
export class LearnNewWordsComponent implements OnInit {

  words: IWords[] = [];
  subcsribe$: Subscription;
  constructor(
    public db: FireService,
    private cardS: CardService,
    public userS: UsersService
  ) { }

  ngOnInit(): void {
  }

  change(): void {
    if (sessionStorage.getItem('words')) {
      const words: IWords[] = JSON.parse(sessionStorage.getItem('words'))
      this.cardS.randomWord(words);
    }
  }
}
