import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BomService } from '../bom.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { getFileExtension } from 'src/app/common/removeEmptyStrings';

@Component({
  selector: 'app-bom-completed-save',
  standalone: false,
  templateUrl: './bom-completed-save.component.html',
  styleUrl: './bom-completed-save.component.scss'
})
export class BomCompletedSaveComponent implements OnInit {
  public BOMRequirementForm: FormGroup;
  public ContainerRequirementForm: FormGroup;
  public BOMAttachmentRequirementForm: FormGroup;
  commentType = 'completedRecord';
  public headerData: any;
  public isLoading = false;
  public pageData: any;
  public ff0005: number;
  public ff0001: any;
  public lc0001: any;
  public ff0002: any;
  public lc0003: any;
  public headerRequestBody: any;
  public nextStageListData: any;
  public previousStageListData: any;
  public bomIndexValue: any;
  public bomItemValue: any;
  public bomAttachmentListData: any[] = [];
  public bomAttachmentListTableData: any;
  public userCurrentComments: any;
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
      pageName: 'wh',
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
      console.log(this.nextStageListData);
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
      console.log(data);
      this.bomAttachmentListData = data.data;
      this.bomAttachmentListTableData = new MatTableDataSource(data.data);
      console.log(this.bomAttachmentListTableData)
    });
  }
  getBOMItemMasterList(lc0003: any) {
    this.bomService.getBOMItemMasterList(lc0003).subscribe((data: any) => {
      console.log(data);
      this.bomItemValue = data.data;
      const value = this.bomItemValue[0];

      this.bomItemValue.forEach((element: any, i: number) => {
        const product = this.products.at(i) as FormGroup;
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


      });

    });
  }
  getBOMIndexMasterList(lc0003: any) {
    this.bomService.getBOMIndexMasterList(lc0003).subscribe((data: any) => {
      console.log(data);
      this.bomIndexValue = data.data;
      console.log(this.bomIndexValue)
      this.bomIndexValue.forEach((pack: any, i: number) => {
        const container = this.containers.at(i) as FormGroup;
        container.patchValue({
          materialNo: pack.ff0001,
          materialName: pack.ff0002,
          materialCode: pack.ff0003,
          weight: pack.ff0004,
          weightUom: pack.ff0005,
        });
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
  getComments() {
    const lcRequestnumber = this.headerData.requestNo;
    const lcnum = this.headerData.lcnum;
    const templateName = 'ch.html';
    const stage = 1;
    const userid = this.headerData.createdby;
    const moduleCode = this.headerData.modulecode;
    this.bomService
      .onGetCommentsData(
        lcRequestnumber,
        lcnum,
        templateName,
        stage,
        userid,
        moduleCode
      )
      .subscribe((data: any) => {
        console.log(data);
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
  public downloadGRNReport() {
    const lcNumber = this.headerData?.lcnum;
    const templateName = 'grnReport.html';
    const moduleCode = this.headerData?.modulecode;
    const lcrnumber = this.headerData.requestNo;
    this.isLoading = true;
    this.bomService
      .downloadBOMreport(
        lcNumber,
        templateName,
        moduleCode,
        lcrnumber
      )
      .subscribe((data: any) => {
        console.log(data);
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
        link.download = lcrnumber + '.' + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    this.isLoading = false;
  }
}
