import { Injectable } from '@angular/core';
//import { tableData } from '../../assets/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  data: any;
  tableData: any;
  currentStage: any;
  selectedStage: any;
  lifeCycleCode: any;
  nextStageListData: any;
  previousStageListData: any;
  currentSelectedMenu: any;

  public isLogin = 'loginFaild';
  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient) {
    this.data = [];
  }

  getData() {
    return this.tableData;
  }
  setTableData(data: any) {
    this.tableData = data;
  }
  logout(userId: any) {
    const queryParams = `?userId=${userId}`;
    let lifeCycleURL = this.API_URL + 'signout' + queryParams;
    return this.http.get(lifeCycleURL);
  }
  getSessionExtended(toekn: any) {
    let body: any = {
      refreshToken: toekn,
    };
    let lifeCycleURL = this.API_URL + 'refreshToken';
    return this.http.post(lifeCycleURL, body);
  }
  getHeaderData(body: any, isAdmin?: any) {
    console.log(body);
    let getHederURL: any;
    if (isAdmin) {
      const queryParams = `?uc0001=${body.lcNumber}`;
      getHederURL = this.API_URL + 'gm/lc-module-adminInfo' + queryParams;
      return this.http.get(getHederURL);
    } else {
      getHederURL = this.API_URL + 'admin/input/lcinfo';
      return this.http.post(getHederURL, body);
    }
  }
  getHeaderCommonData(body: any, isAdmin?: any) {
    console.log(body);
    let getHederURL: any;
    if (isAdmin) {
      const queryParams = `?uc0001=${body.uc0001}&ff0001=${body.lcNumber}`;
      getHederURL =
        this.API_URL + 'gm/lc-info-withlcrequest-number' + queryParams;
      return this.http.get(getHederURL);
    } else {
      getHederURL = this.API_URL + 'admin/input/lcinfo';
      return this.http.post(getHederURL, body);
    }
  }
  setSelectedLifeCycleCode(lifeCycleCode: any) {
    this.lifeCycleCode = lifeCycleCode;
  }
  getSelectedLifeCycleCode() {
    return this.lifeCycleCode;
  }
}
