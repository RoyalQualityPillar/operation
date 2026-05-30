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
  selector: 'app-iws-reviewer-save',
  standalone: false,
  templateUrl: './iws-reviewer-save.component.html',
  styleUrl: './iws-reviewer-save.component.scss'
})
export class IwsReviewerSaveComponent implements OnInit {
  public redirectUrl: string = '/rqpoperationui/lbms/iws-module-admin';
  public InstrumentForm: FormGroup;
  public pageData: any;
  public headerData: any;
  public isLoading: boolean;
  public disableButtons = false;
  public comments: string;
  public headerRequestBody: any;
  public nextStageListData: any;
  public instrumrntInfo: any;
  public ff0005: number;
  public ff0001: any;
  public lc0001: any;
  public lc0002: any;
  public ff0002: any;
  public QlpRecordList: any;
  public CdIndexList: any;
  public QpsrRecordList: any;
  public QtmpRecordList: any;
  public QpmrRecordList: any;
  public userCurrentComments: any;
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
    this.pageData = {
      pageName: 'homePage',
    };
    const reviewData = sessionStorage.getItem('selectedRow');
    let params: any = null;
    if (reviewData) {
      params = JSON.parse(reviewData);
      console.log(params)
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
      this.lc0001 = params.ff0001;
      this.ff0005 = params.ff0007;
      this.ff0002 = params.ff0005;
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
    this.iwsSwervice.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
  getCalibrationModuleRequestno() {
    this.iwsSwervice.getResquestNoIDForCalibration(this.ff0001, this.lc0001).subscribe((data: any) => {
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
  getQlpRecordList(lc0002: any) {
    this.iwsSwervice.getQlpRecordList(lc0002).subscribe((data: any) => {
      this.QlpRecordList = data.data;
      const QlpRecordData: any[]= [];
      this.QlpRecordList.forEach((element: any) => {
        QlpRecordData.push({
          qualitativeParameterNo: element.ff0001,

          setPoints: [
            {
              qualitativeSetPoints: element.ff0002,
              qualitativePassLimit: element.ff0003
            }
          ]
        });
      });
      this.QlpRecordList = QlpRecordData;
    });
  }
  getCdIndexList(lc0002: any) {
    this.iwsSwervice.getCdIndexList(lc0002).subscribe((data: any) => {
      this.CdIndexList = data.data[0];
      this.InstrumentForm.patchValue({
        instrumentCode: this.CdIndexList.ff0003,
        instrumentName: this.CdIndexList.ff0002,
        instrumentNumber: this.CdIndexList.ff0001
      });
    });
  }
  getQpsrRecordList(lc0002: any) {
    this.iwsSwervice.getQpsrRecordList(lc0002).subscribe((data: any) => {
      this.QpsrRecordList = data.data;
      const QpsrRecordData: any[] = [];
      this.QpsrRecordList.forEach((element: any) => {
        console.log(element);
        // check parameter already exists
        let existingParam = QpsrRecordData.find(
          (x: any) => x.parameterNo == element.ff0001
        );

        // create new parameter
        if (!existingParam) {

          existingParam = {
            parameterNo: element.ff0001,
            parameterName: element.ff0002,
            setPointNo: element.ff0009,
            setPoints: []
          };

          QpsrRecordData.push(existingParam);
        }

        // push setpoint
        existingParam.setPoints.push({

          setPoint: element.ff0003,
          min: element.ff0004,
          max: element.ff0005,
          uom: element.ff0006,
          result: element.ff0007,
          passLimit: element.ff0008

        });

      });

      this.QpsrRecordList = QpsrRecordData;

      console.log(this.QpsrRecordList);

    });
  }
  getQtmpRecordList(lc0002: any) {
    this.iwsSwervice.getQtmpRecordList(lc0002).subscribe((data: any) => {
      this.QtmpRecordList = data.data;
      const QtmpRecordData: any[] = [];
      this.QtmpRecordList.forEach((element: any) => {
        let existingParam = QtmpRecordData.find(
        (x: any) => x.quantitativeParameterNo == element.ff0001
      );

      // Create new parameter
      if (!existingParam) {

        existingParam = {
          quantitativeParameterNo: element.ff0001,
          quantitativeParameterName: element.ff0002,
          quantitativeSetPointNo: element.ff0003,
          setPoints: []
        };

        QtmpRecordData.push(existingParam);

      }

      const readingValues: any[] = [];

      const totalReadings = Number(element.ff0019);

      for (let i = 21; i < 21 + totalReadings; i++) {

        const fieldName =
          'ff' + ('0000' + i).slice(-4);

        readingValues.push({
          value: element[fieldName]
        });

      }

      // Push setpoint
      existingParam.setPoints.push({
        setPoint: element.ff0004,
        readings: element.ff0019,
        readingValues: readingValues,
        minimum: element.ff0005,
        maximum: element.ff0006,
        average: element.ff0007,
        standardDeviation: element.ff0008,
        relativeStandardDeviation: element.ff0009,
        result: element.ff0010,
        passLimit: element.ff0011,
        uom: element.ff0012,
        passLimitMin: element.ff0013,
        passLimitMax: element.ff0014,
        averageLower: element.ff0015,
        averageUpper: element.ff0016,
        quantitativeStandardDeviation: element.ff0017,
        quantitativeRelativeStandardDeviation: element.ff0018
      });
    });

    this.quantitativeParameters = QtmpRecordData;

    });
  }
  getQpmrRecordList(lc0002: any) {
    this.iwsSwervice.getQpmrRecordList(lc0002).subscribe((data: any) => {
      this.QpmrRecordList = data.data[0];
    });
  }
  buttonConfig = [
    { label: 'Return', getPayload: () => this.calculateReturnPayload() },
    { label: 'Submit', getPayload: () => this.calculateReturnPayload() },
    // { label: 'Clear', getPayload: () => this.calculateReturnPayload() },
    { label: 'Comments', getPayload: () => this.calculateCommentsPayload() },
  ];
  calculateReturnPayload() {
    return {
      data: 'returnData',
      calculatedValue: this.headerData,
      requestFieldData: 'specific',
      commentsFieldData: this.userCurrentComments,
      pageData: this.pageData,
      // list: this.list,
    };
  }

  calculateCommentsPayload() {
    return {
      data: 'returnData',
      calculatedValue: this.headerData,
      lcRequestnumber: this.headerData.requestNo,
      lcnum: this.headerData.lcnum,
      templateName: 'ch.html',
      stage: this.headerData.stage,
      userid: this.headerData.createdby,
      moduleCode: this.headerData.modulecode,
    };
  }
  onButtonClicked(event: { buttonName: string; success: boolean }) {
    console.log('Button: ${event.buttonName}, Success: ${event.success}');
    this.disableButtons = true;
    if (event.success && event.buttonName == 'Return') {
    }
    if (event.success && event.buttonName == 'Submit') {
    }
    if (event.success && event.buttonName == 'Comments') {
    }
    // if (event.success && event.buttonName == 'Clear') {
    // }
  }
}
