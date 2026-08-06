import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import moment from 'moment';
import { environment } from 'src/environments/environment';

//import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusinessUnitService {
  // private API_URL='http://103.10.234.106:8081/';
  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}
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
  getFiDropDownList() {
    let token = this.cookieService.get('token');
    let listURL =
      this.API_URL +
      `fi/input?unitCode=${this.cookieService.get('buCode')}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.get(listURL, httpOptions);
  }

 
  onCreate(body: any) {
    console.log(body);
    let token = this.cookieService.get('token');
    let createUserURL = this.API_URL + 'gm/bu-master/save-update';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(createUserURL, body, httpOptions);
  }

}
