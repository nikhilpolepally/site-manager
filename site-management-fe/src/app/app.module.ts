import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Uid } from '@ionic-native/uid/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ServicesService } from './services/services/services.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    Uid,
    AndroidPermissions,
    CallNumber,
    SMS,
    Device
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
