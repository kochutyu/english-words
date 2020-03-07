import { Component, OnInit } from '@angular/core';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IWords } from 'src/app/shared/model/words';
import { AllWordsService } from 'src/app/shared/services/all-words.service';
import { FireService } from 'src/app/shared/services/fire.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // languages: string[] = this.LanguagesService.languages;
  constructor(
    public ls: LanguagesService,
    private db: AngularFirestore,
    public aws: AllWordsService,
    public fs: FireService
    
  ) {
  }

  words: any[];
  arr: any[];
  ngOnInit(): void {
    // this.aws.getAboutSkills()
    // this.fs.getSubscribe('english',this.arr);
    this.fs.getCollection('english').subscribe( arr => {
      this.arr = arr.map(words => {
        return {
          ...words.payload.doc.data(),
          id: words.payload.doc.id
        };
      });
      
      console.log('this => ', this.arr[0].words.map(i => JSON.parse(i)));
    })
  }

  textarea: string = '';
  alert(): void {
    this.aws.textarea = this.textarea;
    console.log(this.arr);
    
    // this.aws.addWords();
    
  }
}
