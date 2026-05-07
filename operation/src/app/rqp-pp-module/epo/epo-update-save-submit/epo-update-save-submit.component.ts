import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Subject, timer, takeUntil } from 'rxjs';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { MessageService } from 'src/app/service/message.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { PaymentTermsCodeList, DataModel } from '../../models/models';
import { EpoService } from '../epo.service';
import { StockListEpoComponent } from '../../pp-common/stock-list-epo/stock-list-epo.component';
import { PpService } from '../../pp.service';

@Component({
  selector: 'app-epo-update-save-submit',
  standalone: false,
  templateUrl: './epo-update-save-submit.component.html',
  styleUrl: './epo-update-save-submit.component.scss'
})
export class EpoUpdateSaveSubmitComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public ff0001: any;
  public pageData: any;
  public isReadonly: boolean;
  public ViewDetailForm: FormGroup;
  public QuotationForm: FormGroup;
  public FooterForm: FormGroup;
  public isLoading: boolean;
  public ff0003: any;
  public ff0005: number;
  public headerRequestBody: any;
  public headerData: any;
  public comments: string;
  //pageData:any;
  public isHeaderLoad = false;
  public requestNoID: any;
  public indexList: any;
  public unitCodeData: any;
  public dataSource: any;
  public reviewCommentsData: any;
  public displayedColumns: any;
  public selectedDialogData: any;
  public stockList = [];
  public nextStageListData: any;
  public previousStageListData: any;
  public SGST: number;
  public CGST: number;
  public IGST: number;
  public currentComments: any;
  public qtItemListdataSource: any;
  public previousList: any;
  public discoutAmount: number;
  public totalDisAmt = 0;
  public afterDisAmt = 0;
  public totalAmt = 0;
  public totalGst = 0;
  public salesUnitCode: any;
  public $destroy = new Subject();
  public buttonHide = true;
  public destroy$ = new Subject();
  public paymentTermsCodeList: any;
  public paymentCodeList: MatTableDataSource<PaymentTermsCodeList> =
    new MatTableDataSource<PaymentTermsCodeList>();
  paymentCodeCloumns: string[] = ['ff0001', 'ff0002'];

  public resviewCommentsDisplayColumn: string[] = [
    'createdby',
    'ff0003',
    'ff0005',
    'comments',
  ];

  constructor(
    public route: ActivatedRoute,
    private epoService: EpoService,
    private ppService: PpService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private lifeCycleDataService: LifeCycleDataService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private toolbarService: ToolbarService,
    private router: Router,
    private remoteLoader: RemoteComponentLoaderService,
        private cookieService: CookieService,
    

  ) {
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
      quotationNo: [''],
    });
    this.FooterForm = this.fb.group({
      nextStage: [''],
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
      gethSNCode: [''],
      rate: [''],
      discountPercentage: [''],
      discount: [''],
      ff0013: [''],
      ff0014: [''],
      gst: [''],
      comments: [''],
      nextStage: [''],
      // collectiveNo: [''],
    });
  }

  ngOnInit(): void {
    this.isReadonly = true;
    this.route.queryParams.subscribe((params: any) => {
      this.ff0003 = params.ff0003;
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
        comments: params.comments,
      };
      this.isHeaderLoad = true;
      this.ff0001 = params.uc0001;
      this.ff0005 = params.ff0007;
    });
    if (this.ff0001) {
      //this.onReviewData();
      //this.onQTList();
      // this.onQTIndexList();
    }
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();

    this.onLoadNextStageData();
    this.onLoadInputFieldValue();
  }

  onLoadInputFieldValue() {
    this.isLoading = true;
    this.ppService.getInputValue(this.cookieService.get('buCode')).subscribe((data: any) => {
      this.paymentTermsCodeList = data.data.paymentTermsMasterList;
      this.salesUnitCode = data.data.suUnitList;
      this.isLoading = false;
    });
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
  public paymentTermsCode() {
    this.displayedColumns = [
      { field: 'paymentCode', title: 'Code' },
      { field: 'paymentName', title: 'Description' },
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
          .geyPaymentTermsList(this.QuotationForm.get('paymentTermsCode').value)
          .subscribe((data: DataModel) => {
            this.paymentCodeList = new MatTableDataSource(data.data);
            // this.paymentCodeList.data = data.data;
            // this.paymentCodeList.sort = this.sort;
          });

        // this.onViewDetails();
      }
    });
  }

  public getHeaderData(pageData: any): void {
    this.headerData = pageData;
    this.onGetRequestNo();
    // this.onReviewData();
  }

  public onGetRequestNo() {
    this.epoService
      .getResquestNoID(this.ff0001, this.headerData.lcnum)
      .subscribe((data: any) => {
        this.requestNoID = data.data[0].uc0001;
        if (this.requestNoID) {
          this.onQTIndexList();
          setTimeout(() => {
            this.onQTList();
          }, 1000);
        }
      });
  }

  private getDate(value: string): Date {
    const dateString = value.slice(0, 10);
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]) - 1; // Month is zero-indexed
    const day = parseInt(dateParts[0]);
    const myDate = new Date(year, month, day);
    return myDate;
  }
  public onQTIndexList(): void {
    this.epoService
      .getQTIndexList(this.requestNoID)
      .subscribe((data: any) => {
        this.indexList = data.data[0];
        if (this.indexList) {
          this.ViewDetailForm.setValue({
            orgUnitCode: this.indexList.ff0001,
            salesUnitCode: this.indexList.ff0002,
            quotationNo: this.indexList.uc0001,
          });
          this.QuotationForm.patchValue({
            deliveryDate: this.getDate(this.indexList.ff0008),
            quotationValidDate: this.getDate(this.indexList.ff0005),
            paymentTermsCode: this.indexList.ff0007,
          });

          this.ppService
            .geyPaymentTermsList(this.indexList.ff0007)
            .subscribe((data: DataModel) => {
              this.paymentCodeList.data = data.data;
              this.paymentCodeList.sort = this.sort;
            });
          this.checkUnitCode();
        }
      });
  }

  public checkUnitCode(): void {
    this.ppService
      .getUnitCodeDetail(
        this.ff0003,
        this.ViewDetailForm.controls['salesUnitCode'].value
      )
      .subscribe((data: any) => {
        this.unitCodeData = data.data.content;
        this.setGSTData(this.unitCodeData);
      });
  }

  // public onReviewData(): void {
  //   this.sdService
  //     .onReviewData(this.ff0001, this.headerData.lcnum)
  //     .subscribe((data: any) => {
  //       this.reviewCommentsData = data.data;
  //       this.dataSource = new MatTableDataSource(this.reviewCommentsData);
  //       //this.dataSource.sort=this.sort;
  //     });
  // }
  public onRequestVersion(row) {
    return row.ff0005 + '.' + row.ff0006 + '.' + row.ff0007 + '.' + row.ff0008;
  }

  public getCommentsData(event: any): void {
    this.currentComments = event;
  }
  public addNewRow() {
    const dialogRef = this.dialog.open(StockListEpoComponent, {
      minWidth: '80%',
      data: {
        type: 'List',
        data: this.ViewDetailForm.controls['orgUnitCode'].value,
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

  public addSelectedRows(selectedRow: any) {
    selectedRow.data.forEach((elements) => {
      let getPriceCode: string = elements.ff0015;
      let getProductCode: string = elements.ff0015;
      let getProductName: string = elements.ff0003;
      let getQuantity: number = elements.ff0004;
      let getProductNumber: string = elements.ff0002;
      let getGstCode: string = elements.ff0006;
      let getRate: number = elements.ff0007;
      let getDiscountPercentage: number = elements.ff0008;
      let getDiscount: number = (elements.ff0007 * elements.ff0008) / 100;
      let getdiscountedRate: number = getRate - getDiscount;
      let getdiscountedAmount: number = getDiscount * getQuantity;
      let getAfterdiscountRate: number =
        getRate * getQuantity - getDiscount * getQuantity;
      let getGST: number = elements.ff0012;
      let getGstAmount: number = (getAfterdiscountRate * getGST) / 100;
      let getFinalPrice: number = getAfterdiscountRate + getGstAmount;

      this.totalDisAmt += getdiscountedAmount + this.indexList.ff0016;
      this.afterDisAmt += getAfterdiscountRate + this.indexList.ff0011;
      this.totalAmt += getFinalPrice;
      this.totalGst += getGstAmount;

      this.stockList.push({
        quotationNo: '',
        poNumber: getProductNumber,
        poDate: new Date(),
        deliveryDate: new Date(),
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
        //'sumOfTotalDisc':num,
      });
    });
    this.onCalTotalValue();
  }

  public onQTList() {
    this.epoService
      .onQTList(this.requestNoID)
      .subscribe((data: any) => {
        this.previousList = data.data;
        this.previousList.forEach((elements) => {
          const getproductCode: string = elements.ff0002;
          const getProductName: string = elements.ff0003;
          const getQuantity: number = elements.ff0004;
          const getPack: string = elements.ff0005;
          const getGSTCode: string = elements.ff0006;
          const getRate: number = elements.ff0007;
          const getDiscountPercentage: number = elements.ff0008;
          const getDiscountAmount: number = elements.ff0009;
          const getAfterdiscountAmount: number = elements.ff0010;
          const getGstType: string = elements.ff0011;
          const getGst: number = elements.ff0012;
          const getGstAmount: number = elements.ff0013;
          const getFinalPrice: number = elements.ff0014;
          const getProductNumber: string = elements.ff0015;
          const getTotalDiscount: number = elements.ff0022;
          const getPriceCode: string = elements.ff0016;
          const getDiscountedRate: number = elements.ff0023;
          this.stockList.push({
            itemNo: elements.uc0001,
            quotationNo: ' ',
            poNumber: elements.aff0001,
            poDate: moment(new Date()).format('DD-MM-YYYY HH:mm:ss.SSS'),
            deliveryDate: moment(new Date()).format('DD-MM-YYYY HH:mm:ss.SSS'),
            productCode: getproductCode,
            productName: getProductName,
            quantity: getQuantity,
            pack: getPack,
            rate: getRate,
            discountPercentage: getDiscountPercentage,
            discountAmount: getDiscountAmount,
            totalDiscount: getTotalDiscount,
            gstType: getGstType,
            gst: getGst,
            gstAmount: getGstAmount,
            finalPrice: getFinalPrice,
            productNumber: getProductNumber,
            afterdiscountAmount: getAfterdiscountAmount,
            priceCode: getPriceCode,
            gstcode: getGSTCode,
            discountedRate: getDiscountedRate,
            batchNumber: elements.bff0011,
            mfgDate: moment(elements.bff0012).format('DD-MM-YYYY HH:mm:ss.SSS'),
            expDate: moment(elements.bff0013).format('DD-MM-YYYY HH:mm:ss.SSS'),
          });
        });
        this.onCalTotalValue();
      });
  }
  public deleteTodo(id: number): void {
    this.stockList.splice(id, 1);
    this.stockList = [...this.stockList];
    this.onCalTotalValue();
  }

  public onCalTotalValue(): void {
    let totalDiscountAmount = 0;
    let afterDiscountAmount = 0;
    let totalAmountWithGST = 0;
    let totalGstAmount = 0;
    this.stockList.forEach((ele) => {
      if (ele.totalDiscount > 0) {
        totalDiscountAmount = totalDiscountAmount + ele.totalDiscount;
      } else {
        totalDiscountAmount = this.indexList.ff0011;
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
    this.QuotationForm.controls['quantity'].setValue(totalDiscountAmount);
    this.totalDisAmt = totalDiscountAmount;
    this.QuotationForm.controls['ff0008'].setValue(afterDiscountAmount);
    this.afterDisAmt = afterDiscountAmount;
    this.QuotationForm.controls['ff0013'].setValue(totalAmountWithGST);
    this.totalAmt = totalAmountWithGST;
    this.setGSTData(this.unitCodeData);
  }

  public setGSTData(data) {
    if (data[0].ff0014 == data[1].ff0014) {
      this.CGST = this.totalGst / 2;
      this.SGST = this.totalGst / 2;
      this.IGST = 0;
    } else {
      this.IGST = this.totalGst;
      this.SGST = 0;
      this.CGST = 0;
    }
  }
  /****************************************** VALIDATION *******************************/
  public onCalAllFieldAmount(idx): void {
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

      this.stockList[idx].discountAmount = Number(
        (this.stockList[idx].rate * this.stockList[idx].discountPercentage) /
          100
      );
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
  openSalesUnitLov() {
    this.displayedColumns = [
      { field: 'suunitcode', title: 'Code' },
      { field: 'suunitname', title: 'Description' },
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
  public onLoadNextStageData(): void {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      lcStage: this.toolbarService.currentStage,
    };
    this.ppService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
      this.previousStageListData = data.data.pstage;
    });
  }

  public openNextStageLov(): void {
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Next Stage',
        dialogColumns: this.displayedColumns,
        dialogData: this.nextStageListData,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.FooterForm.controls['nextStage'].setValue(result.data.stage);
      }
    });
  }

  /***********************************SAVE UPDATE API *************************************/
  public onSaveUpdate(btnStatus: any): void {
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
      deliveryOrderItemList: this.stockList,
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcrqNumber: this.headerData.requestNo,
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        lcRole: this.headerData.role,
        stage2: 0,
        createdBy: this.headerData.createdby,
        comments: this.comments,
        draft: draftValue,
      },
      indexNo: String(this.stockList[0].itemNo).split('/')[0],
      saleUnitCode: this.ViewDetailForm.controls['salesUnitCode'].value,
      quotationValidDate: moment(
        this.QuotationForm.controls['quotationValidDate'].value
      ).format('DD-MM-YYYY HH:mm:ss.SSS'),
      deliveryDate: moment(
        this.QuotationForm.controls['deliveryDate'].value
      ).format('DD-MM-YYYY HH:mm:ss.SSS'),
      paymentTermsCode: this.QuotationForm.controls['paymentTermsCode'].value,
      subTotalAmount: 1000000,
      discountAmount: this.totalDisAmt,
      discountedSubTotalAmount: Number(this.afterDisAmt).toFixed(2),
      sgst: this.SGST,
      cgst: this.CGST,
      igst: this.IGST,
      totalGST: this.totalGst,
      finalTotalAmount: this.totalAmt,
      orderStatus: this.headerData.modulecode,
      quotationStage: this.headerData.modulecode,
      quotationNumber: '',
      // collectiveNumber: this.QuotationForm.controls['collectiveNo'].value,
      poNumber: '',
      poDate: moment(new Date()).format('DD-MM-YYYY HH:mm:ss.SSS'),
      saleOrderNumber: '',
      deliveryOrderNumber: '',
      discountPercentage: '',
      // deliveryOrderItemList: '',
    };
    // if(btnStatus==1){
    //   requestBody.draft=false;
    // }else{
    //   requestBody.draft=true;
    // }
    this.isLoading = true;
    this.epoService
      .onSaveUpdate(requestBody)
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.buttonHide = false;
          this.notificationService.showSuccess(data.status, () => { });
        }
        this.isLoading = false;

        timer(5000)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.router.navigate(['/rqpadminui/sd/do-home']);
          });
      });
  }

  /*************************************ONSUBMIT ******************************************/
  async onSubmit(btnStatus: any) {
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
  ngOnDestroy(): void {
    this.$destroy.next(undefined);
    this.$destroy.complete();
  }
}

