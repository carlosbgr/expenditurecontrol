import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import * as admin from 'firebase-admin';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  constructor(private _firestore: AngularFirestore) { }

  public get(collection: string) {
    return this._firestore.collection(collection);
  }

  public find(collection: string, findIn: string, findA: string): boolean {
    let findOk;
    const db = admin.firestore();
    db.collection(collection).where(findIn, '==', findA).get()
      .then(() => {
        findOk = true;
      }).catch(() => {
        findOk = false;
      });

    return findOk;
  }

  public create(collection: string, obj: any) {
    return this._firestore.collection(collection).add(obj);
  }

  public delete(collection: string, object: any) {
    this._firestore.doc(collection + object.id).delete();
  }

  public update(collection: string, object: any) {
    this.delete(collection, object);
    this._firestore.doc(`${collection}/${object.id}`).update(object);
  }
}
