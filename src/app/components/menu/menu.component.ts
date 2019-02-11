import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  users: any[] = [];

  constructor(dbService: DatabaseService) {
    // db.list('Users').valueChanges().subscribe(users => {
    //   this.users = users;
    // });

  }

  ngOnInit() {
  }

}
