import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/shared/services/fire.service';
import { IWords } from 'src/app/shared/model/words';
import { CardService } from 'src/app/shared/services/card.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  words: IWords[] = [];
  subcsribe$: Subscription;
  constructor(
    public db: FireService,
    private cardS: CardService,
    private userS: UsersService
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


