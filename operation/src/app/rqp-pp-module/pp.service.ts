import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PpService {

 public commentsCurrentValue: any;
  private API_URL = environment.apiBaseURL;
  // private API_URL='http://103.10.234.106:8081/';
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getStockList(orgUnitCode: any, pageIndex: any, size: any) {
    let body = {
      buCode: orgUnitCode,
    };
    const queryParams = `?buCode=${body.buCode}`;
    let stockListURL = this.API_URL + 'sd/get-stock-price-master' + queryParams;
    return this.http.get(stockListURL);
  }
  getInputValue(unitCode: any) {
     let queryParams = `?unitCode=${unitCode}`;
    let inputFieldValueURL = this.API_URL + 'sd/input' + queryParams;
    return this.http.get(inputFieldValueURL);
  }

  getUnitCodeDetail(auc0001: any, buc0001: any) {
    let pageIndex = 0;
    let size = 5;
    let orgCode = 'PU'
    const queryParams = `?auc0001=${auc0001}&buc0001=${buc0001}&pageIndex=${pageIndex}&size=${size}&orgCode=${orgCode}`;
    let stockListURL = this.API_URL + 'gm/bu-master/get-bu-info' + queryParams;
    return this.http.post(stockListURL, '');
  }

  getHeaderData(body: any) {
    let getHederURL = this.API_URL + 'admin/input/lcinfo';
    return this.http.post(getHederURL, body);
  }
  onSaveUpdate(requestBody: any) {
    const saveUpdateURL = this.API_URL + 'sdqt/qt-item/save-update';
    return this.http.post(saveUpdateURL, requestBody);
  }
  public qualityStatusList(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/slt-list?unitCode=${unitCode} `);
  }
  public planningOrderList(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/planning-order-list?unitCode=${unitCode} `);
  }
  public planningOrderLists(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/Process-order-item-list?unitCode=${unitCode} `);
  }
  public MaterialReqPlanning(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pp/plan-order-mrp-list?unitCode=${unitCode} `);
  }
   public saveExecutionProductOrderList(uc0001:string){
   const queryParams = `?uc0001=${uc0001}`;
   const samplingURL = this.API_URL + 'pp/relase-order-save' +queryParams;
   return this.http.post(samplingURL, '');
  }
  public saveExecutionPlaningOrderList(uc0001:string){
   const queryParams = `?uc0001=${uc0001}`;
   const samplingURL = this.API_URL + 'pp/planning-order-save' +queryParams;
   return this.http.post(samplingURL, '');
  }
  public saveExecutionPlaningOrderLists(uc0001:string){
   const queryParams = `?uc0001=${uc0001}`;
   const samplingURL = this.API_URL + 'pp/Process-order-save' +queryParams;
   return this.http.post(samplingURL, '');
  }
  public saveMaterialReqPlanningOrderList(ff0012:string){
   const queryParams = `?ff0012=${ff0012}`;
   const samplingURL = this.API_URL + 'pp/plan-order-mrp-save' +queryParams;
   return this.http.post(samplingURL, '');
  }
  getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }

  getBuInfo(requestBody: any) {
    const queryParams = `?auc0001=${requestBody.auc0001}&buc0001=${requestBody.buc0001}`;
    const buInfoURL = this.API_URL + 'gm/bu-master/get-bu-info' + queryParams;
    return this.http.post(buInfoURL, '');
  }
  getReviewerData(
    f0001: any,
    f0009: any,
    pageIndex: any,
    size: any,
    requestType: string
  ) {
    const queryParams = `?FF0001=${f0001}&FF0009=${f0009}&pageIndex=${pageIndex}&size=${size}&requestType=${requestType}`;
    const reviwerURL = this.API_URL + 'gm/gmur-record/todo-all' + queryParams;
    return this.http.get(reviwerURL);
  }
  getReviewerCompletedData(f0003: any, ff0005: any, pageIndex: any, size: any) {
    const queryParams = `?ff0003=${f0003}&ff0005=${ff0005}`;
    const reviwerURL = this.API_URL + 'gmapr/completed-records' + queryParams;
    return this.http.get(reviwerURL);
  }
  getReviewerTerminatedData(
    f0003: any,
    ff0005: any,
    pageIndex: any,
    size: any
  ) {
    const queryParams = `?ff0003=${f0003}&ff0005=${ff0005}`;
    const reviwerURL = this.API_URL + 'gmapr/Terminated-records' + queryParams;
    return this.http.get(reviwerURL);
  }
  getReviewerObsoletedData(f0003: any, ff0005: any, pageIndex: any, size: any) {
    const queryParams = `?ff0003=${f0003}&ff0005=${ff0005}`;
    const reviwerURL = this.API_URL + 'gmapr/obsoleted-records' + queryParams;
    return this.http.get(reviwerURL);
  }
  getInProcessCompletedData(
    f0003: any,
    ff0005: any,
    pageIndex: any,
    size: any
  ) {
    const queryParams = `?ff0003=${f0003}&ff0005=${ff0005}`;
    const reviwerURL = this.API_URL + 'gmapr/in-process-records' + queryParams;
    return this.http.get(reviwerURL);
  }
  onReviewData(ff0001: any, lcnum: any, ff0005: any) {
    const queryParams = `?FF0001=${ff0001}&FF0002=${lcnum}&FF0005=${ff0005}`;
    const reviewURL =
      this.API_URL + 'gm/gmap-record/review-comments' + queryParams;
    return this.http.get(reviewURL);
  }
  onQTList(ff0001: any) {
    //1st response data
    const queryParams = `?ff0001=${ff0001}`;
    const reviewURL = this.API_URL + 'sdqt/get-qt-item-list' + queryParams;
    return this.http.get(reviewURL);
  }
  getResquestNoID(lc0002: any) {
    ///1st
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'sdqt/module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }

  geyPaymentTermsList(ff0001: string) {
    const url = this.API_URL + `gm/payment-terms-list?ff0001=${ff0001}`;
    return this.http.get(url);
  }
  getQTIndexList(uc0001: any) {
    const queryParams = `?uc0001=${uc0001}`;
    const reviewURL = this.API_URL + 'sdqt/get-qt-index-list' + queryParams;
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

  /**************************************ALL ASSIGNMENT **************************************/
  getAllAssignmentData(f0001: any, pageIndex: any, size: any) {
    const queryParams = `?FF0001=${f0001}&pageIndex=${pageIndex}&size=${size}`;
    const reviwerURL =
      this.API_URL + 'gm/gmur-record/complete-all' + queryParams;
    return this.http.get(reviwerURL);
  }

  getSdqList(ff0014: string) {
    return this.http.get(this.API_URL + `sd/sdq-list?ff0014=${ff0014}`);
  }

  getsfqList(
    pageIndex: string,
    size: string,
    ff0003: string,
    ff0002: string,
    salesUnitCode: string
  ) {
    return this.http.post(
      this.API_URL +
        `sd/sdq-list-for-sfq/get-max-all?pageIndex=${pageIndex}&size=${size}&ff0003=${this.cookieService.get(
          'buCode'
        )}&ff0002=${salesUnitCode}`,
      ''
    );
  }

  getSsiList(pageIndex: string, size: string, ff0003: string) {
    return this.http.post(
      this.API_URL +
        `sd/sdo-list-for-si/get-max-all?pageIndex=${pageIndex}&size=${size}&ff0003=${this.cookieService.get(
          'buCode'
        )}`,
      ''
    );
  }

  getSsoList(
    pageIndex: string,
    size: string,
    ff0003: string,
    ff0022: string,
    salesUnitCode: string
  ) {
    return this.http.post(
      this.API_URL +
        `sd/sqt-list-for-so/get-max-all?pageIndex=${pageIndex}&size=${size}&ff0003=${this.cookieService.get(
          'buCode'
        )}&ff0022=${salesUnitCode}`,
      ''
    );
  }

  getSdoList(pageIndex: string, size: string, salesUnitCode: string) {
    return this.http.post(
      this.API_URL +
        `sd/sso-list-for-sdo/get-max-all?pageIndex=${pageIndex}&size=${size}&ff0003=${salesUnitCode}`,
      ''
    );
  }

  getSpoList(
    pageIndex: number,
    size: number,
    ff0003: String,
    ff0022: string,
    salesUnitCode: string
  ) {
    return this.http.post(
      this.API_URL +
        `sd/sfqt-list-for-spo/get-max-all?pageIndex=${pageIndex}&size=${size}&ff0003=${this.cookieService.get(
          'buCode'
        )}&ff0022=${salesUnitCode}`,
      ''
    );
  }
  public questionBankTable(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `pmmppo/get-ppo-item-list?unitcode=${unitCode} `);
  }
  
}

