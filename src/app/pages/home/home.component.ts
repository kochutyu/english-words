import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/shared/services/fire.service';
import { IWords } from 'src/app/shared/model/words';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  words: IWords[] = [];
  constructor(
    public db: FireService,
  ) { }

  ngOnInit(): void {
  }

}
