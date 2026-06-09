import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IwsService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
   getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
  saveCalibrationWorksheetMaster(requestBody: any) {
    const nextStageURL = this.API_URL + 'limsm-im/calibration-worksheet-save';
    return this.http.post(nextStageURL, requestBody);
  }
  public getInusMasterList(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `lbms/equipment_Inus_master-list?Unitcode=${Unitcode} `);
  }
   public getAllInstrmentsList(unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `lbms/all-instrments-list?unitcode=${unitcode} `);
  }

   getResquestNoIDForCalibration(lc0002: any, lc0001:any) {
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL = this.API_URL + 'limsm-im/calibration-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
   getQlpRecordList(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'limsm-im/qlpRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getCdIndexList(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'limsm-im/cdIndex-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getQpsrRecordList(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'limsm-im/QpsrRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getQtmpRecordList(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'limsm-im/QtmpRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getQpmrRecordList(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'limsm-im/QpmrRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }

 savePMMCalibrationWorksheetMaster(requestBody: any) {
    const nextStageURL = this.API_URL + 'limsm-im/pmm-calibration-worksheet-save';
    return this.http.post(nextStageURL, requestBody);
  }
  public getPMMCheckList(lc0002: string): Observable<any> {
    return this.http.get(this.API_URL + `limsm-im/pmmCheckList-list?lc0002=${lc0002} `);
  }
   public getPMMCdIndexList(lc0002: string): Observable<any> {
    return this.http.get(this.API_URL + `limsm-im/pmmCdIndex-list?lc0002=${lc0002} `);
  }

   getResquestNoIDForPMMCalibration(lc0002: any, lc0001:any) {
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL = this.API_URL + 'limsm-im/Pmm-calibration-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }

   getCalculationAssignamentList(unitcode:any){
    const queryParams = `?unitcode=${unitcode}`;
    const reviewURL = this.API_URL + 'limsm-im/calculation-assignament-list' + queryParams;
    return this.http.get(reviewURL);
  }
  
getPMMCalculationAssignamentList(unitcode:any){
    const queryParams = `?unitcode=${unitcode}`;
    const reviewURL = this.API_URL + 'limsm-im/pmm-calculation-assignament-list' + queryParams;
    return this.http.get(reviewURL);
  }
   onGetCommentsData(
    lcRequestnumber: string,
    lcnum: string,
    templateName: string,
    stage: any,
    userid: string,
    moduleCode: string
  ) {
    const queryParams = `?lcRequestnumber=${lcRequestnumber}&lcnum=${lcnum}&templateName=${templateName}&stage=${stage}&userid=${userid}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gmapr/gmap-comment/get-all' + queryParams;
    return this.http.post(reviewURL, '');
  }
   
}
