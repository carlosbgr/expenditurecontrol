import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../services/database/database.service';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  users: any[] = [];

  constructor(private _firestore: FirestoreService) {
    // db.list('Users').valueChanges().subscribe(users => {
    //   this.users = users;
    // });
  }

  ngOnInit() {
    console.log(this._firestore.get('Users').get());
    this._firestore.get('Users').valueChanges().subscribe((user) => {
      console.log(user);
    });
  }

}
