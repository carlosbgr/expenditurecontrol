import { Component, OnInit, ViewChild } from '@angular/core';

import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @ViewChild('modalAddAccount') modalAddAccount;

  constructor(private _firestoreService: FirestoreService) {}

  ngOnInit() {
    this.modalAddAccount.open();
  }



}
