import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IwsService } from '../../iws/iws.service';
import { IwrService } from '../iwr.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { CookieService } from 'ngx-cookie-service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iwr-completed-save',
  standalone: false,
  templateUrl: './iwr-completed-save.component.html',
  styleUrl: './iwr-completed-save.component.scss'
})
export class IwrCompletedSaveComponent implements OnInit {
  public InstrumentForm: FormGroup;
  public commentType = 'completedRecord';
  public pageData: any;
  public headerData: any;
  public isLoading: boolean;
  public userCurrentComments: any;
  public headerRequestBody: any;
  public nextStageListData: any;
  public instrumrntInfo: any;
  public ff0005: number;
  public ff0001: any;
  public lc0001: any;
  public ff0002: any;
  public lc0002: any;
  public parameterNo: number = 0;
  public setPointNo: number = 0;
  public parameterName: any;
  public parameters: any[] = [];
  public uomList = ['°C', 'RPM', 'Bar', 'Kg', 'Minutes', 'pH', 'mL', '%'];
  public qualitativeParameterNo: number;
  public qualitativeParameters: any[] = [];
  public quantitativeParameterNo: number = 0;
  public quantitativeSetPointNo: number = 0;
  public quantitativeParameterName: any;
  public quantitativeParameters: any[] = [];
  public QlpRecordList: any;
  public CdIndexList: any;
  public QpsrRecordList: any;
  public QtmpRecordList: any;
  public QpmrRecordList: any;
  constructor(
    public dialog: MatDialog,
    private iwsSwervice: IwsService,
    private iwrSwervice: IwrService,
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
      scheduleDate: ['']
    });
  }
  ngOnInit(): void {
    this.onLoadInstrumentCode();
    this.pageData = {
      pageName: 'homePage',
    };
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
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      lcStage: this.toolbarService.currentStage,
    };
    this.iwsSwervice.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
  onGenerateParameters() {
    this.parameters = [];

    for (let i = 0; i < this.parameterNo; i++) {
      const setPoints = [];

      for (let j = 0; j < this.setPointNo; j++) {
        setPoints.push({
          setPoint: '',
          min: '',
          max: '',
          uom: '',
          result: '',
          passLimit: ''
        });
      }

      this.parameters.push({
        parameterNo: i + 1,
        parameterName: this.parameterName,
        setPointNo: this.setPointNo,
        setPoints: setPoints
      });
    }

  }
  onGenerateQualitativeParameters() {
    this.qualitativeParameters = [];
    for (let j = 0; j < this.qualitativeParameterNo; j++) {
      this.qualitativeParameters.push({
        qualitativeparameterNo: j + 1,

        setPoints: [
          {
            qualitativeSetPoints: '',
            qualitativePassLimit: ''
          }
        ]
      });
    }

  }
  onGenerateQuantitativeParameters() {
    this.quantitativeParameters = [];

    for (let i = 0; i < this.quantitativeParameterNo; i++) {
      const setPoints = [];

      for (let j = 0; j < this.quantitativeSetPointNo; j++) {
        setPoints.push({
          // setPointType: 'Single',
          setPoint: '',
          passLimitMin: '',
          passLimitMax: '',
          uom: '',
          result: '',
          passLimit: '',
          averageLower: '',
          averageUpper: '',

          minimum: '',
          maximum: '',
          average: '',

          standardDeviation: '',
          relativeStandardDeviation: '',

          quantitativeStandardDeviation: '',
          quantitativeRelativeStandardDeviation: '',
          readings: '',
          readingValues: []
        });
      }

      this.quantitativeParameters.push({
        quantitativeParameterNo: i + 1,
        quantitativeParameterName: this.quantitativeParameterName,
        setPoints: setPoints
      });
    }

  }
  onLoadInstrumentCode() {
    let unitCode = this.cookieService.get('buCode');
    this.iwsSwervice.getAllInstrmentsList(unitCode).subscribe((data: any) => {
      this.instrumrntInfo = data.data;
    });
  }
  generateReadingFields(value: any) {
    value.readingValues = [];

    const count = Number(value.readings);

    if (count > 0) {

      for (let i = 0; i < count; i++) {

        value.readingValues.push({
          value: ''
        });
      }
    }
  }

  calculateStatistics(statistics: any) {
    const values = statistics.readingValues
      .map((r: any) => Number(r.value))
      .filter((v: number) => !isNaN(v));

    if (values.length === 0) {
      statistics.minimum = '';
      statistics.maximum = '';
      statistics.average = '';
      statistics.standardDeviation = '';
      statistics.relativeStandardDeviation = '';
      statistics.result = '';
      return;
    }

    // Minimum
    statistics.minimum = Math.min(...values);

    // Maximum
    statistics.maximum = Math.max(...values);

    // Average
    const sum = values.reduce((a: number, b: number) => a + b, 0);
    const avg = sum / values.length;
    // statistics.average = avg.toFixed(2);
    statistics.average = Number(avg.toFixed(2));
    // Standard Deviation
    let variance = 0;
    variance =
      values.reduce((acc: number, value: number) => {
        return acc + Math.pow(value - avg, 2);
      }, 0) / (values.length - 1);

    const sd = Math.sqrt(variance);

    // statistics.standardDeviation = sd.toFixed(2);
    statistics.standardDeviation =
      Number(sd.toFixed(2));
    // Relative Standard Deviation
    const rsd = avg !== 0 ? (sd / avg) * 100 : 0;

    // statistics.relativeStandardDeviation = rsd.toFixed(2);
    statistics.relativeStandardDeviation =
      Number(rsd.toFixed(2));
    this.checkMultiQuantitativeResult(statistics);
  }

  checkMultiQuantitativeResult(sp: any) {
    if (

      sp.minimum === '' ||
      sp.maximum === '' ||
      sp.average === '' ||
      sp.standardDeviation === '' ||
      sp.relativeStandardDeviation === '' ||
      sp.passLimitMin === '' ||
      sp.passLimitMax === '' ||
      sp.averageLower === '' ||
      sp.averageUpper === '' ||
      sp.quantitativeStandardDeviation === '' ||
      sp.quantitativeRelativeStandardDeviation === ''

    ) {

      sp.result = '';
      return;

    }
    let isPass = true;

    const minimum = Number(sp.minimum);
    const maximum = Number(sp.maximum);

    const passLimitMin = Number(sp.passLimitMin);
    const passLimitMax = Number(sp.passLimitMax);
    const average = Number(sp.average);

    const averageLower = Number(sp.averageLower);
    const averageUpper = Number(sp.averageUpper);
    const standardDeviation = Number(sp.standardDeviation);

    const quantitativeStandardDeviation =
      Number(sp.quantitativeStandardDeviation);

    const relativeStandardDeviation =
      Number(sp.relativeStandardDeviation);

    const quantitativeRelativeStandardDeviation =
      Number(sp.quantitativeRelativeStandardDeviation);

    // ====================  // 1. Minimum & Maximum Validation  // =================
    // minimum >= passLimitMin
    // maximum <= passLimitMax
    if (minimum < passLimitMin) {

      isPass = false;

    }
    if (maximum > passLimitMax) {

      isPass = false;

    }



    // ====================  // 2. Average Validation  // ==================



    if (

      average < averageLower ||

      average > averageUpper

    ) {

      isPass = false;

    }

    // =====================  // 3. Standard Deviation Validation  // ==================

    // quantitativeStandardDeviation >= standardDeviation
    if (

      standardDeviation >

      quantitativeStandardDeviation

    ) {

      isPass = false;

    }

    // ====================  // 4. Relative Standard Deviation Validation  // ===================

    // quantitativeRelativeStandardDeviation >= relativeStandardDeviation

    if (

      relativeStandardDeviation >

      quantitativeRelativeStandardDeviation

    ) {

      isPass = false;

    }

    // ==================  // Final Result  // ===================

    sp.result = isPass ? 'PASS' : 'FAIL';

  }
  getCalibrationModuleRequestno() {
    this.iwsSwervice.getResquestNoIDForCalibration(this.ff0001, this.lc0001).subscribe((data: any) => {
      this.lc0002 = data.data[0].lc0002;
      if (this.lc0002) {
        this.getQlpRecordList(this.lc0002);
        this.getCdIndexList(this.lc0002);
        this.getQpsrRecordList(this.lc0002);
        this.getQtmpRecordList(this.lc0002);
        // this.getQpmrRecordList(this.lc0002);
      }
    });
  }
  getQlpRecordList(lc0002: any) {
    this.iwsSwervice.getQlpRecordList(lc0002).subscribe((data: any) => {
      this.QlpRecordList = data.data;
      const QlpRecordData: any[] = [];
      this.QlpRecordList.forEach((element: any) => {
        QlpRecordData.push({
          qualitativeParameterNo: element.ff0001,

          setPoints: [
            {
              qualitativeSetPoints: element.ff0002,
              qualitativePassLimit: element.ff0003,
              parameterCode: element.ff0005
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
        instrumentNumber: this.CdIndexList.ff0001,
        scheduleDate: this.CdIndexList.ff0004
      });
    });
  }
  getQpsrRecordList(lc0002: any) {
    this.iwsSwervice.getQpsrRecordList(lc0002).subscribe((data: any) => {
      this.QpsrRecordList = data.data;
      const QpsrRecordData: any[] = [];
      this.QpsrRecordList.forEach((element: any) => {
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
          parameterCode: element.ff0010,
          setPoint: element.ff0003,
          min: element.ff0004,
          max: element.ff0005,
          uom: element.ff0006,
          result: element.ff0007,
          passLimit: element.ff0008
        });
      });
      this.QpsrRecordList = QpsrRecordData;
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
          parameterCode: element.ff0020,
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

  checkResult(setPointObj: any) {
    const setPoint = parseFloat(setPointObj.setPoint);
    const min = parseFloat(setPointObj.min);
    const max = parseFloat(setPointObj.max);

    if (!isNaN(setPoint) && !isNaN(min) && !isNaN(max)) {
      if (setPoint >= min && setPoint <= max) {
        setPointObj.result = 'PASS';
      } else {
        setPointObj.result = 'FAIL';
      }
    } else {
      setPointObj.result = '';
    }
  }
  public downloadIWRReport() {
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
  public downloadIWRAttachedReport() {
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
