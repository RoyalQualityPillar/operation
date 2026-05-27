import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IwsService } from '../iws.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { CookieService } from 'ngx-cookie-service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iws-completed-save',
  standalone: false,
  templateUrl: './iws-completed-save.component.html',
  styleUrl: './iws-completed-save.component.scss'
})
export class IwsCompletedSaveComponent implements OnInit {
  public InstrumentForm: FormGroup;
  public pageData: any;
  public headerData: any;
  public isLoading: boolean;
  public disableButtons = false;
  public comments: string;
  public headerRequestBody: any;
  public nextStageListData: any;
  public instrumrntInfo:any;
   public ff0005: number;
  public ff0001: any;
  public lc0001: any;
  public lc0002: any;
   public ff0002: any;
   public userCurrentComments: any;
   commentType = 'completedRecord';
  public displayedColumns: any[] = [];
public selectedDialogData: any;
   destroy$ = new Subject<void>();
  parameterNo: number = 0;
  setPointNo: number = 0;
  parameterName: any;
  parameters: any[] = [];
  uomList = ['°C', 'RPM', 'Bar', 'Kg', 'Minutes', 'pH', 'mL', '%'];
  qualitativeParameterNo: number;
  qualitativeParameters: any[] = [];
  quantitativeParameterNo: number = 0;
  quantitativeSetPointNo: number = 0;
  quantitativeParameterName: any;
  quantitativeParameters: any[] = [];
  quantitativeUomList = ['°C', 'RPM', 'Bar', 'Kg', 'Minutes', 'pH', 'mL', '%'];
  constructor(
    public dialog: MatDialog,
    private iwsSwervice: IwsService,
    private toolbarService: ToolbarService,
    public cookieService: CookieService,
    public fb: FormBuilder,
    private lifeCycleDataService: LifeCycleDataService,
    private remoteLoader: RemoteComponentLoaderService,
      private notificationService: NotificationService,
    private route: Router,
  ) {
    this.InstrumentForm = this.fb.group({
      instrumentCode: [''],
      instrumentName: [''],
      instrumentNumber: [''],
    });
  }
  ngOnInit(): void {  
     const reviewData = sessionStorage.getItem('selectedRow');
    let params: any = null;
    if (reviewData) {
      params = JSON.parse(reviewData);
      this.pageData = {
        pageName: 'qtUpdateDetail',
        requestNo: params.uc0001,
        version:
          params.ff0007 +
          '.' +
          params.ff0008 +
          '.' +
          params.ff0009 +
          '.' +
          params.ff0010,
      };
      this.ff0001 = params.uc0001;
      this.ff0005 = params.ff0008;
        this.ff0002 = params.ff0005;
         this.lc0001 = params.ff0001;
    }    
    if (this.ff0001) {
      this.getCalibrationModuleRequestno();
    }
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();
  }
  getHeaderData(event: any) {
    this.headerData = event;
  }
     public getCommentsData(event: any): void {
    this.userCurrentComments = event;
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      lcStage: this.toolbarService.currentStage,
    };
    console.log(body);    
    this.iwsSwervice.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
  getCalibrationModuleRequestno(){
this.iwsSwervice.getResquestNoIDForCalibration(this.ff0001, this.lc0001).subscribe((data:any) => {
 console.log(data);
  this.lc0002 = data.data[0].lc0002;
      if (this.lc0002) {
        this.getQlpRecordList(this.lc0002);
        this.getCdIndexList(this.lc0002);
        this.getQpsrRecordList(this.lc0002);
        this.getQtmpRecordList(this.lc0002);
        this.getQpmrRecordList(this.lc0002);
      }
});
  }
  getQlpRecordList(lc0002: any){
this.iwsSwervice.getQlpRecordList(lc0002).subscribe((data:any) => {
  console.log(data);
});
  }
  getCdIndexList(lc0002: any){
this.iwsSwervice.getCdIndexList(lc0002).subscribe((data:any) => {
  console.log(data);
});
  }
  getQpsrRecordList(lc0002: any){
    this.iwsSwervice.getQpsrRecordList(lc0002).subscribe((data:any) => {
  console.log(data);
});
  }
  getQtmpRecordList(lc0002: any){
    this.iwsSwervice.getQtmpRecordList(lc0002).subscribe((data:any) => {
  console.log(data);
});
  }
  getQpmrRecordList(lc0002: any){
    this.iwsSwervice.getQpmrRecordList(lc0002).subscribe((data:any) => {
  console.log(data);
});
  }

     public downloadIWSReport() {
    // const lcNumber = this.headerData?.lcnum;
    // const templateName = 'cc.html';
    // const moduleCode = this.headerData?.modulecode;
    // const ccno = this.headerData.requestNo;
    // const lcrnumber = this.headerData.requestNo;
    // this.isLoading = true;
    // this.qmsService
    //   .downloadSPMReport(
    //     lcNumber,
    //     templateName,
    //     ccno,
    //     moduleCode,
    //     lcrnumber
    //   )
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     let fileExtension = 'pdf';
    //     const binaryData = atob(data.data);
    //     const arrayBuffer = new ArrayBuffer(binaryData.length);
    //     const uint8Array = new Uint8Array(arrayBuffer);
    //     for (let i = 0; i < binaryData.length; i++) {
    //       uint8Array[i] = binaryData.charCodeAt(i);
    //     }
    //     let blob: any;
    //     blob = new Blob([uint8Array], { type: 'application/pdf' });
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = ccno + '.' + fileExtension;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     window.URL.revokeObjectURL(url);
    //   });
    // this.isLoading = false;
  }
   public downloadIWSAttachedReport() {
    // const lcNumber = this.headerData?.lcnum;
    // const templateName = 'cc.html';
    // const moduleCode = this.headerData?.modulecode;
    // const lcrnumber = this.headerData.requestNo;
    // this.isLoading = true;
    // this.qmsService
    //   .downloadSPMAttachedReport(
    //     lcNumber,
    //     templateName,
    //     moduleCode,
    //     lcrnumber
    //   )
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     let fileExtension = 'pdf';
    //     const binaryData = atob(data.data);
    //     const arrayBuffer = new ArrayBuffer(binaryData.length);
    //     const uint8Array = new Uint8Array(arrayBuffer);
    //     for (let i = 0; i < binaryData.length; i++) {
    //       uint8Array[i] = binaryData.charCodeAt(i);
    //     }
    //     let blob: any;
    //     blob = new Blob([uint8Array], { type: 'application/pdf' });
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = lcrnumber + '.' + fileExtension;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     window.URL.revokeObjectURL(url);
    //   });
    // this.isLoading = false;
  }

   getComments() {
    const lcRequestnumber = this.headerData.requestNo;
    const lcnum = this.headerData.lcnum;
    const templateName = 'ch.html';
    const stage = 1;
    const userid = this.headerData.createdby;
    const moduleCode = this.headerData.modulecode;
    this.iwsSwervice
      .onGetCommentsData(
        lcRequestnumber,
        lcnum,
        templateName,
        stage,
        userid,
        moduleCode
      )
      .subscribe((data: any) => {
        console.log(data);
        let fileExtension = 'pdf';
        const binaryData = atob(data.data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        let blob: any;
        blob = new Blob([uint8Array], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = lcRequestnumber + '.' + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    this.isLoading = false;
  }
}
