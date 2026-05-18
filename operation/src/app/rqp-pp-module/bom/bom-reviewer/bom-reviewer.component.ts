import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';
import { BomService } from '../bom.service';
import { MatTableDataSource } from '@angular/material/table';
import { getFileExtension } from 'src/app/common/removeEmptyStrings';

@Component({
  selector: 'app-bom-reviewer',
  standalone: false,
  templateUrl: './bom-reviewer.component.html',
  styleUrl: './bom-reviewer.component.scss'
})
export class BomReviewerComponent implements OnInit {
  public redirectUrl: string = '/rqpoperationui/pp/bom-module-admin';
  public BOMRequirementForm: FormGroup;
  public ContainerRequirementForm: FormGroup;
  public BOMAttachmentRequirementForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public ff0005: number;
  public ff0001: any;
  public lc0001: any;
  public lc0003: any;
  public ff0002: any;
  public nextStageListData: any;
  public headerRequestBody: any;
  public previousStageListData: any;
  public userCurrentComments: any;
  public isLoading = false;
  public disableButtons = false;
  public bomIndexValue: any;
  public bomItemValue: any;
  public bomAttachmentListData: any[] = [];
  public bomAttachmentListTableData: any;
  bomAttachListdisplayedColumns: string[] = [
    'uc0001',
    'ff0007',
    'createdby',
    'createdon',
    'ff0005',
    'removeRow',
  ];
  constructor(
    public fb: FormBuilder,
    private bomService: BomService,
    private lifeCycleDataService: LifeCycleDataService,
    private shareHostDataService: ShareHostDataService,
  ) {
    this.BOMRequirementForm = fb.group({
      products: fb.array([this.createProduct()])
    });
    this.ContainerRequirementForm = this.fb.group({
      containers: this.fb.array([this.createContainer()])
    });
    this.BOMAttachmentRequirementForm = this.fb.group({
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
      // });
    }
    if (this.ff0001) {
      this.getBOMRequestNo();
    }
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();
  }
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.shareHostDataService.lcNumber,
      lcStage: this.shareHostDataService.currentStage
    };
    this.bomService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
      this.previousStageListData = data.data.pstage;
    });
  }
  createProduct(): FormGroup {
    return this.fb.group({
      productNo: [''],
      productName: [''],
      market: [''],
      productCode: [''],
      uom: [''],
      shelfLifeMonths: [''],
      productType: [''],
      dosageForm: [''],
      inputCode: [''],
      productTrackingCode: [''],
      requestNo: [''],
      version: [''],
    });
  }
  get products(): FormArray {
    return this.BOMRequirementForm.get('products') as FormArray;
  }
  createContainer(): FormGroup {
    return this.fb.group({
      materialNo: [''],
      materialName: [''],
      materialCode: [''],
      weight: [''],
      weightUom: ['']
    });
  }
  get containers(): FormArray {
    return this.ContainerRequirementForm.get('containers') as FormArray;
  }


  public getHeaderData(event: any) {
    this.headerData = event;
  }
  public getCommentsData(event: any): void {
    this.userCurrentComments = event;
  }
  getBOMRequestNo() {
    this.bomService.getResquestNoIDForBOM(this.ff0001, this.lc0001).subscribe((data: any) => {
      this.lc0003 = data.data[0].lc0003;
      if (this.lc0003) {
        this.getBOMItemMasterList(this.lc0003);
        this.getBOMIndexMasterList(this.lc0003);
        this.getBOMAttachments(this.lc0003);
      }
    });
  }
  getBOMAttachments(lc0003: any) {
    this.bomService.getBOMAttachments(lc0003, this.ff0002).subscribe((data: any) => {
      this.bomAttachmentListData = data.data;
      this.bomAttachmentListTableData = new MatTableDataSource(data.data);
    });
  }
  getBOMItemMasterList(lc0003: any) {
    this.bomService.getBOMItemMasterList(lc0003).subscribe((data: any) => {
      this.bomItemValue = data.data;
      this.containers.clear();
      const value = this.bomItemValue[0];
      this.bomItemValue.forEach((pack: any) => {
        const container = this.createContainer();
        container.patchValue({
          materialNo: pack.ff0001,
          materialName: pack.ff0002,
          materialCode: pack.ff0003,
          weight: pack.ff0004,
          weightUom: pack.ff0005,
        });
        this.containers.push(container);
      });

    });
  }
  getBOMIndexMasterList(lc0003: any) {
    this.bomService.getBOMIndexMasterList(lc0003).subscribe((data: any) => {
      this.bomIndexValue = data.data;
      this.products.clear();
      this.bomIndexValue.forEach((element: any) => {
        const product = this.createProduct();
        product.patchValue({
          productNo: element.ff0001,
          productName: element.ff0002,
          market: element.ff0003,
          productCode: element.ff0004,
          uom: element.ff0005,
          shelfLifeMonths: element.ff0006,
          productType: element.ff0007,
          dosageForm: element.ff0008,
          inputCode: element.ff0009,
          productTrackingCode: element.ff0010,
        });
        this.products.push(product);
      });
    });
  }
  downloadDocument(row) {
    let fileExtension = getFileExtension(row.ff0013);
    this.bomService
      .onDownloadDocumet(row.uc0001)
      .subscribe((data: any) => {
        const binaryData = atob(data.data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        let blob: any;
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
