import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitesService {


  serverUrl = environment.apiUrl;
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private router: Router) {
  }


  list(uuid: string) {
    return this.http.get<any>(`${this.serverUrl}sites/list/` + uuid);
  }


  create(data: any, uuid: string) {
    return this.http.post<any>(`${this.serverUrl}sites/create/` + uuid, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  upfate(data: any, sitetoken: string, uuid: string) {
    return this.http.put<any>(`${this.serverUrl}sites/update/` + sitetoken + "/" + uuid, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  delete(sitetoken: string, uuid: string) {
    return this.http.delete<any>(`${this.serverUrl}sites/delete/` + sitetoken + "/" + uuid);
  }

  view(sitetoken: string) {
    return this.http.get<any>(`${this.serverUrl}sites/view/` + sitetoken);
  }

}
