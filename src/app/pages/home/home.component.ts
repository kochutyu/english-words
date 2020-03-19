import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/shared/services/fire.service';
import { IWords } from 'src/app/shared/model/words';
import { CardService } from 'src/app/shared/services/card.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';

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
    public userS: UsersService,
    public modal: ModalService
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


