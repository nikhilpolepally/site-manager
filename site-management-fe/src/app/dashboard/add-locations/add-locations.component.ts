import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@capacitor/google-maps';
import { Coordinates } from '@awesome-cordova-plugins/geolocation';
import { ServicesService } from '../../services/services/services.service';
import { SitesService } from 'src/app/services/sites/sites.service';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-add-locations',
  templateUrl: './add-locations.component.html',
  styleUrls: ['./add-locations.component.scss'],
})
export class AddLocationsComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('map') mapRef: any;
  location!: Coordinates
  newMap!: GoogleMap;
  addLocationForm: FormGroup | any
  uuid!:string
  city !: string
  constructor(private geolocation: Geolocation,
    private _model: ModalController,
    private _serviceService: ServicesService,
    private alertController: AlertController,
    private _siteService: SitesService,
    private androidPermissions: AndroidPermissions,
    private uid: Uid,

    private fb: FormBuilder,) {

    this.getCurrentLocation();
    this.uuid=this.uid.IMEI;
    console.log(this.uid.IMEI)

  }

  ngOnInit() {
    this.addLocationForm = this.fb.group({
      locationName: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      city: [null, [Validators.required]],
      details: []
    });
  }




  cancel() {
    this._model.dismiss();
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((locationresponse) => {
      this._serviceService.getCityName(locationresponse.coords.latitude, locationresponse.coords.longitude).subscribe({
        next: (cityresponse) => {
          this.city = cityresponse.address.city;
          this.location = locationresponse.coords;
          this.addLocationForm = this.updateLocation();
        }
      })

    }).catch((error) => {
    });

  }

  updateLocation(): FormGroup {
    return this.fb.group({
      latitude: [this.location.latitude],
      longitude: [this.location.longitude],
      locationName: [],
      city: [this.city],
      details: []
    })
  }



  confirm() {
    if (!this.addLocationForm.valid) {
      return;
    }

    this._siteService.create(this.addLocationForm.value, this.uid.IMEI).subscribe({
      next: async (response) => {
        if (response.Status == "success") {
          this.addLocationForm.reset();
          const alert = await this.alertController.create({
            header: response.Status,
            message: response.Message,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this._model.dismiss();
                }
              }
            ],
          });
          alert.present();
        }
      },
      error: async (error) => {
        const alert = await this.alertController.create({
          header: 'Failed',
          message: 'Missing mandatory fields',
          buttons: [
            {
              text: 'Ok',
            }
          ],
        });
        alert.present();
      }
    })

  }

  onWillDismiss(event: Event) {

  }

}
