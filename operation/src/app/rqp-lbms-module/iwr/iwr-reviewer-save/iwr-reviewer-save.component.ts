import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IwsService } from '../../iws/iws.service';
import { IwrService } from '../iwr.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { CookieService } from 'ngx-cookie-service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iwr-reviewer-save',
  standalone: false,
  templateUrl: './iwr-reviewer-save.component.html',
  styleUrl: './iwr-reviewer-save.component.scss'
})
export class IwrReviewerSaveComponent implements OnInit {
  public redirectUrl: string = '/rqpoperationui/lbms/iwr-module-admin';
  public InstrumentForm: FormGroup;
  public futurDate = new Date().toISOString().slice(0, 16);
  public pageData: any;
  public headerData: any;
    public userCurrentComments: any;
  public isLoading: boolean;
  public disableButtons = false;
  public comments: string;
  public headerRequestBody: any;
  public nextStageListData: any;
  public instrumrntInfo: any;
  public calAssignmentData: any;
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
  public lc0002Value: any;
  public lc0002: any;
  public ff0001: any;
  public lc0001: any;
   public ff0005: number;
     public ff0002: any;
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
    this.getCalculationAssignamentList();
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

  getCalibrationModuleRequestno() {
    this.iwsSwervice.getResquestNoIDForCalibration(this.ff0001, this.lc0001).subscribe((data: any) => {
      console.log(data);
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
      console.log(this.parameters);
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
      console.log(this.qualitativeParameters);
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
      console.log(this.quantitativeParameters);
    }

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
  generateReadingFields(value: any) {
    console.log(value.readings)
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
    console.log(statistics);
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
    console.log(statistics)
    this.checkMultiQuantitativeResult(statistics);
  }

  checkMultiQuantitativeResult(sp: any) {
    console.log(sp)
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
 
  onLoadInstrumentCode() {
    let unitCode = this.cookieService.get('buCode');
    this.iwsSwervice.getAllInstrmentsList(unitCode).subscribe((data: any) => {
      this.instrumrntInfo = data.data;
    });
  }
  getCalculationAssignamentList(){
     let unitCode = this.cookieService.get('buCode');
    this.iwrSwervice.getCalculationAssignamentList(unitCode).subscribe((data:any) => {
      this.calAssignmentData = data.data;
      this.getQlpRecordList(this.lc0002);
        this.getCdIndexList(this.lc0002);
        this.getQpsrRecordList(this.lc0002);
        this.getQtmpRecordList(this.lc0002);
    });
  }

  // isCategorySuccess: boolean;
  // onChangeInstrumentCode() {
  //   if (this.InstrumentForm.controls['instrumentCode'].value == '') {
  //     this.InstrumentForm.controls['instrumentCode'].setValue('');
  //   } else {
  //     this.isCategorySuccess = false;
  //     let categoryCurrentValue = this.InstrumentForm.controls['instrumentCode'].value;
  //     this.calAssignmentData.forEach((elements) => {
  //       if (elements.buTypeCode == categoryCurrentValue) {
  //         this.isCategorySuccess = true;
  //       }
  //     });
  //     if (this.isCategorySuccess == false) {
  //       this.InstrumentForm.controls['instrumentCode'].setErrors({ incorrect: true });
  //       this.openStatusLOV();
  //     }
  //   }
  // }



  // openStatusLOV() {
  //   let unitCode = this.cookieService.get('buCode');
  //   this.displayedColumns = [
  //     { field: 'uc0001', title: 'Instrument Number' },
  //     { field: 'ff0001', title: 'Instrument Name' },
  //     { field: 'ff0005', title: 'Instrument Code' },
  //     { field: 'ff0004', title: 'Schedule Date' }
  //   ];
  //   const dialogRef = this.dialog.open(LovDialogComponent, {
  //     height: '500px',
  //     width: '700px',
  //     data: {
  //       dialogTitle: 'Instrument Information',
  //       dialogColumns: this.displayedColumns,
  //       dialogData: this.calAssignmentData,
  //       lovName: 'instrumentList'
  //     },
  //     disableClose: true
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => {

  //     if (result) {

  //       this.selectedDialogData = result.data;

  //       console.log(this.selectedDialogData);

  //       this.InstrumentForm.patchValue({
  //         instrumentCode: this.selectedDialogData.ff0005,
  //         instrumentName: this.selectedDialogData.ff0001,
  //         instrumentNumber: this.selectedDialogData.uc0001,
  //         scheduleDate: this.selectedDialogData.ff0004
  //       });       
  //         this.lc0002Value = this.selectedDialogData.ff0002;
  //         console.log(this.lc0002Value);
  //         this.getQlpRecordList(this.lc0002Value);
  //         //this.getCdIndexList(this.lc0002Value);
  //         this.getQpsrRecordList(this.lc0002Value);
  //         this.getQtmpRecordList(this.lc0002Value);

  //     }

  //   });

  // }
  getQlpRecordList(lc0002: any) {
    this.iwsSwervice.getQlpRecordList(lc0002).subscribe((data: any) => {
      this.QlpRecordList = data.data;
      const QlpRecordData: any[] = [];
      this.QlpRecordList.forEach((element: any) => {
        QlpRecordData.push({
          qualitativeParameterNo: element.ff0001,

          setPoints: [
            {
              qualitativeSetPoints: '',
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

          setPoint:'',
          min: element.ff0004,
          max: element.ff0005,
          uom: element.ff0006,
          result: '',
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


