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
  onBOMSaveUpdate(
    grnAttachments: any[],
    body: any
  ) {
    console.log(grnAttachments);
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();
    
     for (let file of grnAttachments) {
      formData.append('grnAttachments', file);
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
