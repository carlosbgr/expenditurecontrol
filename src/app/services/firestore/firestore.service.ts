import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '../../../firebase/firebase.config';

firebase.initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  constructor() { }

  get(collection: string): Observable<any> {
    const ref = this.selectCollection(collection);
    return new Observable((observer) => {
      ref.onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          users.push(data);
        });
        observer.next(users);
      });
    });
  }

  getOne(collection: string, findIn: string, findA: string): Observable<any> {
    const ref = this.selectCollection(collection);
    return new Observable((observer) => {
      ref.where(findIn, '==', findA).get().then((doc) => {
        observer.next(doc);
      });
    });
  }

  find(collection: string, findIn: string, findA: string): Observable<any> {
    const ref = this.selectCollection(collection);
    return new Observable((observer) => {
      ref.where(findIn, '==', findA).get().then((found: any) => {
        if (found.docs.length === 0) {
          return false;
        }
      });
    });
  }

  create(collection: string, data: any): Observable<any> {
    const ref = this.selectCollection(collection);
    return new Observable((observer) => {
      ref.add(data).then((doc) => {
        observer.next({
          id: doc.id,
        });
      });
    });
  }

  // public find(collection: string, findIn: string, findA: string): boolean {
  //   let findOk;
  //   const db = admin.firestore();
  //   db.collection(collection).where(findIn, '==', findA).get()
  //     .then(() => {
  //       findOk = true;
  //     }).catch(() => {
  //       findOk = false;
  //     });

  //   return findOk;
  // }

  // public create(collection: string, obj: any) {
  //   return this._firestore.collection(collection).add(obj);
  // }

  // public delete(collection: string, object: any) {
  //   this._firestore.doc(collection + object.id).delete();
  // }

  // public update(collection: string, object: any) {
  //   this.delete(collection, object);
  //   this._firestore.doc(`${collection}/${object.id}`).update(object);
  // }

  selectCollection(collection: string) {
    return firebase.firestore().collection(collection);
  }
}
