import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BomService {
  private API_URL = environment.apiBaseURL;
constructor(private http: HttpClient, private cookieService: CookieService) { }
   
public bmrInput(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `bmr/bmr/input?unitcode=${unitCode}`);
  }
  public productList(uc0001: string): Observable<any> {
    return this.http.get(this.API_URL + `dms/product-list?uc0001=${uc0001}`);
  }
   getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
   getDropDownList(unitcode:any) {
    let queryParams = `?unitCode=${unitcode}`;
    const ALLSALEPRODUCTURL = this.API_URL + 'pmm/input' + queryParams;
    return this.http.get(ALLSALEPRODUCTURL);
  }
   getResquestNoIDForBOM(lc0002: any, lc0001:any) {
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL = this.API_URL + 'pp/bom-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
  getBOMItemMasterList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'pp/BomItem-master-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getBOMIndexMasterList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'pp/BomIndex-master-list' + queryParams;
    return this.http.get(reviewURL);
  }
  getBOMAttachments(lc0003:string, moduleCode:string){
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
  onBOMSaveUpdate(
    bomAttachmentList: any[],
    body: any
  ) {
    console.log(bomAttachmentList);
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();
    
     for (let file of bomAttachmentList) {
      formData.append('bomAttachmentList', file);
    }
    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body)], {
      type: 'application/json',
    });
    formData.append('bomDTO', jsonBlob, 'data.json');

    console.log(formData); // Check the FormData structure in the browser's console

    let createUserURL = this.API_URL + 'pp/bom-request';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }
}
