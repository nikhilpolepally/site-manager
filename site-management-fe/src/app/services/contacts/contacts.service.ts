import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {


  serverUrl = environment.apiUrl;
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private uid: Uid, private androidPermissions: AndroidPermissions,
    private router: Router) {
  }


  list(sitetoken: String, uuid: string) {
    return this.http.get<any>(`${this.serverUrl}contacts/list/` + sitetoken + "/" + uuid);
  }


  create(data: any, sitetoken: string, uuid: string) {
    return this.http.post<any>(`${this.serverUrl}contacts/create/` + sitetoken+"/"+uuid, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  update(data: any, contacttoken: string, uuid: string) {
    return this.http.put<any>(`${this.serverUrl}contacts/update/` + contacttoken + "/" + uuid, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  delete(contacttoken: string, uuid: string) {
    return this.http.delete<any>(`${this.serverUrl}contacts/delete/` + contacttoken + "/" + uuid);
  }

  view(contacttoken: string, uuid: string) {
    return this.http.get<any>(`${this.serverUrl}contacts/view/` + contacttoken + "/" + uuid);
  }

}
