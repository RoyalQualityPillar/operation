import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DmsService {

 private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  getHeaderData(body: any) {
    let getHederURL = this.API_URL + 'admin/input/lcinfo';
    return this.http.post(getHederURL, body);
  }
  getDMSDropDownList() {
    let token = this.cookieService.get('token');
    let listURL =
      this.API_URL + `dms/input?unitCode=${this.cookieService.get('buCode')}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.get(listURL, httpOptions);
  }
  getPrintList( lc0002: string, lc0001:string) {
    //1st response data
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL = this.API_URL + 'dms/PrintRequest-list' + queryParams;
    return this.http.get(reviewURL);
  }
  stpOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('stpDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/stp/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  onCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('ursDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/urs/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }
  onSOPCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('sopDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/sop/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  spcOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('spcDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/spc/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  sopOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('sopDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));
    console.log(formData);

    let createUserURL = this.API_URL + 'dms/sop/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  pvrOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('pvrDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/pvr/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  pvpOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('pvpDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/pvp/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  awsOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('awsDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/aws/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  bmrOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('bmrDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/bmr/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  bprOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('bprDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/bpr/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  coaOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('coaDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/coa/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  cvpOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('cvpDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/cvp/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  cvrOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }

    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('cvrDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));

    let createUserURL = this.API_URL + 'dms/cvr/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

  getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
  getObsolated(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/lc-obsoleted';
    return this.http.post(nextStageURL, requestBody);
  }
  getResquestNoID(lc0002: any) {
    ///1st
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'pmmpqt/module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }

  getResquestNoIDForURS(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'dms/module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
  getPrintResquestNoID(lc0002: any, lc0001: any) {
    ///1st
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL =
      this.API_URL + 'dms/print-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
  documentList(lc0003: any, lc0002:string) {
    const queryParams = `?lc0003=${lc0003}&lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'dms/document-list' + queryParams;
    return this.http.get(reviewURL);
  }
  terminatedList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'dms/terminated-list' + queryParams;
    return this.http.get(reviewURL);
  }
  obsoletedList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'dms/obsoleted-list' + queryParams;
    return this.http.get(reviewURL);
  }
  attachmentList(lc0003: any, moduleCode: any) {
    const queryParams = `?lc0003=${lc0003}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gm/attachment-list' + queryParams;
    return this.http.get(reviewURL);
  }
  getDocumet(PdfType: string, uc0001: any, lcrqNumber: any, lcnum: any) {
    const queryParams = `?PdfType=${PdfType}&uc0001=${uc0001}&ff0001=${lcrqNumber}&ff0002=${lcnum}`;
    const reviewURL = this.API_URL + 'file/pdf-download' + queryParams;
    return this.http.post(reviewURL, '');
  }
  getWordDocumet(uc0001: any) {
    const queryParams = `?uc0001=${uc0001}`;
    const reviewURL = this.API_URL + 'file/word-download' + queryParams;
    return this.http.post(reviewURL, '');
  }
  getDocumetPreview(PdfType: string, uc0001: any, ff0001: any, ff0002: any) {
    const queryParams = `?PdfType=${PdfType}&uc0001=${uc0001}&ff0001=${ff0001}&ff0002=${ff0002}`;
    const reviewURL = this.API_URL + 'file/pdf-download' + queryParams;
    return this.http.post(reviewURL, '');
  }

   onDownloadDocumet( uc0001: any) {
    const queryParams = `?uc0001=${uc0001}`;
    const reviewURL = this.API_URL + 'file/att-download' + queryParams;
    return this.http.post(reviewURL, '');
  }

  onApproval(body: any) {
    const lcApprovalURL = this.API_URL + 'gm/lc-approval/save-update';
    return this.http.post(lcApprovalURL, body);
  }
  onReject(body: any) {
    const lcRejectURL = this.API_URL + 'gm/lc-reject/save-update';
    return this.http.post(lcRejectURL, body);
  }
  onCommentsData(ff0001: any, lcnum: any, ff0005: number) {
    const queryParams = `?FF0001=${ff0001}&FF0002=${lcnum}&FF0005=${ff0005}`;
    const reviewURL =
      this.API_URL + 'gm/gmap-record/review-comments' + queryParams;
    return this.http.get(reviewURL);
  }
  onCompletedCommentsData(ff0001: any, lcnum: any) {
    const queryParams = `?FF0001=${ff0001}&FF0002=${lcnum}`;
    const reviewURL =
      this.API_URL + 'gm/gmap-record/common-comments' + queryParams;
    return this.http.get(reviewURL);
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
  onGetAuditTrailData(
    lcRequestnumber: string,
    lcnum: string,
    templateName: string,
    stage: any,
    userid: string,
    moduleCode: string
  ) {
    const queryParams = `?lcRequestnumber=${lcRequestnumber}&lcnum=${lcnum}&templateName=${templateName}&stage=${stage}&userid=${userid}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'dms/audit-trail/get-all' + queryParams;
    return this.http.post(reviewURL, '');
  }

  public masterDocuments() {
    ///dms/Documents-for-print
    return this.http.get(
      `${this.API_URL}dms/Documents-for-print?ff0002=SP1&ff0004=URS`
    );
  }
  onGetMasterIndex(
    unitCode: string,
    catagory: string,
    moduleCode: string,
    departmentCode: string,
    templateName: string
  ) {
    const queryParams = `?unitCode=${unitCode}&catagory=${catagory}&moduleCode=${moduleCode}&departmentCode=${departmentCode}&templateName=${templateName}`;
    const reviewURL = this.API_URL + 'dms/Master-Index-PDF' + queryParams;
    return this.http.post(reviewURL, '');
  }
    onGetObsoletedIndex(
    unitCode: string,
    catagory: string,
    moduleCode: string,
    departmentCode: string,
    templateName: string
  ) {
    const queryParams = `?unitCode=${unitCode}&catagory=${catagory}&moduleCode=${moduleCode}&departmentCode=${departmentCode}&templateName=${templateName}`;
    const reviewURL = this.API_URL + 'dms/OBSOLETED-Index-PDF' + queryParams;
    return this.http.post(reviewURL, '');
  }
    onGetsupersededIndex(
    unitCode: string,
    catagory: string,
    moduleCode: string,
    departmentCode: string,
    templateName: string
  ) {
    const queryParams = `?unitCode=${unitCode}&catagory=${catagory}&moduleCode=${moduleCode}&departmentCode=${departmentCode}&templateName=${templateName}`;
    const reviewURL = this.API_URL + 'dms/superseded-Index-PDF' + queryParams;
    return this.http.post(reviewURL, '');
  }
  // public masterDocuments(unitCode:any,moduleCode:any) {
  //   ///dms/Documents-for-print
  //   const queryParams=`?ff0004=${unitCode}&ff0002=${moduleCode}`
  //   return this.http.get(
  //     `${this.API_URL}dms/Documents-for-print` +queryParams
  //   );
  // }
  public ursPrintSubmit(body: any) {
    return this.http.post(this.API_URL + `dms/document-ad-print`, body);
  }
  public documentPrint(body: any) {
    return this.http.post(this.API_URL + `dms/document-print`, body);
  }
  public subDocumentPrint(body: any) {
    return this.http.post(this.API_URL + `dms/document-sub-print`, body);
  }
  getSOPDocResquestNo(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'dms/doc-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
  getSOPObsoletedDocResquestNo(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'dms/obsoleted-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }

  getSOPAttachResquestNo(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'dms/att-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
  getBMRDocResquestNo(lc0002: any, lc0001: string) {
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL = this.API_URL + 'bmr/bmr-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
  // getCVPDocResquestNo(lc0002: any, lc0001: string) {
  //   const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
  //   const reviewURL = this.API_URL + 'cvp/cvp-module-request-no' + queryParams;
  //   return this.http.get(reviewURL);
  // }
  public getUcrPrData(unitCode: string) {
    const body = {
      unitCode: this.cookieService.get('buCode'),
      moduleCode: '',
      departmentCode: '',
      lcrqNumber: '',
      lcNumber: '',
      lcStage: 0,
      lcRole: '',
      stage2: 0,
      createdBy: '',
      comments: '',
      documentModule: '',
      documentStatus: '',
      draft: true,
    };
    return this.http.post(
      this.API_URL + `dms/document-print?uc0001=${unitCode}`,
      body
    );
  }

  documentRivision(data: any) {
    const reviewURL = this.API_URL + 'dms/document-revision';
    return this.http.post(reviewURL, data);
  }
  //dms/document-revision?uc0001=586uyu6t65t

  public absolute(docnum: string,lc0003 :String,docType:String, body?: any): Observable<any> {
    return this.http.post(
      this.API_URL + `dms/document-obsolete?docnum=${docnum}&lc0003=${lc0003}&docType=${docType}`,
      body
    );
  }

  public managerRights(lcnum: string): Observable<any> {
    return this.http.get(this.API_URL + `dms/qa-manager-rights?lcnum=${lcnum}`);
  }

  public drop(body: any): Observable<any> {
    return this.http.post(this.API_URL + `gm/lc-drop`, body);
  }

  public previousList(uc0001: string, stage: string): Observable<any> {
    return this.http.get(
      this.API_URL + `dms/previousdoc-list?uc0001=${uc0001}&stage=${stage}`
    );
  }

  public bmrInput(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `bmr/bmr/input?unitcode=${unitCode}`);
  }
  // public cvpInput(unitCode: string): Observable<any> {
  //   return this.http.get(this.API_URL + `cvp/cvp/input?unitcode=${unitCode}`);
  // }

  public productList(uc0001: string): Observable<any> {
    return this.http.get(this.API_URL + `dms/product-list?uc0001=${uc0001}`);
  }

  public pmBmrUpdate(body: any): Observable<any> {
    return this.http.post(this.API_URL + `dms/pm-bmrUpdate`, body);
  }
  public pmCvpUpdate(body: any): Observable<any> {
    return this.http.post(this.API_URL + `cvp/pm-cvpUpdate`, body);
  }

  public sopAgentAI(body): Observable<any> {
    return this.http.post('http://88.135.73.1:5000/get-multiple-pdfs', body);
  }

  public sopAgentOne(body): Observable<any> {
    return this.http.post('http://88.135.73.1:5000/getDocumentList', body)
  }

  public sopAgentTwo(body): Observable<any> {
    return this.http.post('http://88.135.73.1:5000/getPdfContent', body)
  }

}
