import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private http: HttpClient,
  ) { }


  getCityName(lat: any, lon: any) {
    return this.http.get<any>(`https://us1.locationiq.com/v1/reverse.php?key=pk.2550ddec10dc5680246d0444fef0bba0&lat=` + lat + "&lon=" + lon + "&format=json");
  }
}
