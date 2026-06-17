import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { IwsService } from '../iws.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { Subject, takeUntil, timer } from 'rxjs';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';

@Component({
  selector: 'app-iws-initiator',
  standalone: false,
  templateUrl: './iws-initiator.component.html',
  styleUrl: './iws-initiator.component.scss'
})
export class IwsInitiatorComponent implements OnInit {
  public InstrumentForm: FormGroup;
  public pageData: any;
  public headerData: any;
  public isLoading: boolean;
  public disableButtons = false;
  public comments: string;
  public headerRequestBody: any;
  public nextStageListData: any;
  public instrumrntInfo: any;
  public parameterInfo: any;
  cumList: any;
  public displayedColumns: any[] = [];
  public selectedDialogData: any;
  destroy$ = new Subject<void>();
  parameterNo: number = 0;
  setPointNo: number = 0;
  parameterName: any;
  parameterCode: any;
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
    this.onLoadInstrumentInput();
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
          parameterCode: '',
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
            parameterCode: '',
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
          parameterCode: '',
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
    statistics.minimum = Math.min(...values);
    statistics.maximum = Math.max(...values);
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
    const qualitativeRecordList: any[] = [];
    const qpsrRecordList: any[] = [];
    const qtmpRecordList: any[] = [];

    this.qualitativeParameters.forEach((element: any) => {
      element.setPoints.forEach((ele: any) => {
        qualitativeRecordList.push({
          uc0001: null,
          ff0001: element.qualitativeparameterNo,
          // ff0001:"string",
          ff0002: ele.qualitativeSetPoints,
          ff0003: ele.qualitativePassLimit,
          ff0004: 0,
          ff0005: ele.parameterCode,
          createdby: this.cookieService.get('userId'),
          status: 0,
          comments: this.comments
        });
      });
    });

    this.parameters.forEach((parameter: any) => {
      parameter.setPoints.forEach((sp: any) => {
        qpsrRecordList.push({
          uc0001: null,
          ff0001: parameter.parameterNo,
          // ff0001:"string",
          ff0002: parameter.parameterName,
          ff0003: sp.setPoint,
          ff0004: sp.min,
          ff0005: sp.max,
          ff0006: sp.uom,
          ff0007: sp.result,
          ff0008: sp.passLimit,
          ff0009: parameter.setPointNo,
          ff0010: sp.parameterCode,
          lc0001: "string",
          lc0002: "string",
          lc0003: "string",
          lc0004: "string",
          lc0005: "string",
          lc0006: "string",
          createdby: this.cookieService.get('userId'),
          status: 0,
          comments: this.comments
        });

      });

    });

    this.quantitativeParameters.forEach((parameter: any) => {

      parameter.setPoints.forEach((sp: any) => {

        const qtmpObj: any = {
          uc0001: null,
          ff0001: parameter.quantitativeParameterNo,
          // ff0001:"string",
          ff0002: parameter.quantitativeParameterName,
          ff0003: parameter.quantitativeSetPointNo,
          ff0004: sp.setPoint,
          ff0005: sp.minimum,
          ff0006: sp.maximum,
          ff0007: sp.average,
          ff0008: sp.standardDeviation,
          ff0009: sp.relativeStandardDeviation,
          ff0010: sp.result,
          ff0011: sp.passLimit,
          ff0012: sp.uom,
          ff0013: sp.passLimitMin,
          ff0014: sp.passLimitMax,
          ff0015: sp.averageLower,
          ff0016: sp.averageUpper,
          ff0017: sp.quantitativeStandardDeviation,
          ff0018: sp.quantitativeRelativeStandardDeviation,
          ff0019: sp.readings,
          // ff0020: sp.readingValues,
          ff0020: sp.parameterCode,
          lc0001: "string",
          lc0002: "string",
          lc0003: "string",
          lc0004: "string",
          lc0005: "string",
          lc0006: "string",
          createdby: this.cookieService.get('userId'),
          status: 0,
          comments: this.comments
        };
        if (sp.readingValues && sp.readingValues.length > 0) {
          sp.readingValues.forEach((reading: any, index: number) => {
            const fieldNo = 21 + index;
            const fieldName = 'ff' + fieldNo.toString().padStart(4, "0");
            qtmpObj[fieldName] = reading.value;
          });
        }
        qtmpRecordList.push(qtmpObj);
      });
    });

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
      "qpsrRecordList": qpsrRecordList,
      "qtmpRecordList": qtmpRecordList,
      "qpmrRecordList": [
        {
          uc0001: null,
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
      "anyListNonEmpty": true
    };
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
  onLoadInstrumentCode() {
    let unitCode = this.cookieService.get('buCode');
    this.iwsSwervice.getAllInstrmentsList(unitCode).subscribe((data: any) => {
      this.instrumrntInfo = data.data;
    });
  }
  onLoadInstrumentInput() {
    let unitCode = this.cookieService.get('buCode');
    this.iwsSwervice.getDropDownDeptList(unitCode).subscribe((data: any) => {
      this.parameterInfo = data.data.calperList;
      this.cumList = data.data.cumList;


    });
  }
  onChangeParameterCode(sp: any) {
    if (!sp.parameterCode) {
      return;
    } else {
      this.isCategorySuccess = false;
      let categoryCurrentValue = this.InstrumentForm.controls['parameterCode'].value;
      this.parameterInfo.forEach((elements) => {
        if (elements.buTypeCode == categoryCurrentValue) {
          this.isCategorySuccess = true;
        }
      });
      if (this.isCategorySuccess == false) {
        this.InstrumentForm.controls['parameterCode'].setErrors({ incorrect: true });
        this.openParameterLOV(sp);
      }
    }
  }

  openParameterLOV(sp: any) {
    this.displayedColumns = [
      { field: 'name', title: 'Parameter Name' },
      { field: 'code', title: 'Parameter Code' }
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '700px',
      data: {
        dialogTitle: 'Parameter Information',
        dialogColumns: this.displayedColumns,
        dialogData: this.parameterInfo,
        lovName: 'parameterList'
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result) {
        this.selectedDialogData = result.data;
        sp.parameterCode = this.selectedDialogData.name
      }
    });
  }

   onChangeUOMCode(sp: any) {
    if (!sp.uom) {
      return;
    } else {
      this.isCategorySuccess = false;
      let categoryCurrentValue = this.InstrumentForm.controls['uom'].value;
      this.cumList.forEach((elements) => {
        if (elements.buTypeCode == categoryCurrentValue) {
          this.isCategorySuccess = true;
        }
      });
      if (this.isCategorySuccess == false) {
        this.InstrumentForm.controls['uom'].setErrors({ incorrect: true });
        this.openUOMLOV(sp);
      }
    }
  }

  openUOMLOV(sp: any) {
    this.displayedColumns = [
      { field: 'cuName', title: 'UOM Name' },
      { field: 'cuCode', title: 'UOM Code' }
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '700px',
      data: {
        dialogTitle: 'Parameter Information',
        dialogColumns: this.displayedColumns,
        dialogData: this.cumList,
        lovName: 'parameterList'
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result) {
        this.selectedDialogData = result.data;
        sp.uom = this.selectedDialogData.cuName
      }
    });
  }
  isCategorySuccess: boolean;
  onChangeInstrumentCode() {
    if (this.InstrumentForm.controls['instrumentCode'].value == '') {
      this.InstrumentForm.controls['instrumentCode'].setValue('');
    } else {
      this.isCategorySuccess = false;
      let categoryCurrentValue = this.InstrumentForm.controls['instrumentCode'].value;
      this.instrumrntInfo.forEach((elements) => {
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
        dialogData: this.instrumrntInfo,
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
   onChangeUOM() {
    if (this.InstrumentForm.controls['uom'].value == '') {
      this.InstrumentForm.controls['uom'].setValue('');
      this.isCategorySuccess = false;
      let statusCurrentValue = this.InstrumentForm.controls['uom'].value;
      this.cumList.forEach((elements) => {
        if (elements.productNO == statusCurrentValue) {
          this.isCategorySuccess = true;
        }
      });
      if (this.isCategorySuccess == false) {
        this.InstrumentForm.controls['uom'].setErrors({ incorrect: true });
        this.openUOMListLOV();
      }
    }
  }
 
   openUOMListLOV() {
    this.displayedColumns = [
      { field: 'cuCode', title: 'Parameter No' },
      { field: 'cuName', title: 'Parameter Code' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Calper List',
        dialogColumns: this.displayedColumns,
        dialogData: this.cumList,
        lovName: 'deptCodeList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.InstrumentForm.controls['uom'].setValue(
          this.selectedDialogData.cuName
        );      
      }
    });
  }

}
