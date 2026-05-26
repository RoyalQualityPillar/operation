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
  public geInusMasterList(Unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `lbms/equipment_Inus_master-list?Unitcode=${Unitcode} `);
  }

   getResquestNoIDForCalibration(lc0002: any, lc0001:any) {
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL = this.API_URL + 'limsm-im/calibration-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
   getQlpRecordList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'limsm-im/qlpRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getCdIndexList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'limsm-im/cdIndex-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getQpsrRecordList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'limsm-im/QpsrRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getQtmpRecordList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'limsm-im/QtmpRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getQpmrRecordList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'limsm-im/QpmrRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }
   
}
