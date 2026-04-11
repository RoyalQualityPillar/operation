import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InspectionTypeService {
private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  onCreate(body: any) {
    console.log(body);
    let token = this.cookieService.get('token');
    let createUserURL = this.API_URL + 'wh/it-master/save-update';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(createUserURL, body, httpOptions);
  }
   getDropDownList() {
    let token = this.cookieService.get('token');
    let listURL =
      this.API_URL + `gm/input?unitCode=${this.cookieService.get('buCode')}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.get(listURL, httpOptions);
  }
  onAllRoleAuditTrail(uc0001: any) {
    let queryParams = `?UC0001=${uc0001}`;
    const ALLSALEPRODUCTURL =
      this.API_URL + 'wh/it-master/get-by-code-all' + queryParams;
    return this.http.get(ALLSALEPRODUCTURL);
  }
}
