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
  public sfgUnderApproverList(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/sfg-under-approver-list?Unitcode=${unitCode} `);
  }
  public fgUnderApproverList(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/fg-under-approver-list?Unitcode=${unitCode} `);
  }
   public fgRejectList(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/fg-reject-list?Unitcode=${unitCode} `);
  }
   public sfgRejectList(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/sfg-reject-list?Unitcode=${unitCode} `);
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
  public saveUnderApproverList(uc0001:string,ff0008:any){
   const queryParams = `?uc0001=${uc0001}&ff0008=${ff0008}`;
   const qualityStatusURL = this.API_URL + 'pp/under-approver-save' +queryParams;
   return this.http.post(qualityStatusURL, '');
  }
 public sfglocatioupdate(uc0001:string){
   const queryParams = `?uc0001=${uc0001}`;
   const qualityStatusURL = this.API_URL + 'pp/sfg-location-update' +queryParams;
   return this.http.post(qualityStatusURL, '');
  }
  
  
  
  public quarantineList(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `wh/quarantine-list?Unitcode=${Unitcode} `);
  }
  public quarantineDisplayList(lc0003: string): Observable<any> {
    return this.http.get(this.API_URL + `wh/quarantine-display-list?lc0003=${lc0003} `);
  }
   public saveQuarantineList(uc0001:string, status:any){
   const queryParams = `?uc0001=${uc0001}&status=${status}`;
   const samplingURL = this.API_URL + 'wh/quarantine-save-update' +queryParams;
   return this.http.post(samplingURL, '');
  }
   public saveQuarantine(uc0001:string){
   const queryParams = `?uc0001=${uc0001}`;
   const qualityStatusURL = this.API_URL + 'wh/quarantine-save' +queryParams;
   return this.http.post(qualityStatusURL, '');
  }
   public approverList(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `wh/Approver-list?Unitcode=${Unitcode}`);
  }
  public sfgapproverlist(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/sfg-approver-list?Unitcode=${Unitcode}`);
  }
   public saveLocationUpdate(uc0001:string, ff0011:string){
   const queryParams = `?uc0001=${uc0001}&ff0011=${ff0011}`;
   const samplingURL = this.API_URL + 'wh/location-update-save' +queryParams;
   return this.http.post(samplingURL, '');
  }
  public sfglocationupdatesave(uc0001:string, ff0011:string){
   const queryParams = `?uc0001=${uc0001}&location=${ff0011}`;
   const samplingURL = this.API_URL + 'wh/sfg-location-update-save' +queryParams;
   return this.http.post(samplingURL, '');
  }
  


   public getFgSamplingList(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/fg-sampling-list?Unitcode=${Unitcode} `);
  }
  
  public getSFGSamplingList(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/sfg-sampling-list?Unitcode=${Unitcode} `);
  }
 
   public saveFgSamplingList(uc0001: string) {
    const queryParams = `?uc0001=${uc0001}`;
    const samplingURL = this.API_URL + 'pp/fg-sampling-save' + queryParams;
    return this.http.post(samplingURL, '');
  }

   public getFgUnderTestList(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/fg-under-taste-list?Unitcode=${Unitcode} `);
  }
   public getSFGUnderTestList(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/sfg-under-taste-list?Unitcode=${Unitcode} `);
  }
   public getSFGUnderSamplingList(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/sfg-under-sampling-list?Unitcode=${Unitcode} `);
  }
   public saveFgUnderTestLList(uc0001: string, Status:any) {
    const queryParams = `?uc0001=${uc0001}&Status=${Status}`;
    const samplingURL = this.API_URL + 'pp/fg-under-taste-save' + queryParams;
    return this.http.post(samplingURL, '');
  }

  
     
 }
