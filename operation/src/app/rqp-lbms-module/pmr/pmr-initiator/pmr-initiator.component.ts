import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil, timer } from 'rxjs';
import { IwsService } from '../../iws/iws.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { CookieService } from 'ngx-cookie-service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pmr-initiator',
  standalone: false,
  templateUrl: './pmr-initiator.component.html',
  styleUrl: './pmr-initiator.component.scss'
})
export class PmrInitiatorComponent implements OnInit {
  public InstrumentForm: FormGroup;
  public pageData: any;
  public headerData: any;
  public isLoading: boolean;
  public disableButtons = false;
  public comments: string;
  public headerRequestBody: any;
  public nextStageListData: any;
  public instrumrntInfo: any;
  public displayedColumns: any[] = [];
  public selectedDialogData: any;
  public PMMCheckList: any;
  public PMMCdIndexList: any;
  public pmmAssignmentData: any;
  public isCategorySuccess: boolean;
  public lc0002Value: any;
  public destroy$ = new Subject<void>();
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
  public quantitativeUomList = ['°C', 'RPM', 'Bar', 'Kg', 'Minutes', 'pH', 'mL', '%'];
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

      rows: this.fb.array([
        this.createRow()
      ])
    });
  }
  ngOnInit(): void {
    this.onLoadInstrumentCode();
    this.getCalculationAssignamentList();
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'BMR-Initiator',
    };
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();
    this.InstrumentForm = this.fb.group({
      rows: this.fb.array([
        this.createRow()
      ])
    });
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
    this.iwsSwervice.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
  // onGenerateParameters() {
  //   this.parameters = [];

  //   for (let i = 0; i < this.parameterNo; i++) {
  //     const setPoints = [];

  //     for (let j = 0; j < this.setPointNo; j++) {
  //       setPoints.push({
  //         setPoint: '',
  //         min: '',
  //         max: '',
  //         uom: '',
  //         result: '',
  //         passLimit: ''
  //       });
  //     }

  //     this.parameters.push({
  //       parameterNo: i + 1,
  //       parameterName: this.parameterName,
  //       setPointNo: this.setPointNo,
  //       setPoints: setPoints
  //     });
  //   }

  // }
  // onGenerateQualitativeParameters() {
  //   this.qualitativeParameters = [];
  //   for (let j = 0; j < this.qualitativeParameterNo; j++) {
  //     this.qualitativeParameters.push({
  //       qualitativeparameterNo: j + 1,

  //       setPoints: [
  //         {
  //           qualitativeSetPoints: '',
  //           qualitativePassLimit: ''
  //         }
  //       ]
  //     });
  //   }

  // }
  // onGenerateQuantitativeParameters() {
  //   this.quantitativeParameters = [];

  //   for (let i = 0; i < this.quantitativeParameterNo; i++) {
  //     const setPoints = [];

  //     for (let j = 0; j < this.quantitativeSetPointNo; j++) {
  //       setPoints.push({
  //         // setPointType: 'Single',
  //         setPoint: '',
  //         passLimitMin: '',
  //         passLimitMax: '',
  //         uom: '',
  //         result: '',
  //         passLimit: '',
  //         averageLower: '',
  //         averageUpper: '',

  //         minimum: '',
  //         maximum: '',
  //         average: '',

  //         standardDeviation: '',
  //         relativeStandardDeviation: '',

  //         quantitativeStandardDeviation: '',
  //         quantitativeRelativeStandardDeviation: '',
  //         readings: '',
  //         readingValues: []
  //       });
  //     }

  //     this.quantitativeParameters.push({
  //       quantitativeParameterNo: i + 1,
  //       quantitativeParameterName: this.quantitativeParameterName,
  //       setPoints: setPoints
  //     });
  //   }

  // 
  // checkResult(setPointObj: any) {
  //   const setPoint = parseFloat(setPointObj.setPoint);
  //   const min = parseFloat(setPointObj.min);
  //   const max = parseFloat(setPointObj.max);

  //   if (!isNaN(setPoint) && !isNaN(min) && !isNaN(max)) {
  //     if (setPoint >= min && setPoint <= max) {
  //       setPointObj.result = 'PASS';
  //     } else {
  //       setPointObj.result = 'FAIL';
  //     }
  //   } else {
  //     setPointObj.result = '';
  //   }
  // }
  // generateReadingFields(value: any) {
  //   value.readingValues = [];

  //   const count = Number(value.readings);

  //   if (count > 0) {

  //     for (let i = 0; i < count; i++) {

  //       value.readingValues.push({
  //         value: ''
  //       });

  //     }

  //   }

  // }

  // calculateStatistics(statistics: any) {
  //   const values = statistics.readingValues
  //     .map((r: any) => Number(r.value))
  //     .filter((v: number) => !isNaN(v));

  //   if (values.length === 0) {
  //     statistics.minimum = '';
  //     statistics.maximum = '';
  //     statistics.average = '';
  //     statistics.standardDeviation = '';
  //     statistics.relativeStandardDeviation = '';
  //     statistics.result = '';
  //     return;
  //   }
  //   statistics.minimum = Math.min(...values);
  //   statistics.maximum = Math.max(...values);
  //   const sum = values.reduce((a: number, b: number) => a + b, 0);
  //   const avg = sum / values.length;
  //   // statistics.average = avg.toFixed(2);
  //   statistics.average = Number(avg.toFixed(2));
  //   // Standard Deviation
  //   let variance = 0;
  //   variance =
  //     values.reduce((acc: number, value: number) => {
  //       return acc + Math.pow(value - avg, 2);
  //     }, 0) / (values.length - 1);

  //   const sd = Math.sqrt(variance);

  //   // statistics.standardDeviation = sd.toFixed(2);
  //   statistics.standardDeviation =
  //     Number(sd.toFixed(2));
  //   // Relative Standard Deviation
  //   const rsd = avg !== 0 ? (sd / avg) * 100 : 0;

  //   // statistics.relativeStandardDeviation = rsd.toFixed(2);
  //   statistics.relativeStandardDeviation =
  //     Number(rsd.toFixed(2));
  //   this.checkMultiQuantitativeResult(statistics);
  // }

  // checkMultiQuantitativeResult(sp: any) {
  //   if (

  //     sp.minimum === '' ||
  //     sp.maximum === '' ||
  //     sp.average === '' ||
  //     sp.standardDeviation === '' ||
  //     sp.relativeStandardDeviation === '' ||
  //     sp.passLimitMin === '' ||
  //     sp.passLimitMax === '' ||
  //     sp.averageLower === '' ||
  //     sp.averageUpper === '' ||
  //     sp.quantitativeStandardDeviation === '' ||
  //     sp.quantitativeRelativeStandardDeviation === ''

  //   ) {

  //     sp.result = '';
  //     return;

  //   }
  //   let isPass = true;

  //   const minimum = Number(sp.minimum);
  //   const maximum = Number(sp.maximum);

  //   const passLimitMin = Number(sp.passLimitMin);
  //   const passLimitMax = Number(sp.passLimitMax);
  //   const average = Number(sp.average);

  //   const averageLower = Number(sp.averageLower);
  //   const averageUpper = Number(sp.averageUpper);
  //   const standardDeviation = Number(sp.standardDeviation);

  //   const quantitativeStandardDeviation =
  //     Number(sp.quantitativeStandardDeviation);

  //   const relativeStandardDeviation =
  //     Number(sp.relativeStandardDeviation);

  //   const quantitativeRelativeStandardDeviation =
  //     Number(sp.quantitativeRelativeStandardDeviation);

  //   // ====================  // 1. Minimum & Maximum Validation  // =================
  //   // minimum >= passLimitMin
  //   // maximum <= passLimitMax
  //   if (minimum < passLimitMin) {

  //     isPass = false;

  //   }
  //   if (maximum > passLimitMax) {

  //     isPass = false;

  //   }



  //   // ====================  // 2. Average Validation  // ==================



  //   if (

  //     average < averageLower ||

  //     average > averageUpper

  //   ) {

  //     isPass = false;

  //   }

  //   // =====================  // 3. Standard Deviation Validation  // ==================

  //   // quantitativeStandardDeviation >= standardDeviation
  //   if (

  //     standardDeviation >

  //     quantitativeStandardDeviation

  //   ) {

  //     isPass = false;

  //   }

  //   // ====================  // 4. Relative Standard Deviation Validation  // ===================

  //   // quantitativeRelativeStandardDeviation >= relativeStandardDeviation

  //   if (

  //     relativeStandardDeviation >

  //     quantitativeRelativeStandardDeviation

  //   ) {

  //     isPass = false;

  //   }

  //   // ==================  // Final Result  // ===================

  //   sp.result = isPass ? 'PASS' : 'FAIL';

  // }

  
  getCalculationAssignamentList() {
    let unitCode = this.cookieService.get('buCode');
    this.iwsSwervice.getPMMCalculationAssignamentList(unitCode).subscribe((data: any) => {
      this.pmmAssignmentData = data.data;
    });
  }
  // getPMMCalibrationModuleRequestno() {
  //     this.iwsSwervice.getResquestNoIDForPMMCalibration(this.ff0001, this.lc0001).subscribe((data: any) => {
  //       this.lc0002 = data.data[0].lc0002;
  //       if (this.lc0002) {
  //         this.getPMMCheckList(this.lc0002);
  //         this.getPMMCdIndexList(this.lc0002);
  //       }
  //     });
  //   }
  getPMMCheckList(lc0002: any) {
    this.iwsSwervice.getPMMCheckList(lc0002).subscribe((data: any) => {
      this.PMMCheckList = data.data;
      this.rows.clear();
      this.PMMCheckList.forEach((value: any) => {
        const row = this.createRow();
        row.patchValue({
          procedure: value.ff0003,
          checkPoint: value.ff0004,
          // status: value.ff0005,
          // remarks: value.ff0006
        });
        this.rows.push(row);
      });
    });
  }
  getPMMCdIndexList(lc0002: any) {
    this.iwsSwervice.getPMMCdIndexList(lc0002).subscribe((data: any) => {
      this.PMMCdIndexList = data.data;
      this.PMMCdIndexList.forEach((element: any) => {
        this.InstrumentForm.patchValue({
          instrumentCode: element.ff0001,
          instrumentName: element.ff0002,
          instrumentNumber: element.ff0003,
        });
      });
    });
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
    this.disableButtons = true;
    let draftValue: boolean;
    if (value == 1) {
      draftValue = false;
    } else {
      draftValue = true;
    }
    const instrumentindexValue = this.InstrumentForm.value;
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
      indexList: [
        {
          uc0001: null,
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
      checkList: this.rows.value.map((row: any) => ({
        uc0001: null,
        ff0001: "string",
        ff0002: "string",
        ff0003: row.procedure,
        ff0004: row.checkPoint,
        ff0005: row.status,
        ff0006: row.remarks,
        ff0007: "string",
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
      })),

      "anyListNonEmpty": true
    };
    this.isLoading = true;
    this.iwsSwervice
      .savePMMCalibrationWorksheetMaster(body)
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
              this.route.navigateByUrl('/rqpoperationui/lbms/pmr-module-admin');
            });
        }
      });
  }
  onLoadInstrumentCode() {
    let unitCode = this.cookieService.get('buCode');
    this.iwsSwervice.getAllInstrmentsList(unitCode).subscribe((data: any) => {
      this.instrumrntInfo = data.data;
    });
  }
  
  createRow(): FormGroup {
    return this.fb.group({
      checkPoint: [''],
      procedure: [''],
      status: [''],
      remarks: ['']
    });
  }
  get rows(): FormArray {
    return this.InstrumentForm.get('rows') as FormArray;
  }

  addRow(): void {
    this.rows.push(this.createRow());
  }



  onChangeInstrumentCode() {
    if (this.InstrumentForm.controls['instrumentCode'].value == '') {
      this.InstrumentForm.controls['instrumentCode'].setValue('');
    } else {
      this.isCategorySuccess = false;
      let categoryCurrentValue = this.InstrumentForm.controls['instrumentCode'].value;
      this.pmmAssignmentData.forEach((elements) => {
        if (elements.buTypeCode == categoryCurrentValue) {
          this.isCategorySuccess = true;
        }
      });
      if (this.isCategorySuccess == false) {
        this.InstrumentForm.controls['instrumentCode'].setErrors({ incorrect: true });
        this.openStatusLOV();
      }
    }
  }
  openStatusLOV() {
    this.displayedColumns = [
      { field: 'uc0001', title: 'Instrument Number' },
      { field: 'ff0001', title: 'Instrument Name' },
      { field: 'ff0003', title: 'Instrument Code' }
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '700px',
      data: {
        dialogTitle: 'Instrument Information',
        dialogColumns: this.displayedColumns,
        dialogData: this.pmmAssignmentData,
        lovName: 'instrumentList'
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result) {

        this.selectedDialogData = result.data;
        this.InstrumentForm.patchValue({
          instrumentCode: this.selectedDialogData.ff0003,
          instrumentName: this.selectedDialogData.ff0001,
          instrumentNumber: this.selectedDialogData.uc0001
        });
           this.lc0002Value = this.selectedDialogData.ff0002;
        this.getPMMCheckList(this.lc0002Value);
        this.getPMMCdIndexList(this.lc0002Value);

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

