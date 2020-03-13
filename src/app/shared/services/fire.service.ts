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

  getCollection(collection: string): Observable<any[]> {
    return this.fs.collection(`${collection}`).snapshotChanges();
  }

  deleteItem(collection?: string, work?: object): void {
    this.fs.doc(`${collection}/${work}.id`).delete();
  }




}
