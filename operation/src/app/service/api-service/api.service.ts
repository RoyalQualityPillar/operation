import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = environment.apiBaseURL;
  public email = new BehaviorSubject('');
  public validEmail = new BehaviorSubject('');

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public setEmail(email: string) {
    return this.email.next(email);
  }

  public getEmail() {
    return this.email.asObservable();
  }

  public packMasterSaveUpdate(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}imp/packenq-master/save-update`,
      data
    );
  }

  public sendRequest(
    endpoint: string,
    method: any,
    params: any = {},
    body: any = null
  ): Observable<any> {
    let options: any = { params: new HttpParams({ fromObject: params }) };
    if (body) {
      options.body = body;
    }
    const data = {
      POST: this.http.post(this.API_URL + endpoint, body, options),
      PUT: this.http.put(this.API_URL + endpoint, body, options),
      DELETE: this.http.delete(this.API_URL + endpoint, options),
      GET: this.http.get(this.API_URL + endpoint, options),
    };
    return data[method];
  }

  public getQbMasterList(lc0003: string): Observable<any> {
    return this.http.get(`${this.API_URL}lmsm/qb-master-list?lc0003=${lc0003}`);
  }

  public getQBMasterModuleRequestNo(
    lc0001: string,
    lc0002: string
  ): Observable<any> {
    return this.http.get(
      `${this.API_URL}lmsm/qb-master-module-request-no?lc0002=${lc0002}&lc0001=${lc0001}`
    );
  }

  public getQBMCMasterList(lc0003: any): Observable<any> {
    return this.http.get(
      `${this.API_URL}lmsm/qbmc-master-list?lc0003=${lc0003}`
    );
  }

  public getQBFbMasterList(lc0003: any): Observable<any> {
    return this.http.get(
      `${this.API_URL}lmsm/qbfb-master-list?lc0003=${lc0003}`
    );
  }

  public getQBTFMasterList(lc0003: any): Observable<any> {
    return this.http.get(
      `${this.API_URL}lmsm/qbtf-master-list?lc0003=${lc0003}`
    );
  }

  public getQBEMasterList(lc0003: any): Observable<any> {
    return this.http.get(
      `${this.API_URL}lmsm/qbe-master-list?lc0003=${lc0003}`
    );
  }

  public questionBankNo(ff0001: string): Observable<any> {
    return this.http.get(
      `${this.API_URL}lmsm/questionbank-no?ff0001=${ff0001}`
    );
  }

  public packList(uc0001: string): Observable<any> {
    return this.http.get(`${this.API_URL}imp/pack-list?ff0010=${uc0001}`);
  }

  public materialInfo(uc0001: string): Observable<any> {
    return this.http.get(`${this.API_URL}imp/imp-masterinfo?uc0001=${uc0001}`);
  }

  public cartApi(data): Observable<any> {
    return this.http.post(`${this.API_URL}imp/cart/save-update`, data);
  }

  public verification(unitCode: string): Observable<any> {
    return this.http.post(
      `${this.API_URL}imp/curt/Verification?unitCode=${unitCode}`,
      ''
    );
  }

  public curtList(lc0004: string): Observable<any> {
    return this.http.get(`${this.API_URL}imp/curt-list?lc0004=${lc0004}`);
  }

  public getVenInfo(
    uniCode: string,
    pageIndex: number,
    size: number
  ): Observable<any> {
    return this.http.post(
      `${this.API_URL}imp/impVen-master/get-ven-info?unitCode=${uniCode}&pageIndex=${pageIndex}&size=${size}`,
      ''
    );
  }

  public cartSubmission(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}imp/cart-submission/save-update`,
      data
    );
  }

  public bgImgMaster(data: any): Observable<any> {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(`${this.API_URL}imp/bgimp-master/save-update`, data);
  }
}
