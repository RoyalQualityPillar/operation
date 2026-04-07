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

  public questionBankTable(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pmmppo/get-ppo-item-list?unitcode=${unitCode} `);
  }
  onLoadInputNewAPI(unitCode, module, mainModule) {
    const queryParams = `?unitCode=${unitCode}&module=${module}&mainModule=${mainModule}`;
    let URL = this.API_URL + 'qms/input' + queryParams;
    return this.http.get(URL);
  }
  getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
   public grnVerificationList(UnitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `wh/grn-verification-list?UnitCode=${UnitCode} `);
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
}
