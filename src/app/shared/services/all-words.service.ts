import { Injectable } from '@angular/core';
import { IWords } from '../model/words';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllWordsService {

  constructor(
    private fs: AngularFirestore
  ) {

  }
  all_words: Observable<any[]>;
  all_words_arr_obj: IWords[] = [];
  all_words_arr_str: string[] = [];
  all_words_arr_obj_stringify: string[] = [];
  textarea: string = '';

  addWords(): void {

    const global = new RegExp('([0-9]+)\\s+(\\S+)\\s+(\\S+)\\s+(\\D+)', 'gm'); // includes str
    const local = new RegExp('([0-9]+)\\s+(\\S+)\\s+(\\S+)\\s+(\\D+)', 'm'); // devide group for str

    this.all_words_arr_str = this.textarea.match(global);

    this.all_words_arr_obj_stringify = this.all_words_arr_str.map((item) => {
      const result = item.match(local);
      const id = +result[1] - 1;
      const word = result[2];
      const transcription = result[3];
      const translate = result[4];
      return JSON.stringify(new IWords(id, word, transcription, translate))
    })

    this.fs.collection('english').add({ words: this.all_words_arr_obj_stringify });

  }

  wordsValues(): Observable<any[]> {
    return this.fs.collection('words').valueChanges();
  }
  aboutSkillsArr: any[] = [];

  getAboutSkills(): void {
    this.getPortfolio('english').subscribe(actionArray => {
      this.aboutSkillsArr = actionArray.map(words => {
        return {
          ...words.payload.doc.data(),
          id: words.payload.doc.id
        };
      });
    });
  }

  getPortfolio(collection: string): any {
    return this.fs.collection(`${collection}`).snapshotChanges();
  }

  deleteDoc(work: any, collection: string) {
    this.fs.doc(`${collection}/${work.deleteID}`).delete();
  }
  deleteDocID(work?: any, collection?: string) {
    this.fs.doc(`english}/${this.aboutSkillsArr[0].id}`).delete();
  }

}
