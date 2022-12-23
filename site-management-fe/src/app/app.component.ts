import { Component } from '@angular/core';
import { Uid } from '@ionic-native/uid/ngx';
import { environment } from 'src/environments/environment';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(    private uid: Uid, private androidPermissions: AndroidPermissions,) {
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS, this.androidPermissions.PERMISSION.SEND_SMS,this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION]);
  }
}
