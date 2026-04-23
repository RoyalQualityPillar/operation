import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhService {

 private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

   public questionBankTable(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `wh/Under-sampling-list?Unitcode=${unitCode} `);
  }
   public underTestingList(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `wh/Under-testing-list?Unitcode=${unitCode} `);
  }
    public qualityStatusList(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `wh/Quality-status-list?Unitcode=${unitCode} `);
  }
  public saveSampling(uc0001:string){
   const queryParams = `?uc0001=${uc0001}`;
   const samplingURL = this.API_URL + 'wh/sampling-save' +queryParams;
   return this.http.post(samplingURL, '');
  }
   public saveTestList(uc0001:string){
   const queryParams = `?uc0001=${uc0001}`;
   const testingURL = this.API_URL + 'wh/tasting-save' +queryParams;
   return this.http.post(testingURL, '');
  }
   public saveQualityStatusList(uc0001:string,status:any){
   const queryParams = `?uc0001=${uc0001}&status=${status}`;
   const qualityStatusURL = this.API_URL + 'wh/Quality-save' +queryParams;
   return this.http.post(qualityStatusURL, '');
  }
  public quarantineList(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `wh/quarantine-list?Unitcode=${Unitcode} `);
  }
  public quarantineDisplayList(lc0003: string): Observable<any> {
    return this.http.get(this.API_URL + `wh/quarantine-display-list?lc0003=${lc0003} `);
  }
   public savequarantineList(uc0001:string){
   const queryParams = `?uc0001=${uc0001}`;
   const samplingURL = this.API_URL + 'wh/quarantine-save-update' +queryParams;
   return this.http.post(samplingURL, '');
  }
  
 }
