import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { AddLocationsComponent } from './add-locations/add-locations.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private _router: Router,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }



}
