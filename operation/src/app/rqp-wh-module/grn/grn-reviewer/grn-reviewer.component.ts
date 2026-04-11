import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { GrnService } from '../grn.service';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { getFileExtension } from 'src/app/common/removeEmptyStrings';

@Component({
  selector: 'app-grn-reviewer',
  standalone: false,
  templateUrl: './grn-reviewer.component.html',
  styleUrl: './grn-reviewer.component.scss'
})
export class GrnReviewerComponent implements OnInit {

  public redirectUrl: string = '/rqpoperationui/wh/sop-module-home-page';
  public MaterialRequirementForm: FormGroup;
  public MaterialLotRequirementForm: FormGroup;
  public GRNRequirementForm: FormGroup;
  public ContainerRequirementForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public list: any[] = [];
  public isLoading = false;
  public disableButtons = false;
  public ff0005: number;
  public ff0001: any;
  public lc0001: any;
  public lc0003:any;
  public ff0002:any;
  public nextStageListData: any;
  public headerRequestBody: any;
  public previousStageListData: any;
  public userCurrentComments: any;
  public goodsReceiptValue:any;
  public goodsReceiptPackValue:any;
  public grnAttachmentListData:any[] = [];
  public grnAttachmentListTableData:any;
  grnAttachListdisplayedColumns: string[] = [
    'uc0001',
    'ff0007',
    'createdby',
    'createdon',
    'ff0005',
    'removeRow',
  ];
  constructor(
    public fb: FormBuilder,
    private cookieService: CookieService,
    private lifeCycleDataService: LifeCycleDataService,
    private toolbarService: ToolbarService,
    private grnService: GrnService,
    private shareHostDataService: ShareHostDataService,
  ) {
    this.MaterialRequirementForm = fb.group({
      grnDate: [''],
      invoiceDate: [''],
      invoiceNo: ['']
    });
    this.ContainerRequirementForm = this.fb.group({
      containers: this.fb.array([this.createContainer()])
    });
    this.MaterialLotRequirementForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
    this.GRNRequirementForm = this.fb.group({
      comments: [''],
      stage2: [''],
      attachmentName: [''],
      documentName: [''],
      categoryTypes: [''],
      attachmenentCategoryTypes: [''],
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
      console.log(this.pageData);
      // });
    }
    if (this.ff0001) {
     this.getGRNRequestNo();
    }
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();
  }
  onLoadNextStageData() {
    let body: any;
    body = {
      // lcNumber: this.headerRequestBody.lifeCycleCode,
      //       lcStage: this.toolbarService.currentStage,

      //lcStage:this.headerRequestBody.stage
      lcNumber: this.shareHostDataService.lcNumber,
      lcStage: this.shareHostDataService.currentStage
    };
    this.grnService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
      this.previousStageListData = data.data.pstage;
      console.log(this.nextStageListData);
    });
  }  
  public getHeaderData(event: any) {
    this.headerData = event;
  }
  createContainer(): FormGroup {
    return this.fb.group({
      containerId: [''],
      weight: [''],
      weightUom: ['']
    });
  }
  createItem(): FormGroup {
    return this.fb.group({
      poNo: [''],
      materialCode: [''],
      materialName: [''],
      materialNo: [''],
      poQuantity: [''],
      uom: [''],
      vendorCode: [''],
      vendorBatchNo: [''],
      lotSize: [''],
      manfacuringDate: [''],
      expiryDate: [''],
      retestRequired: [''],
      noOfPacks: [''],
      packUOM: [''],
      inHouseBatchNo: [''],
      // storageLocation: [''],
      wharehouseName: [''],
      wharehouseNo: [''],
    });
  }
  get items(): FormArray {
    return this.MaterialLotRequirementForm.get('items') as FormArray;
  }
  get containers(): FormArray {
    return this.ContainerRequirementForm.get('containers') as FormArray;
  }
  getGRNRequestNo() {
    this.grnService.getResquestNoIDForGRN(this.ff0001, this.lc0001).subscribe((data: any) => {
this.lc0003 = data.data[0].lc0003;
if(this.lc0003){
this.getGoodsReceiptList(this.lc0003);
this.getGoodsReceiptPackList(this.lc0003);
this.getGRNAttachchmentList(this.lc0003);
}
    });
  }
  getGRNAttachchmentList(lc0003:any){
    // let modulecode = this.headerData.modulecode;
    // console.log(modulecode);
    this.grnService.getGRNAttachments(lc0003,this.ff0002).subscribe((data:any) => {
console.log(data);
   this.grnAttachmentListData = data.data;
        this.grnAttachmentListTableData = new MatTableDataSource(data.data);
        console.log(this.grnAttachmentListTableData)
    });
  }
  getGoodsReceiptList(lc0003:any){
this.grnService.getGoodsReceiptList(lc0003).subscribe((data:any) => {
  this.goodsReceiptValue = data.data;
const value = this.goodsReceiptValue[0];
  this.MaterialRequirementForm.patchValue({
    grnDate:value.ff0019,
    invoiceDate:value.ff0020,
    invoiceNo:value.ff0021
  });

 this.goodsReceiptValue.forEach((element:any, i:number) => {
 const item = this.items.at(i) as FormGroup;
  item.patchValue({
     poNo: element.ff0001,
          materialCode: element.ff0002,
          materialName: element.ff0003,
          materialNo: element.ff0009,
          poQuantity: element.ff0007,
          uom: element.ff0006,
          vendorCode: element.ff0005,
          vendorBatchNo: element.ff0014,
          lotSize: element.ff0011,
          manfacuringDate: element.ff0019,
          expiryDate: element.ff0020,
          retestRequired: element.ff0008,
          noOfPacks: element.ff0015,
          packUOM: element.ff0009,
          inHouseBatchNo: element.ff0010,
          wharehouseName: element.ff0018,
          wharehouseNo: element.ff0016,
  });
 
  
 });

});
  }
   getGoodsReceiptPackList(lc0003:any){
    this.grnService.getGoodsReceiptPackList(lc0003).subscribe((data:any) => {
      console.log(data);
      this.goodsReceiptPackValue = data.data;
      console.log(this.goodsReceiptPackValue)
      this.goodsReceiptPackValue.forEach((pack: any, i: number) => {
        const container = this.containers.at(i) as FormGroup;
  container.patchValue({   
          containerId: pack.ff0001,
          weight: pack.ff0004,
          weightUom: pack.ff0002,
  });
      });
    });
  }
   downloadDocument(row) {
    let fileExtension = getFileExtension(row.ff0013);
    this.grnService
      .onDownloadDocumet(row.uc0001)
      .subscribe((data: any) => {
        const binaryData = atob(data.data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        let blob: any;
        console.log(fileExtension);
        if (fileExtension == 'pdf' || fileExtension == 'PDF') {
          blob = new Blob([uint8Array], { type: 'application/pdf' });
        } else {
          blob = new Blob([uint8Array], { type: 'application/msword' });
        }
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = row.uc0001 + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  }
  public getCommentsData(event: any): void {
    this.userCurrentComments = event;
    console.log(event);
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
      list: this.list,
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
