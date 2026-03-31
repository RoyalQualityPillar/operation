import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil, timer } from 'rxjs';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { MessageService } from 'src/app/service/message.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { EpoService } from '../epo.service';
import { DataModel, PaymentTermsCodeList } from '../../models/models';
import { Router } from '@angular/router';
import { StockListEpoComponent } from '../../pp-common/stock-list-epo/stock-list-epo.component';
import { PpService } from '../../pp.service';

@Component({
  selector: 'app-epo-initiator',
  standalone: false,
  templateUrl: './epo-initiator.component.html',
  styleUrl: './epo-initiator.component.scss'
})
export class EpoInitiatorComponent implements OnInit, OnDestroy {
  QuotationForm: FormGroup;
  HeaderForm: FormGroup;
  ViewDetailForm: FormGroup;
  isReadonly = true;
  comments: string;
  public pageData: any;
  paymentTermsCodeList: any;
  destroy$ = new Subject<void>();
  public buttonHide = true;
  paymentCodeList: MatTableDataSource<PaymentTermsCodeList> =
    new MatTableDataSource<PaymentTermsCodeList>();
  paymentCodeCloumns: string[] = ['ff0001', 'ff0002'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public fb: FormBuilder,
    private lifeCycleDataService: LifeCycleDataService,
    public dialog: MatDialog,
    private toolbarService: ToolbarService,
    private epoService: EpoService,
    private ppService: PpService,
    public messageService: MessageService,
    private notificationService: NotificationService,
    private router: Router,
    private remoteLoader: RemoteComponentLoaderService,
    private cookieService: CookieService,
    

  ) {
    this.HeaderForm = this.fb.group({
      oucode: ['', Validators.required],
      lc0001: ['', Validators.required],
      lc0002: ['', Validators.required],
      lc0003: ['', Validators.required],
    });
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
    });
    this.QuotationForm = this.fb.group({
      uc0001: [''],
      ff0001: [''],
      ff0002: [''],
      quotationValidDate: [''],
      deliveryDate: [''],
      paymentTermsCode: [''],
      productCode: [''],
      productName: [''],
      quantity: [''],
      ff0008: [''],
      gstcode: [''],
      rate: [''],
      discountPercentage: [''],
      discount: [''],
      ff0013: [''],
      ff0014: [''],
      gst: [''],
      comments: [''],
      nextStage: [''],
    });
  }

  companyInfoBody: any;
  orgUnitCode: any;
  salesUnitCode: any;
  isLoading = false;
  isValueSelected = false;
  nextStageListData: any;
  headerRequestBody: any;
  ngOnInit(): void {
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
    };
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.companyInfoBody = {
      orgUnitCode: '',
      salesUnitCode: '',
    };
    
    this.onLoadInputFieldValue();
    this.onLoadNextStageData();
  }
  public handleCommentsForm(event: any) {
    console.log(event);
    this.comments = event.comments;
  }
  public paymentTermsCode() {
    this.displayedColumns = [
      { field: 'paymentCode', title: 'Payment Term Code' },
      { field: 'paymentName', title: 'Payment Term Name' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Payment Terms Code',
        dialogColumns: this.displayedColumns,
        dialogData: this.paymentTermsCodeList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        // this.isValueSelected=true;
        this.QuotationForm.controls['paymentTermsCode'].setValue(
          result.data.paymentCode
        );

        this.ppService
          .geyPaymentTermsList(result.data.paymentCode)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: DataModel) => {
            this.paymentCodeList.data = data.data;
            this.paymentCodeList.sort = this.sort;
          });
        this.onViewDetails();
      }
    });
  }
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      lcStage: this.toolbarService.currentStage,
    };
    this.ppService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
  headerData: any;
  getHeaderData(event: any) {
    console.log(event);
    this.headerData = event;
    this.ViewDetailForm.controls['orgUnitCode'].setValue(event.unitcode);
  }
  onLoadInputFieldValue() {
    this.isLoading = true;
    this.ppService.getInputValue(this.cookieService.get('buCode')).subscribe((data: any) => {
      console.log(data);
      this.orgUnitCode = data.data.buUnitList;
      this.salesUnitCode = data.data.suUnitList;
      this.paymentTermsCodeList = data.data.paymentTermsMasterList;
      this.isLoading = false;
    });
  }
  addNewRow() {
    const dialogRef = this.dialog.open(StockListEpoComponent, {
      minWidth: '80%',
      data: {
        type: 'List',
        data: this.ViewDetailForm.controls['orgUnitCode'].value,
        salesUnitCode: this.ViewDetailForm.controls['salesUnitCode'].value,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != true) {
        if (result.data.length > 0) {
          this.addSelectedRows(result);
        }
      }
    });
  }
  stockList = [];
  addSelectedRows(selectedRow: any) {
    console.log(selectedRow);
    selectedRow.data.forEach((elements, index: number) => {
      console.log(elements);
      let getPriceCode = elements.ff0016;
      let getProductCode = elements.ff0002;
      let getProductName = elements.ff0003;
      let getQuantity = elements.ff0004;
      let getProductNumber = elements.ff0015;
      let getGstCode = elements.ff0006;
      let getRate = elements.ff0007;
      let getDiscountPercentage = elements.ff0008;
      let getDiscount = (elements.ff0007 * elements.ff0008) / 100;
      let getdiscountedRate = getRate - getDiscount;
      let getdiscountedAmount = getDiscount * getQuantity;
      let getAfterdiscountRate =
        getRate * getQuantity - getDiscount * getQuantity;
      let getGST = elements.ff0012;
      let getGstAmount = (getAfterdiscountRate * getGST) / 100;
      let getFinalPrice = getAfterdiscountRate + getGstAmount;

      this.totalDisAmt += getdiscountedAmount;
      this.afterDisAmt += getAfterdiscountRate;
      this.totalAmt += getFinalPrice;
      this.totalGst += getGstAmount;

      this.stockList.push({
        quotationNo: '',
        poNumber: getProductNumber,
        poDate: moment(new Date()).format('DD-MM-YYYY HH:mm:ss.SSS'),
        deliveryDate: moment(
          this.QuotationForm.controls['deliveryDate'].value
        ).format('DD-MM-YYYY HH:mm:ss.SSS'),
        productCode: getProductCode,
        productName: getProductName,
        quantity: getQuantity,
        pack: elements.ff0005,
        rate: getRate,
        discountPercentage: getDiscountPercentage,
        discountAmount: getDiscount,
        totalDiscount: getdiscountedAmount,
        gstType: elements.ff0012,
        gst: getGST,
        gstAmount: getGstAmount,
        finalPrice: getFinalPrice,
        productNumber: getProductNumber,
        afterdiscountAmount: getAfterdiscountRate,
        priceCode: getPriceCode,
        gstcode: getGstCode,
        discountedRate: getdiscountedRate,
        pc0001: elements.uc0001,
      });
    });

    this.onCalTotalValue();
  }
  deleteTodo(id: number) {
    this.stockList.splice(id, 1);
    this.stockList = [...this.stockList];
    console.log(id + 'silindi');
    this.onCalTotalValue();
  }
  discoutAmount: number;
  totalDisAmt = 0;
  afterDisAmt = 0;
  totalAmt = 0;
  totalGst = 0;
  onCalTotalValue() {
    let totalDiscountAmount = 0;
    let afterDiscountAmount = 0;
    let totalAmountWithGST = 0;
    let totalGstAmount = 0;
    console.log(this.stockList);
    this.stockList.forEach((ele) => {
      if (ele.totalDiscount > 0) {
        totalDiscountAmount = totalDiscountAmount + ele.totalDiscount;
      }
      if (ele.afterdiscountAmount > 0) {
        afterDiscountAmount = afterDiscountAmount + ele.afterdiscountAmount;
      }
      if (ele.finalPrice > 0) {
        totalAmountWithGST = totalAmountWithGST + ele.finalPrice;
      }
      if (ele.gstAmount) {
        totalGstAmount = totalGstAmount + ele.gstAmount;
      }
    });
    this.totalGst = totalGstAmount;
    console.log(this.totalGst);
    console.log(totalDiscountAmount);
    this.QuotationForm.controls['quantity'].setValue(totalDiscountAmount);
    this.totalDisAmt = totalDiscountAmount;
    this.QuotationForm.controls['ff0008'].setValue(afterDiscountAmount);
    this.afterDisAmt = afterDiscountAmount;
    this.QuotationForm.controls['ff0013'].setValue(totalAmountWithGST);
    this.totalAmt = totalAmountWithGST;
    this.setGSTData(this.unitCodeData);
  }
  isProductInfoSuccess = false;
  onViewDetails() {
    //todo
    if (this.ViewDetailForm.value) {
      if (
        this.ViewDetailForm.controls['orgUnitCode'].value != '' &&
        this.ViewDetailForm.controls['salesUnitCode'].value != ''
      ) {
        this.checkUnitCode();
      }
    }
  }
  unitCodeData: any;
  checkUnitCode() {
    this.ppService
      .getUnitCodeDetail(
        this.ViewDetailForm.controls['orgUnitCode'].value,
        this.ViewDetailForm.controls['salesUnitCode'].value
      )
      .subscribe((data: any) => {
        console.log(data);
        this.unitCodeData = data.data.content;
        this.setGSTData(this.unitCodeData);
      });
  }
  SGST: any;
  CGST: any;
  IGST: any;
  setGSTData(data) {
    if (data[0].ff0013 == data[1].ff0014) {
      this.CGST = this.totalGst / 2;
      this.SGST = this.totalGst / 2;
      this.IGST = 0;
    } else {
      this.IGST = this.totalGst;
      this.SGST = 0;
      this.CGST = 0;
    }
  }
  /**************** VALIDATION ********************************************/
  onChangeSGST() {
    let sgst: number = this.QuotationForm.controls['gstcode'].value;
    let cgst: number = this.QuotationForm.controls['rate'].value;
    let totalGst: number = sgst + cgst;
    this.QuotationForm.controls['discountPercentage'].setValue(totalGst);
    this.QuotationForm.controls['discount'].setValue(totalGst);
  }

  onChangeCGST() {
    let sgst = this.QuotationForm.controls['gstcode'].value;
    let cgst = this.QuotationForm.controls['rate'].value;
    let totalGst = sgst + cgst;
    this.QuotationForm.controls['discountPercentage'].setValue(totalGst);
    this.QuotationForm.controls['discount'].setValue(totalGst);
  }

  /****************************************** VALIDATION *******************************/
  onCalAllFieldAmount(idx) {
    if (this.stockList[idx].quantity != null) {
      if (
        Number.isNaN(this.stockList[idx].discountAmount) ||
        this.stockList[idx].discountAmount == undefined
      ) {
        this.stockList[idx].discountAmount = 0;
      }
      if (
        Number.isNaN(this.stockList[idx].discountPercentage) ||
        this.stockList[idx].discountPercentage == undefined
      ) {
        this.stockList[idx].discountPercentage = 0;
      }
      if (
        Number.isNaN(this.stockList[idx].rate) ||
        this.stockList[idx].rate == undefined
      ) {
        this.stockList[idx].rate = 0;
      }
      if (
        Number.isNaN(this.stockList[idx].afterdiscountAmount) ||
        this.stockList[idx].afterdiscountAmount == undefined
      ) {
        this.stockList[idx].afterdiscountAmount = 0;
      }
      if (
        Number.isNaN(this.stockList[idx].gstAmount) ||
        this.stockList[idx].gstAmount == undefined
      ) {
        this.stockList[idx].gstAmount = 0;
      }
      if (
        Number.isNaN(this.stockList[idx].gst) ||
        this.stockList[idx].gst == undefined
      ) {
        this.stockList[idx].gst = 0;
      }
      this.stockList[idx].discountAmount =
        (this.stockList[idx].rate * this.stockList[idx].discountPercentage) /
        100;
      this.stockList[idx].discountedRate =
        this.stockList[idx].rate - this.stockList[idx].discountAmount;
      this.stockList[idx].totalDiscount =
        this.stockList[idx].discountAmount * this.stockList[idx].quantity;
      this.stockList[idx].afterdiscountAmount =
        this.stockList[idx].rate * this.stockList[idx].quantity -
        this.stockList[idx].discountAmount * this.stockList[idx].quantity;
      this.stockList[idx].gstAmount =
        (this.stockList[idx].afterdiscountAmount * this.stockList[idx].gst) /
        100;
      this.stockList[idx].finalPrice =
        this.stockList[idx].afterdiscountAmount + this.stockList[idx].gstAmount;
      this.onCalTotalValue();
    }
  }
  onChangeDiscountAmount(idx) {
    if (this.stockList[idx].discountPercentage != null) {
      this.stockList[idx].discountAmount =
        (this.stockList[idx].rate * this.stockList[idx].discountPercentage) /
        100;
      this.stockList[idx].totalDiscount =
        this.stockList[idx].discountAmount * this.stockList[idx].quantity;
      this.onChangeAfterDiscount(idx);
    }
  }
  onChangeAfterDiscount(idx) {
    if (Number.isNaN(this.stockList[idx].quantity)) {
      this.stockList[idx].quantity = 1;
    }
    if (Number.isNaN(this.stockList[idx].discountAmount)) {
      this.stockList[idx].discountAmount = 0;
    }
    if (
      Number.isNaN(this.stockList[idx].gstAmount) ||
      this.stockList[idx].gstAmount == undefined
    ) {
      this.stockList[idx].gstAmount = 0;
    }
    this.stockList[idx].afterdiscountAmount =
      this.stockList[idx].rate * this.stockList[idx].quantity -
      this.stockList[idx].discountAmount * this.stockList[idx].quantity;
    this.stockList[idx].finalPrice =
      this.stockList[idx].afterdiscountAmount + this.stockList[idx].gstAmount;
    this.onCalTotalValue();
  }

  onChangeQTY(idx) {
    if (this.stockList[idx].quantity != null) {
      if (
        Number.isNaN(this.stockList[idx].discountAmount) ||
        this.stockList[idx].discountAmount == undefined
      ) {
        this.stockList[idx].discountAmount = 0;
      }
      if (
        Number.isNaN(this.stockList[idx].discountPercentage) ||
        this.stockList[idx].discountPercentage == undefined
      ) {
        this.stockList[idx].discountPercentage = 0;
      }
      if (Number.isNaN(this.stockList[idx].rate)) {
        this.stockList[idx].rate = 0;
      }
      if (Number.isNaN(this.stockList[idx].afterdiscountAmount)) {
        this.stockList[idx].afterdiscountAmount = 0;
      }
      if (
        Number.isNaN(this.stockList[idx].gstAmount) ||
        this.stockList[idx].gstAmount == undefined
      ) {
        this.stockList[idx].gstAmount = 0;
      }
      this.stockList[idx].discountAmount =
        (this.stockList[idx].rate * this.stockList[idx].discountPercentage) /
        100;
      this.stockList[idx].totalDiscount =
        this.stockList[idx].discountAmount * this.stockList[idx].quantity;
      this.stockList[idx].afterdiscountAmount =
        this.stockList[idx].rate * this.stockList[idx].quantity -
        this.stockList[idx].discountAmount * this.stockList[idx].quantity;
      this.stockList[idx].finalPrice =
        this.stockList[idx].afterdiscountAmount + this.stockList[idx].gstAmount;
      this.onCalTotalValue();
    }
  }
  onChangeGST(idx) {
    if (this.stockList[idx].gst != null) {
      if (
        Number.isNaN(this.stockList[idx].afterdiscountAmount) ||
        this.stockList[idx].afterdiscountAmount == undefined
      ) {
        this.stockList[idx].afterdiscountAmount = 0;
      }
      this.stockList[idx].gstAmount =
        (this.stockList[idx].afterdiscountAmount * this.stockList[idx].gst) /
        100;
      this.stockList[idx].finalPrice =
        this.stockList[idx].afterdiscountAmount + this.stockList[idx].gstAmount;
      this.onCalTotalValue();
    }
  }

  /************************************* LOV ***********************************************/
  displayedColumns: any;
  selectedDialogData: any;
  openOrgUnitCodeLov() {
    this.displayedColumns = [
      { field: 'buunitcode', title: 'Code' },
      { field: 'buunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Organization Unit Code',
        dialogColumns: this.displayedColumns,
        dialogData: this.orgUnitCode,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.isValueSelected = true;
        this.ViewDetailForm.controls['orgUnitCode'].setValue(
          result.data.buunitcode
        );
        this.onViewDetails();
      }
    });
  }
  isPlantCodeSuccess: boolean;
  onChangeOrgUnitCode() {
    if (this.ViewDetailForm.controls['orgUnitCode'].value == '') {
      this.ViewDetailForm.controls['orgUnitCode'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.ViewDetailForm.controls['orgUnitCode'].value;
      this.isPlantCodeSuccess = false;
      this.orgUnitCode.forEach((elements) => {
        if (elements.buunitcode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
          this.onViewDetails();
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.ViewDetailForm.controls['orgUnitCode'].setErrors({
          incorrect: true,
        });
        this.openOrgUnitCodeLov();
      }
    }
  }
  openSalesUnitLov() {
    this.displayedColumns = [
      { field: 'suunitcode', title: 'Sales Unit Code' },
      { field: 'suunitname', title: 'Sales Unit Name' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Sales Unit Code',
        dialogColumns: this.displayedColumns,
        dialogData: this.salesUnitCode,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        // this.isValueSelected=true;
        this.ViewDetailForm.controls['salesUnitCode'].setValue(
          result.data.suunitcode
        );
        this.onViewDetails();
      }
    });
  }
  onChangeSalesUnitCode() {
    if (this.ViewDetailForm.controls['salesUnitCode'].value == '') {
      this.ViewDetailForm.controls['salesUnitCode'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.ViewDetailForm.controls['salesUnitCode'].value;
      this.isPlantCodeSuccess = false;
      this.orgUnitCode.forEach((elements) => {
        if (elements.suunitcode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
          this.onViewDetails();
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.ViewDetailForm.controls['salesUnitCode'].setErrors({
          incorrect: true,
        });
        this.openSalesUnitLov();
      }
    }
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
        dialogData: this.nextStageListData,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.QuotationForm.controls['nextStage'].setValue(result.data.stage);
      }
    });
  }
  onChangeNextStage() {}
  buRequestBody = {
    auc0001: '',
    buc0001: '',
  };
  onGetBuInfo() {
    this.epoService.getBuInfo(this.buRequestBody).subscribe((data) => {});
  }
  getBuInfo;
  /***********************************SAVE UPDATE API *************************************/
  onSaveUpdate(btnStatus: any) {
    console.log(btnStatus);
    if (
      this.QuotationForm.controls['nextStage'].value == '' ||
      this.QuotationForm.controls['nextStage'].value == undefined
    ) {
      this.QuotationForm.controls['nextStage'].setValue(0);
    }
    let quotationDate = this.QuotationForm.controls['quotationValidDate'].value;
    let requestBody: any;
    let draftValue: boolean;
    if (btnStatus == 1) {
      draftValue = false;
    } else {
      draftValue = true;
    }
    requestBody = {
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcrqNumber: '',
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        lcRole: this.headerData.role,
        stage2: 0,
        createdBy: this.headerData.createdby,
        comments: this.comments,
        draft: draftValue,
      },
      poNumber: '',
      poDate: moment(new Date()).format('DD-MM-YYYY HH:mm:ss.SSS'),
      saleUnitCode: this.ViewDetailForm.controls['salesUnitCode'].value,
      deliveryDate: moment(
        new Date(this.QuotationForm.controls['deliveryDate'].value)
      ).format('DD-MM-YYYY HH:mm:ss.SSS'),
      paymentTermsCode: this.QuotationForm.controls['paymentTermsCode'].value,
      subTotalAmount: 1000000,
      discountAmount: Number(this.totalDisAmt.toFixed(2)),
      discountedSubTotalAmount: this.afterDisAmt,
      sgst: this.SGST,
      cgst: this.CGST,
      igst: Number(this.IGST.toFixed(2)),
      totalGST: Number(this.totalGst.toFixed(2)),
      finalTotalAmount: Number(this.totalAmt.toFixed(2)),
      saleOrderNumber: '',
      orderStatus: this.headerData.modulecode,
      deliveryOrderItemList: this.stockList,
      quotationNumber: '',
      quotationValidDate: moment(
        new Date(this.QuotationForm.controls['quotationValidDate'].value)
      ).format('DD-MM-YYYY HH:mm:ss.SSS'),
    };

    console.log(requestBody);
    this.isLoading = true;
    this.epoService
      .onSaveUpdate(requestBody)
      .subscribe((data: any) => {
        // console.log(data)
        if (data.errorInfo != null) {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.buttonHide = false;
          this.notificationService.showSuccess(data.status, () => {
            console.log('Success Snackbar Closed');
          });
        }
        timer(5000)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.router.navigateByUrl('/rqpadminui/pp/epo-home');
          });
        this.isLoading = false;
      });
  }

  /*************************************ONSUBMIT ******************************************/
 async onSubmit(btnStatus: any) {
    console.log(btnStatus);
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
          this.onSaveUpdate('1');
        }
      }
    });
  }
 async onSaveConfirmation(btnStatus: any) {
    console.log(btnStatus);
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
          this.onSaveUpdate('0');
        }
      }
    });
  }
  onSubmitConfirmApi() {
    //todo
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
