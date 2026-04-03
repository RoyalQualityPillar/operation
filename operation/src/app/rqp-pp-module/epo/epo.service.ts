import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpoService {

 private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

onSaveUpdate(requestBody: any) {
    const saveUpdateURL = this.API_URL + 'pp/epo-items/save-update';
    return this.http.post(saveUpdateURL, requestBody);
  }
  getResquestNoID(lc0002: any, lcnum: any) {
    ///1st
    const queryParams = `?lc0002=${lc0002}&lc0001=${lcnum}`;
    const reviewURL = this.API_URL + 'sddo/module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }

  onQTList(ff0001: any) {
    //1st response data
    const queryParams = `?ff0001=${ff0001}`;
    const reviewURL = this.API_URL + 'sddo/get-sdo-item-list' + queryParams;
    return this.http.get(reviewURL);
  }

  getQTIndexList(uc0001: any) {
    const queryParams = `?uc0001=${uc0001}`;
    const reviewURL = this.API_URL + 'sddo/get-sdo-index-list' + queryParams;
    return this.http.get(reviewURL);
  }

  onLcApproval(body: any) {
    const lcApprovalURL = this.API_URL + 'gm/lc-approval/save-update';
    return this.http.post(lcApprovalURL, body);
  }
  onLcReject(body: any) {
    const lcRejectURL = this.API_URL + 'gm/lc-reject/save-update';
    return this.http.post(lcRejectURL, body);
  }
  getCompleteRecords(moduleCode: string, untiCode: string): Observable<any> {
    return this.http.get(
      this.API_URL +
        `gmapr/completed-records?ff0005=${moduleCode}&ff0003=${untiCode}`
    );
  }
  downloaddos(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    moduleCode: string
  ) {
    return this.http.post(
      this.API_URL +
        `sddor/sdos-report/get-all?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&moduleCode=${moduleCode}`,
      ''
    );
  }
  downloaddoa(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    stage: number,
    userid: string,
    moduleCode: string
  ) {
    return this.http.post(
      this.API_URL +
        `sddor/sdoa-report/get-all?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&stage=${stage}&userid=${userid}&moduleCode=${moduleCode}`,
      ''
    );
  }

  downloaddo(
    lcRequestNumber: string,
    lcNumber: string,
    templateName: string,
    qtNo: string,
    moduleCode: string
  ) {
    return this.http.post(
      this.API_URL +
        `sddor/sdo-report/get-all?lcRequestnumber=${lcRequestNumber}&lcnum=${lcNumber}&templateName=${templateName}&qtno=${qtNo}&moduleCode=${moduleCode}`,
      ''
    );
  }
  
   getBuInfo(requestBody: any) {
    const queryParams = `?auc0001=${requestBody.auc0001}&buc0001=${requestBody.buc0001}`;
    const buInfoURL = this.API_URL + 'gm/bu-master/get-bu-info' + queryParams;
    return this.http.post(buInfoURL, '');
  }
}
