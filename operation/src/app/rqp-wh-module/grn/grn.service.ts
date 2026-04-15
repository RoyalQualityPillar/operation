import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrnService {

  private API_URL = environment.apiBaseURL;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // public questionBankTable(unitCode:string,templateName: string) {
  //     let apiURL = this.API_URL + `pmmppo/get-ppo-item-list?unitCode=${unitCode}&templateName=${templateName}`;
  //     return this.http.post(apiURL, '');
  //   }

  // public questionBankTable(unitCode: string): Observable<any> {
  //   return this.http.get(this.API_URL + `pmmppo/get-ppo-item-list?unitcode=${unitCode} `);
  // }
  onLoadInputNewAPI(unitCode, module, mainModule) {
    const queryParams = `?unitCode=${unitCode}&module=${module}&mainModule=${mainModule}`;
    let URL = this.API_URL + 'qms/input' + queryParams;
    return this.http.get(URL);
  }
  getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
   getResquestNoIDForGRN(lc0002: any, lc0001:any) {
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL = this.API_URL + 'wh/grn-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
   public grnVerificationList(UnitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `wh/grn-verification-list?UnitCode=${UnitCode} `);
  }
   getGoodsReceiptList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'wh/GoodReceipt-master-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getGoodsReceiptPackList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'wh/GoodReceiptPacks-master-list' + queryParams;
    return this.http.get(reviewURL);
  }
  getGRNAttachments(lc0003:string, moduleCode:string){
 const queryParams = `?lc0003=${lc0003}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gm/attachment-list' + queryParams;
    return this.http.get(reviewURL);
  }
    onDownloadDocumet( uc0001: any) {
    const queryParams = `?uc0001=${uc0001}`;
    const reviewURL = this.API_URL + 'file/att-download' + queryParams;
    return this.http.post(reviewURL, '');
  }
  onCommentsData(ff0001: any, lcnum: any, ff0005: number) {
    const queryParams = `?FF0001=${ff0001}&FF0002=${lcnum}&FF0005=${ff0005}`;
    const reviewURL =
      this.API_URL + 'gm/gmap-record/review-comments' + queryParams;
    return this.http.get(reviewURL);
  }
  onGRNSaveUpdate(
    grnAttachments: any[],
    body: any
  ) {
    console.log(grnAttachments);
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    // Append files in attachments

    // for (let files of grnAttachments) {
    //   for (let file of files) {
    //     formData.append('grnAttachments', file); // Adjust 'docFiles' as per your API's expected key
    //   }
    // }
     for (let file of grnAttachments) {
      formData.append('grnAttachments', file);
    }
    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body)], {
      type: 'application/json',
    });
    formData.append('grnDTO', jsonBlob, 'data.json');

    console.log(formData); // Check the FormData structure in the browser's console

    let createUserURL = this.API_URL + 'wh/grn-save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
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
