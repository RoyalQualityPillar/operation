import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil, timer } from 'rxjs';
import { IwsService } from '../iws.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { CookieService } from 'ngx-cookie-service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';

@Component({
  selector: 'app-iws-update-save',
  standalone: false,
  templateUrl: './iws-update-save.component.html',
  styleUrl: './iws-update-save.component.scss'
})
export class IwsUpdateSaveComponent implements OnInit {
  public InstrumentForm: FormGroup;
  public pageData: any;
  public headerData: any;
  public isLoading: boolean;
  public disableButtons = false;
  public comments: string;
  public headerRequestBody: any;
  public nextStageListData: any;
  public instrumrntInfo:any;
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
        this.onLoadInstrumentCode();
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'BMR-Initiator',
    };
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();
  }
  getHeaderData(event: any) {
    this.headerData = event;
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
    console.log(body);    this.iwsSwervice.getNextStageList(body).subscribe((data: any) => {
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
            setPoint: '',
            passLimit: ''
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
    const standardDeviation =

      Number(sp.standardDeviation);



    const quantitativeStandardDeviation =

      Number(sp.quantitativeStandardDeviation);



    const relativeStandardDeviation =

      Number(sp.relativeStandardDeviation);



    const quantitativeRelativeStandardDeviation =

      Number(sp.quantitativeRelativeStandardDeviation);

    // ====================  // 1. Minimum & Maximum Validation  // =================


    if (

      minimum !== passLimitMin ||

      maximum !== passLimitMax

    ) {

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


    if (

      standardDeviation !==

      quantitativeStandardDeviation

    ) {

      isPass = false;

    }

    // ====================  // 4. Relative Standard Deviation Validation  // ===================



    if (

      relativeStandardDeviation !==

      quantitativeRelativeStandardDeviation

    ) {

      isPass = false;

    }

    // ==================  // Final Result  // ===================

    sp.result = isPass ? 'PASS' : 'FAIL';

  }

  async onSaveConfirmation() {
    const component = await this.remoteLoader.loadComponentByKey('CommonESignatureComponent');
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
          this.onSubmit('0');
        }
      }
    });

  }
  async onSubmitConfirmation() {
    const component = await this.remoteLoader.loadComponentByKey('CommonESignatureComponent');
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
          this.onSubmit('1');
        }
      }
    });
   
  }
  onSubmit(value: any) {
    console.log(value);
    console.log(this.quantitativeParameters)
    console.log(this.qualitativeParameters);
    this.disableButtons = true;
    let draftValue: boolean;
    if (value == 1) {
      draftValue = false;
    } else {
      draftValue = true;
    }
    const instrumentindexValue = this.InstrumentForm.value;
  const qualitativeRecordList:any[] = [];

     this.qualitativeParameters.forEach((element:any) => {
element.setPoints.forEach((ele: any) => {
qualitativeRecordList.push({
   uc0001: '',
        ff0001: ele.qualitativeparameterNo,
        ff0002: ele.qualitativePassLimit,
        ff0003: "string",
        ff0004: 0,
        ff0005: "string",
        createdby: this.cookieService.get('userId'),
        status: 0,
        comments: this.comments
});
});
        });
        console.log(qualitativeRecordList);

const qpsrRecordList: any[] = [];

  this.parameters.forEach((parameter: any) => {

    parameter.setPoints.forEach((sp: any) => {

      qpsrRecordList.push({
        uc0001: '',
        ff0001: parameter.parameterNo,
        ff0002: parameter.parameterName,
        ff0003: sp.setPoint,
        ff0004: sp.min,
        ff0005: sp.max,
        ff0006: sp.uom,
        ff0007: sp.result,
        ff0008: sp.passLimit,
        ff0009: '',
        ff0010: '',
        createdby: this.cookieService.get('userId'),
        status: 0,
        comments: this.comments
      });

    });

  });

  console.log('qpsrRecordList', qpsrRecordList);

  const qpmpRecordList: any[] = [];

  this.quantitativeParameters.forEach((parameter: any) => {

    parameter.setPoints.forEach((sp: any) => {

      qpmpRecordList.push({
        uc0001: '',
        ff0001: parameter.quantitativeParameterNo,
        ff0002: parameter.quantitativeParameterName,
        ff0003: sp.setPoint,
        ff0004: sp.minimum,
        ff0005: sp.maximum,
        ff0006: sp.average,
        ff0007: sp.standardDeviation,
        ff0008: sp.relativeStandardDeviation,
        ff0009: sp.result,
        ff0010: sp.passLimit,
        ff0011: sp.uom,
        createdby: this.cookieService.get('userId'),
        status: 0,
        comments: this.comments
      });

    });

  });

  console.log('qpmrRecordList', qpmpRecordList);

    let body = {
    lcRequest: {
          unitCode: this.headerData.unitcode,
          moduleCode: this.headerData.modulecode,
          departmentCode: this.headerData.departmentcode,
          lcNumber: this.headerData.lcnum,
          lcStage: this.headerData.stage,
          stage2: 0,
          draft: draftValue,
          comments: this.comments,
          requestType: '',
          createdBy: this.cookieService.get('userId'),
          lcRole: this.headerData.role,
          documentModule: 'LBMS',
          documentStatus: '',
          gmuserDTOList: [],
        },
  
  "qlpRecordList": qualitativeRecordList,
  "cdIndexList": [
    {
     uc0001: "string",
     ff0001: instrumentindexValue.instrumentNumber,
     ff0002: instrumentindexValue.instrumentName,
     ff0003: instrumentindexValue.instrumentCode,
     ff0004: "string",
     ff0005: "string",
     ff0006: "string",
     ff0008: "string",
     lc0001: "string",
     lc0002: "string",
     lc0003: "string",
     lc0004: "string",
      lc0005: "string",
      lc0006: "string",
      createdby: this.cookieService.get('userId'),
      status: 0,
      comments: this.comments
    }
  ],
  "qpsrRecordList": qpsrRecordList,
  "qtmpRecordList": qpmpRecordList,
  "qpmrRecordList": [
     {
     uc0001: "string",
     ff0001: "string",
     ff0002: "string",
     ff0003: "string",
     ff0004: "string",
     ff0005: "string",
     ff0006: "string",
     ff0008: "string",
     ff0009: "string",
     ff0010: "string",
     ff0011: "string",
      createdby: this.cookieService.get('userId'),
      status: 0,
      comments: this.comments
    }
  ],
  "anyListNonEmpty": true
};
console.log(body)
    this.isLoading = true;
    this.iwsSwervice
      .saveCalibrationWorksheetMaster(body)
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.isLoading = false;
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.isLoading = false;

          this.notificationService.showSuccess(data.status, () => { });
          timer(2000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.route.navigateByUrl('/rqpoperationui/lbms/iws-module-admin');
            });
        }
      });
  }
  onLoadInstrumentCode(){
      let unitCode = this.cookieService.get('buCode');
    this.iwsSwervice.geInusMasterList(unitCode).subscribe((data: any) => {
      console.log(data);
      this.instrumrntInfo = data.data;
    });
  }
  isCategorySuccess:boolean;
  onChangeInstrumentCode() {
    if (this.InstrumentForm.controls['uc0002'].value == '') {
      this.InstrumentForm.controls['uc0002'].setValue('');
    } else {
      this.isCategorySuccess = false;
      let categoryCurrentValue = this.InstrumentForm.controls['uc0002'].value;
      this.instrumrntInfo.forEach((elements) => {
        if (elements.buTypeCode == categoryCurrentValue) {
          this.isCategorySuccess = true;
        }
      });
      if (this.isCategorySuccess == false) {
        this.InstrumentForm.controls['uc0002'].setErrors({ incorrect: true });
        this.openStatusLOV();
      }
    }
  }
   openStatusLOV() {
  this.displayedColumns = [
    { field: 'uc0001', title: 'Instrument Number' },
    { field: 'ff0004', title: 'Instrument Name' },
    { field: 'ff0005', title: 'Instrument Code' }
  ];
  const dialogRef = this.dialog.open(LovDialogComponent, {
    height: '500px',
    width: '700px',
    data: {
      dialogTitle: 'Instrument Information',
      dialogColumns: this.displayedColumns,
      dialogData: this.instrumrntInfo,
      lovName: 'instrumentList'
    },
    disableClose: true
  });

  dialogRef.afterClosed().subscribe((result: any) => {

    if (result) {

      this.selectedDialogData = result.data;

      console.log(this.selectedDialogData);

      this.InstrumentForm.patchValue({
        instrumentCode: this.selectedDialogData.ff0005,
        instrumentName: this.selectedDialogData.ff0004,
        instrumentNumber: this.selectedDialogData.uc0001
      });

    }

  });

}
// onChangeInstrumentCode() {

//   const instrumentCode =
//     this.InstrumentForm.controls['instrumentCode'].value;

//   if (!instrumentCode) {
//     return;
//   }

//   const selectedInstrument = this.instrumrntInfo.data.find(
//     (item: any) => item.uc0001 === instrumentCode
//   );

//   if (selectedInstrument) {

//     this.InstrumentForm.patchValue({
//       instrumentName: selectedInstrument.ff0004,
//       instrumentNumber: selectedInstrument.ff0005
//     });

//   } else {

//     this.InstrumentForm.controls['instrumentCode']
//       .setErrors({ incorrect: true });

//     this.openStatusLOV();

//   }

// }

}

