import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { SitesService } from 'src/app/services/sites/sites.service';
import { AddLocationsComponent } from '../add-locations/add-locations.component';
import { Device } from '@awesome-cordova-plugins/device/ngx';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {

  sites: any;
  constructor(
    private _router: Router,
    private modalCtrl: ModalController,
    private _siteServices: SitesService,
    private device:Device
  ) { }

  ngOnInit() {
    this.loadLocations();
  }


  refresh(ev: any) {
    setTimeout(() => {
      this.loadLocations();
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  loadLocations() {
    this._siteServices.list(this.device.uuid).subscribe({
      next: (response) => {
        this.sites = response;
      }
    })
  }

  async openAddSiteLocation() {
    const modal = await this.modalCtrl.create({
      component: AddLocationsComponent,
    });
    modal.onDidDismiss().then(data => {

      this.loadLocations();
    });
    return await modal.present();
  }
}
