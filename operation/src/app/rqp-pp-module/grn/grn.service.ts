import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrnService {

    private API_URL = environment.apiBaseURL;
  
   constructor(private http: HttpClient, private cookieService: CookieService) {}

// public questionBankTable(unitCode:string,templateName: string) {
//     let apiURL = this.API_URL + `pmmppo/get-ppo-item-list?unitCode=${unitCode}&templateName=${templateName}`;
//     return this.http.post(apiURL, '');
//   }

 public questionBankTable(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pmmppo/get-ppo-item-list?unitcode=${unitCode} `);
  }
  }
