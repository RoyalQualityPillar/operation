import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LifeCycleDataService {
  public subMenuList: any;
  public selectedRow: any;
  public allQtHomePageStageValue: any;
  private API_URL = environment.apiBaseURL;
  public chartData = new BehaviorSubject('');
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  public getLifeCycleInfo(pageIndex: any, size: any) {
    const userId: string = this.cookieService.get('userId');
    const queryParams = `?userId=${userId}&pageIndex=${pageIndex}&size=${size}`;
    let lifeCycleURL = this.API_URL + 'login/lifecycleinfo' + queryParams;
    return this.http.get(lifeCycleURL);
  }
  public getModuleName(body: any) {
    const queryParams = `?userId=${body.userId}&lcnum=${body.lcnum}`;
    const lifeCycleURL = this.API_URL + 'login/get-modules' + queryParams;
    return this.http.post(lifeCycleURL, '');
  }
  public setSelectedRowData(selectedRow) {
    return (this.selectedRow = selectedRow);
  }
  public getSelectedRowData() {
    return this.selectedRow;
  }

  public storeData(data: any) {
    return this.chartData.next(data);
  }

  public getDashboardData(lcnum: any) {
    const queryParams = `?lcnum=${lcnum}`;
    const lifeCycleURL = this.API_URL + 'dash-board/lc-request' + queryParams;
    return this.http.post(lifeCycleURL, '');
  }

  public getLcmWeekData(
    stage: string,
    lcNum: string,
    fromDate: any,
    toDate: string
  ) {
    return this.http.get(
      this.API_URL +
        `dash-board/lcIp-Week-Day-Data?lcnum=${lcNum}&stage=${stage}&fromDate=${fromDate}&toDate=${toDate}`
    );
  }

  public getYearMonthData(
    stage: string,
    lcNum: string,
    fromDate: any,
    toDate: string
  ) {
    return this.http.get(
      this.API_URL +
        `dash-board/lcIp-Year-Month-Data?lcnum=${lcNum}&stage=${stage}&fromDate=${fromDate}&toDate=${toDate}'`
    );
  }

  public getDayData(lcNum: string, startDate: string) {
    return this.http.get(
      this.API_URL + `dash-board/lcCp-day?lcnum=${lcNum}&inputDate=${startDate}`
    );
  }

  public getMonthWeek(
    stage: string,
    lcNum: string,
    startDate: any,
    endDate: string
  ) {
    return this.http.get(
      this.API_URL +
        `dash-board/lcIp-Month-Week-Data?lcnum=${lcNum}&stage=${stage}&fromDate=${startDate}&toDate=${endDate}`
    );
  }

  public getMonthDay(
    stage: string,
    lcNum: string,
    startDate: any,
    endDate: string
  ) {
    return this.http.get(
      this.API_URL +
        `dash-board/lcIp-Week-Day-Data?lcnum=${lcNum}&stage=${stage}&fromDate=${startDate}&toDate=${endDate}'`
    );
  }

  public getFormToData(
    lcNum: string,
    stage: string,
    startDate: string,
    endDate: string
  ) {
    return this.http.get(
      this.API_URL +
        `dash-board/lcRequest-From-To?lcnum=${lcNum}&stage=${stage}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  public getYeartoYearData(
    lcNum: string,
    stage: string,
    fromDate: string,
    toDate: string
  ) {
    return this.http.get(
      this.API_URL +
        `dash-board/lcIp-YearToYear?lcnum=${lcNum}&stage=${stage}&fromDate=${fromDate}&toDate=${toDate}`
    );
  }

  public getnStage(lcNum: string) {
    return this.http.get(this.API_URL + `gm/nstage?lcnum=${lcNum}`);
  }

  public getList(
    lcnum: string,
    stage: number,
    pageIndex: number,
    size: number,
    formDate: string,
    toDate: string
  ) {
    return this.http.get(
      this.API_URL +
        `dash-board/lcip-list?lcnum=${lcnum}&stage=${stage}&pageIndex=${pageIndex}&size=${size}&fromDate=${formDate}&toDate=${toDate}`
    );
  }
}
