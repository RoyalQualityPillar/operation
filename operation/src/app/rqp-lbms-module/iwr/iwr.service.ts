import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IwrService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  

  getEquipmentScheduleList(fromDate: any, toDate:any) {
    const queryParams = `?fromDate=${fromDate}&toDate=${toDate}`;
    const reviewURL = this.API_URL + 'limsm-im/equipment-schedule-list' + queryParams;
    return this.http.get(reviewURL);
  }

  getCalculationAssignamentList(unitcode:any){
    const queryParams = `?unitcode=${unitcode}`;
    const reviewURL = this.API_URL + 'limsm-im/calculation-assignament-list' + queryParams;
    return this.http.get(reviewURL);
  }
}
