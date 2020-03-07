import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(
    private fs: AngularFirestore
  ) { }

  getCollection(collection: string): any {
    return this.fs.collection(`${collection}`).snapshotChanges();
  }

  deleteDocID(work?: any, collection?: string) {
    this.fs.doc(`english}/${this.getCollection[0].id}`).delete();
  }

  getSubscribe(collection: string, getInfo?: any[]): Observable<any> {
    let arr: any[] = [];
    return this.getCollection(`${collection}`).subscribe(actionArray => {
      getInfo = actionArray.map(words => {
        return {
          ...words.payload.doc.data(),
          id: words.payload.doc.id
        };
      });
      if(getInfo) console.log(getInfo);
    });
  }

}
