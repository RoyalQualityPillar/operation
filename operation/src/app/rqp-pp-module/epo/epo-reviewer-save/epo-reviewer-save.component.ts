import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { MessageService } from 'src/app/service/message.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { PaymentTermsCodeList, DataModel } from '../../models/models';
import { PpService } from '../../pp.service';
import { EpoService } from '../epo.service';

@Component({
  selector: 'app-epo-reviewer-save',
  standalone: false,
  templateUrl: './epo-reviewer-save.component.html',
  styleUrl: './epo-reviewer-save.component.scss'
})
export class EpoReviewerSaveComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  public redirectUrl: string = '/rqpadminui/sd/do-home';
  isLoading = false;
  pageName = 'qt-review';
  FooterForm: FormGroup;
  ViewDetailForm: FormGroup;
  public comments: string;
  pageData: any;
  ff0001: any;
  requestNoID: any;
  headerRequestBody: any;
  isReadonly: boolean;
  public buttonHide = true;
  public userCurrentComments: any;
  public ff0005: number;
  destroy$ = new Subject<void>();
  paymentCodeList: MatTableDataSource<PaymentTermsCodeList> =
    new MatTableDataSource<PaymentTermsCodeList>();
  paymentCodeCloumns: string[] = ['ff0001', 'ff0002'];
  quotationForm = new FormGroup({
    quotationValidDate: new FormControl(''),
    deliveryDate: new FormControl(''),
    paymentTermsCode: new FormControl(''),
  });
  resviewCommentsDisplayColumn: string[] = [
    'createdby',
    'ff0003',
    'ff0005',
    'createdon',
    'comments',
  ];
  qtListDisplayColumn: string[] = [
    'ff0005',
    'ff0006',
    'ff0018',
    'ff0007',
    'ff0009',
    'ff0010',
    'ff0011',
    'ff0012',
    'ff0019',
    'ff0013',
    'ff0015',
    'ff0016',
    'ff0017',
  ];
  public commentForm: FormGroup = new FormGroup({
    comments: new FormControl(''),
    // nextStage: new FormControl(''),
  });
  public currentComments: any;
  constructor(
    public route: ActivatedRoute,
    public ppService: PpService,
    public lifeCycleDataService: LifeCycleDataService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private toolbarService: ToolbarService,
    public messageService: MessageService,
    public epoService: EpoService,
    private router: Router
  ) {
    this.FooterForm = this.fb.group({
      nextStage: [''],
      previousStage: [''],
    });
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
      quotationNo: [''],
    });
  }
  ff0003: any;
  ngOnInit(): void {
    this.isReadonly = true;
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      this.ff0003 = params.ff0003;
      this.pageData = {
        pageName: 'qt-review',
        pageType: 'update',
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
      this.ff0001 = params.uc0001;
      this.ff0005 = params.ff0007;
    });
    if (this.ff0001) {
      //this.onQTList();
      // this.onQTIndexList();
    }
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();

    this.onLoadNextStageData();
  }
  nextStageListData: any;
  previousStageListData: any;
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      lcStage: this.toolbarService.currentStage,
    };
    console.log(body);
    this.ppService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
      this.previousStageListData = data.data.pstage;
    });
  }
  public getCommentsData(event: any): void {
    this.userCurrentComments = event;
    console.log(event);
  }
  headerData: any;
  getHeaderData(event: any) {
    console.log(event);
    this.headerData = event;
    this.onGetRequestNo();
    // this.onReviewData();
  }
  dataSource: any;
  reviewCommentsData: any;
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
    console.log(event);
  }
  
  qtItemListdataSource: any;
  onQTList() {
    this.epoService
      .onQTList(this.requestNoID)
      .subscribe((data: any) => {
        console.log(data);
        //this.qtItemListdataSource=data;
        this.qtItemListdataSource = new MatTableDataSource(data.data);
      });
  }
  onRequestVersion(row) {
    return row.ff0005 + '.' + row.ff0006 + '.' + row.ff0007 + '.' + row.ff0008;
  }
  onGetRequestNo() {
    this.epoService
      .getResquestNoID(this.pageData.requestNo, this.headerData.lcnum)
      .subscribe((data: any) => {
        console.log(data);
        this.requestNoID = data.data[0].uc0001;
        if (this.requestNoID) {
          this.onQTList();
          this.onQTIndexList();
        }
      });
  }
  indexList: any;
  onQTIndexList() {
    this.epoService
      .getQTIndexList(this.requestNoID)
      .subscribe((data: any) => {
        console.log(data);
        this.indexList = data.data[0];
        if (this.indexList) {
          this.ViewDetailForm.controls['orgUnitCode'].setValue(
            this.indexList.ff0001
          );
          this.ViewDetailForm.controls['salesUnitCode'].setValue(
            this.indexList.ff0002
          );
          this.ViewDetailForm.controls['quotationNo'].setValue(
            this.indexList.uc0001
          );
          this.quotationForm.controls['quotationValidDate'].setValue(
            this.indexList.ff0005
          );
          this.quotationForm.controls['deliveryDate'].setValue(
            this.indexList.ff0008
          );
          this.quotationForm.controls['paymentTermsCode'].setValue(
            this.indexList.ff0007
          );

          this.ppService
            .geyPaymentTermsList(this.indexList.ff0007)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: DataModel) => {
              this.paymentCodeList.data = data.data;
              this.paymentCodeList.sort = this.sort;
            });
          this.checkUnitCode();
          this.checkUnitCode();
        }
      });
  }
  unitCodeData: any;
  checkUnitCode() {
    this.ppService
      .getUnitCodeDetail(
        this.ff0003,
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
  totalGst: any;
  setGSTData(data) {
    console.log(data);
    if (data[0]?.ff0014 == data[1]?.ff0014) {
      this.CGST = this.totalGst / 2;
      this.SGST = this.totalGst / 2;
      this.IGST = 0;
    } else {
      this.IGST = this.totalGst;
      this.SGST = 0;
      this.CGST = 0;
    }
  }
  displayedColumns: any;
  selectedDialogData: any;
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  //////////////////Common button bar ///////////////////////

  buttonConfig = [
    { label: 'Return', getPayload: () => this.calculateReturnPayload() },
    { label: 'Submit', getPayload: () => this.calculateReturnPayload() },
    { label: 'Cancel', getPayload: () => this.calculateReturnPayload() },
    { label: 'Comments', getPayload: () => this.calculateCommentsPayload() },
    // Add more buttons as needed
  ];

  calculateReturnPayload() {
    return {
      data: 'returnData',
      calculatedValue: this.headerData,
      commentsFieldData: this.userCurrentComments,
      pageData: this.pageData,
    };
  }
  //let params ={lcRequestnumber,lcnum,templateName,stage,userid,moduleCode};

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
    if (event.success && event.buttonName == 'Return') {
    }
    if (event.success && event.buttonName == 'Submit') {
    }
    if (event.success && event.buttonName == 'Comments') {
    }
    // if (event.success && event.buttonName == 'Cancel') {
    //   this.cancel();
  }
}
