import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import '@firebase/database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {

  constructor() { }

  public get(url: string) {

  }

  public getOne(url: string, search: string, find: string): any {
    return firebase.database().ref(url).
      orderByChild(search).equalTo(find)
        .once('child_added')
        .then(function* (snapshot) { return snapshot.child(search).val(); });
  }

  public set(url: string, object: any): boolean {
    let itsOk: boolean;
    firebase.database().ref(url).push(object)
      .then(
        (res: any) => { itsOk = true; },
        (err: any) => { itsOk = false; });
    return itsOk;
  }
}
