import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { SitesService } from 'src/app/services/sites/sites.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {

  token: string
  details: any
  contacts: any
  constructor(

    private _router: Router,
    private modalCtrl: ModalController,
    private _siteService: SitesService,
    private _contactService: ContactsService
  ) {
    const path = this._router.url.split('?')[0];
    this.token = path.split('/').filter(x => x !== '')[2];
  }


  ngOnInit() { }
  loadContacts() {
    this._contactService.list(this.token, "test").subscribe({
      next: (response) => {
        this.contacts = response;
      }
    })
  }
}
