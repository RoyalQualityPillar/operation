import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api-service/api.service';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { timer, takeUntil, Subject } from 'rxjs';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LovDialogComponent } from '../lov-dialog/lov-dialog.component';
import { ToolbarService } from 'src/app/service/toolbar.service';
//import { CommonESignatureComponent } from '../common-e-signature/common-e-signature.component';
import { NotificationService } from '../notification.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';

export interface RequestModel {
  unitCode: string;
  moduleCode: string;
  departmentCode: string;
  lcrqNumber: string;
  lcNumber: string;
  lcStage: string;
  lcRole: string;
  stage2?: number | string;
  requestType: string;
  createdBy: string;
  comments: string;
  documentModule: string;
  documentStatus: string;
  gmuserDTOList: GmUserDTO[];
}

export interface GmUserDTO {
  userid: string;
  lcrole: string;
  stage: string;
}

@Component({
  selector: 'app-common-button-bar',
  templateUrl: './common-button-bar.component.html',
  styleUrls: ['./common-button-bar.component.scss'],
  standalone: false,
})
export class CommonButtonBarComponent {
  @Input() buttonConfig: { label: string; getPayload: () => any }[]; // Array of buttons with label, API URL, and payload
  @Input() redirectUrl: string;
  @Output() buttonClicked = new EventEmitter<{
    buttonName: string;
    success: boolean;
  }>(); // Emit button name and success status
  public hideNextSteps = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    private toolbarService: ToolbarService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private remoteLoader: RemoteComponentLoaderService
  ) {
    this.FooterForm = this.fb.group({
      nextStage: [''],
      previousStage: [''],
    });
  }

  ngOnInit(): void {
    console.log(this.buttonConfig);
  }
  public FooterForm: FormGroup;
  public commentForm: FormGroup = new FormGroup({
    comments: new FormControl(''),
    // nextStage: new FormControl(''),
  });
  private $destroy = new Subject();
  selectedDialogData: any;
  pageData: any;
  commentsFieldData: any;
  requestFieldData: string;
  buttonName: any;
  payload: any;
  list: any;
  async handleButtonClick(button: { label: string; getPayload: () => any }) {
    console.log(button.label);
    const payload = button.getPayload();
    this.payload = payload;
    this.headerData = payload.calculatedValue;
    this.pageData = payload.pageData;
    this.list = payload.list;
    this.requestFieldData = payload.requestFieldData;
    this.commentsFieldData = payload.commentsFieldData;
    this.buttonName = button.label;
    console.log(payload);
    if (button.label == 'Comments') {
      const payload = button.getPayload();
      let lcRequestnumber = payload.lcRequestnumber;
      let lcnum = payload.lcnum;
      let templateName = payload.templateName;
      let stage = payload.stage;
      let userid = payload.userid;
      let moduleCode = payload.moduleCode;

      let HttpMethod = 'POST';
      let params = {
        lcRequestnumber,
        lcnum,
        templateName,
        stage,
        userid,
        moduleCode,
      };
      let APIURL: any = 'gmapr/gmap-comment/get-all';
      this.apiService
        .sendRequest(APIURL, HttpMethod, params)
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
    } else {
      if (
        payload.commentsFieldData == '' ||
        payload.commentsFieldData == null ||
        payload.commentsFieldData == undefined
      ) {
        this.dialog.open(MessageDialogComponent, {
          data: {
            message: 'please add comments',
            heading: 'Error Information',
          },
        });
        return;
      }
      const component = await this.remoteLoader.loadComponentByKey(
        'CommonESignatureComponent'
      );
      const dialogRef = this.dialog.open(component, {
        height: '300px',
        width: '600px',
        data: {},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.selectedDialogData = result.data;
          if (this.selectedDialogData) {
            this.onCallSubmitApi();
          }
        }
      });
    }
    // this.http.post(button.apiUrl, button.payload).subscribe(
    //   (response) => {
    //     this.buttonClicked.emit({ buttonName: button.label, success: true }); // Emit success
    //   },
    //   (error) => {
    //     this.buttonClicked.emit({ buttonName: button.label, success: false }); // Emit failure
    //   }
    // );
  }
  headerData: any;
  onCallSubmitApi() {
    //  this.headerData = this.payload=
    console.log(this.headerData);
    let body: RequestModel = {
      unitCode: this.headerData.unitcode,
      moduleCode: this.headerData.modulecode,
      departmentCode: this.headerData.departmentcode,
      lcrqNumber: this.pageData.requestNo,
      lcNumber: this.headerData.lcnum,
      lcStage: this.headerData.stage,
      lcRole: this.headerData.role,
      stage2: this.FooterForm.controls['previousStage'].value,
      createdBy: this.headerData.createdby,
      requestType: '',
      comments: this.commentsFieldData,
      documentModule: '',
      documentStatus: 'string',
      gmuserDTOList: [],

      // draft: true
    };
    if (this.headerData.role.includes('QA Reviewer')) {
      body.gmuserDTOList = this.list ? this.list : [];
      body.requestType = this.requestFieldData;
    }

    if (
      this.headerData.modulecode == 'SOP' ||
      this.headerData.modulecode == 'BMR' ||
      this.headerData.modulecode == 'AWS' ||
      this.headerData.modulecode == 'SPC'
    ) {
      body.documentModule = 'DMS';
    }
     if (
      this.headerData.modulecode == 'BOM' ||
      this.headerData.modulecode == 'EPO' 
    ) {
      body.documentModule = 'PP';
    }
    if (
      this.headerData.modulecode == 'GRN' 
    ) {
      body.documentModule = 'WH';
    }
    if (body.stage2 == '' || body.stage2 == undefined || body.stage2 == null) {
      body.stage2 = 0;
    }
    let HttpMethod = 'POST';
    let params = {};
    let APIURL: any;

    if (this.buttonName == 'Submit') {
      body.stage2 = this.commentForm.controls['nextStage']?.value;
      APIURL = apiEndPoints.commonButtonBarApprove;
    } else if (this.buttonName == 'Return') {
      body.stage2 = this.commentForm.controls['previousStage']?.value;
      APIURL = apiEndPoints.commonButtonBarReject;
    } else if (this.buttonName == 'Cancel') {
      this.buttonClicked.emit({ buttonName: this.buttonName, success: true });
    }
    console.log(body);
    if (body.stage2 == '' || body.stage2 == undefined || body.stage2 == null) {
      body.stage2 = 0;
    }

    if (this.headerData.role.includes('QA Reviewer')) {
      body.stage2 =
        body.gmuserDTOList.length > 0 ? 0 : +this.headerData.stage + 1;
      if (
        this.headerData.role.includes('QA Reviewer') &&
        this.buttonName == 'Return'
      ) {
        body.stage2 = 0;
      }
    }
    this.apiService
      .sendRequest(APIURL, HttpMethod, params, body)
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.buttonClicked.emit({
            buttonName: this.buttonName,
            success: false,
          });
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.buttonClicked.emit({
            buttonName: this.buttonName,
            success: true,
          });
          this.notificationService.showSuccess(data.status, () => {
            console.log('Success Snackbar Closed');
          });
          timer(2000)
            .pipe(takeUntil(this.$destroy))
            .subscribe(() => {
              this.router.navigateByUrl(this.redirectUrl);
            });
        }
        // this.isLoading = false;
      });
  }
  openNextStageLov() {
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];

    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Stage',
        dialogColumns: this.displayedColumns,
        dialogData: this.toolbarService.nextStageListData,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        console.log(this.selectedDialogData);
        this.FooterForm.controls['nextStage'].setValue(result.data.stage);
      }
    });
  }
  displayedColumns: any;
  openPreviousStageLov() {
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Previous Stage',
        dialogColumns: this.displayedColumns,
        dialogData: this.toolbarService.previousStageListData,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.FooterForm.controls['previousStage'].setValue(result.data.stage);
      }
    });
  }
}
