import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { SitesService } from 'src/app/services/sites/sites.service';
import { AddLocationsComponent } from '../add-locations/add-locations.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';


@Component({
  selector: 'app-view-locations',
  templateUrl: './view-locations.component.html',
  styleUrls: ['./view-locations.component.scss'],
})
export class ViewLocationsComponent implements OnInit {
  token: string
  details: any
  contacts: any
  constructor(

    private _router: Router,
    private modalCtrl: ModalController,
    private _siteService: SitesService,
    private _contactService: ContactsService,
    private sms: SMS,
    private callNumber: CallNumber,
    private androidPermissions: AndroidPermissions,
    private device:Device
  ) {
    const path = this._router.url.split('?')[0];
    this.token = path.split('/').filter(x => x !== '')[2];
  }

  ngOnInit() {
    this.view();
    this.loadContacts();
  }

  loadContacts() {
    this._contactService.list(this.token,this.device.uuid).subscribe({
      next: (response) => {
        this.contacts = response;
        console.log(response)
      }
    })
  }

  call(number: any) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  async sendMessage(number: any) {

    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.SEND_SMS
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.SEND_SMS
      );

      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }

      this.sms.send(number, 'Hi').then(res => console.log('Launched message!', res))
        .catch(err => console.log('Error launching message', err));
    }

  }




  view() {
    this._siteService.view(this.token).subscribe({
      next: (response) => {
        this.details = response;
        console.log(response)
      }
    })
  }


  async addcontact() {
    const modal = await this.modalCtrl.create({
      component: AddContactComponent,
    });
    modal.onDidDismiss().then(data => {
      this.loadContacts();
    });
    return await modal.present();
  }
}
