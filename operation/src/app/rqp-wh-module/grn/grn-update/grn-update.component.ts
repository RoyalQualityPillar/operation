import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { GrnService } from '../grn.service';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { getFileExtension } from 'src/app/common/removeEmptyStrings';
import { GoodsReceiptListComponent } from '../goods-receipt-list/goods-receipt-list.component';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { Subject, takeUntil, timer } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/common/notification.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-grn-update',
  standalone: false,
  templateUrl: './grn-update.component.html',
  styleUrl: './grn-update.component.scss'
})
export class GrnUpdateComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
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
  public lc0003: any;
  public ff0002: any;
  public nextStageListData: any;
  public headerRequestBody: any;
  public previousStageListData: any;
  public userCurrentComments: any;
  public goodsReceiptValue: any;
  public goodsReceiptPackValue: any;
  public grnAttachmentListData: any[] = [];
  public grnAttachmentListTableData: any;
  public goodsList: any;
  public selectedDialogData: any;
  public grnAttachmentList: any[] = [];
  public selectedFiles: any;
  public body1: any;
  private comments: string;
  public draftValue: boolean;
  destroy$ = new Subject<void>();
  public uploadedDocfileName: any;
  public tableData: any;
  public selectedFileList: File[] = [];
  public dataSource: any;
  public reviewCommentsData: any;
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
    private remoteLoader: RemoteComponentLoaderService,
    public dialog: MatDialog,
    private route: Router,
    private notificationService: NotificationService,
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
    const updateData = sessionStorage.getItem('selectedRow');
    let params: any = null;
    if (updateData) {
      params = JSON.parse(updateData);
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
    });
  }
  public getHeaderData(event: any) {
    this.headerData = event;
     this.onReviewData();
  }
   onReviewData() {
    this.grnService
      .onCommentsData(this.ff0001, this.headerData.lcnum, this.ff0005)
      .subscribe((data: any) => {
        this.reviewCommentsData = data.data;
        this.dataSource = new MatTableDataSource(this.reviewCommentsData);
        this.dataSource.sort = this.sort;
      });
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
  addRow() {
    this.items.push(this.createItem());
  }
  removeRow(index: number) {
    this.items.removeAt(index);
  }
  addContainer() {
    this.containers.push(this.createContainer());
  }
  removeContainer(index: number) {
    this.containers.removeAt(index);
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
  handleFileInput(event: any) {
    this.selectedFiles = event.target.files[0];
    if (this.selectedFiles) {
      this.uploadedDocfileName = this.selectedFiles.name;
    }
  }
  filterEmptyObjects(objects: any[]): any[] {
    return objects.filter((obj) => Object.keys(obj).length > 0);
  }
  onCreateSelectedDataList() {
    this.selectedFileList.push(this.selectedFiles);   
    // Check if the document name is provided before proceeding
    if (this.GRNRequirementForm.controls['documentName'].value) {
      // Add new action attachment object
      this.grnAttachmentList.push({
        uc0001: null,
        selectedFileList: this.selectedFiles,
        ff0001: this.GRNRequirementForm.controls['documentName'].value,
        ff0005: 'AT',
        "ff0013": "string",
        ff0015: "att",
        "lc0002": "string",
        "lc0003": "string",
        "lc0004": "string",
        documentAction: 'CREATE',
        "documnetType": "CREATE"
      });

      let filteredObjects = this.filterEmptyObjects(this.grnAttachmentList);
      this.grnAttachmentList = filteredObjects;
      // this.tableData = new MatTableDataSource(item.grnAttachmentList);
      this.tableData = this.grnAttachmentList;
    } else {
      console.log('Document name is empty, not adding grnAttachmentList');
    }
  }
  //  addNewDocumentDetailRow(title: any) {
  //   const dialogRef = this.dialog.open(CommonFileUploadComponent, {
  //     height: '300px',
  //     width: '600px',
  //     data: {
  //       title: title,
  //       type: 'newDoc',
  //       isUpdate: false,
  //       UserRoleTable: this.documentListTableData,
  //       documentDtoList: this.qmsAttachmentListData,
  //     },
  //     disableClose: true,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.createUpdateDocumentList = result;
  //       if (this.createUpdateDocumentList.result) {
  //         this.documentListData = this.createUpdateDocumentList.result;
  //         this.documentListTableData = new MatTableDataSource(
  //           this.documentListData
  //         );
  //       }
  //       console.log(this.createUpdateDocumentList);
  //     }
  //   });
  // }
  getGRNRequestNo() {
    this.grnService.getResquestNoIDForGRN(this.ff0001, this.lc0001).subscribe((data: any) => {
      this.lc0003 = data.data[0].lc0003;
      if (this.lc0003) {
        this.getGoodsReceiptList(this.lc0003);
        this.getGoodsReceiptPackList(this.lc0003);
        this.getGRNAttachchmentList(this.lc0003);
      }
    });
  }
  getGRNAttachchmentList(lc0003: any) {
    this.grnService.getGRNAttachments(lc0003, this.ff0002).subscribe((data: any) => {
      this.grnAttachmentListData = data.data;
      this.grnAttachmentListTableData = new MatTableDataSource(data.data);
    });
  }
  getGoodsReceiptList(lc0003: any) {
    this.grnService.getGoodsReceiptList(lc0003).subscribe((data: any) => {
      this.goodsReceiptValue = data.data;
      const value = this.goodsReceiptValue[0];
      this.MaterialRequirementForm.patchValue({
        grnDate: value.ff0019,
        invoiceDate: value.ff0020,
        invoiceNo: value.ff0021
      });

      this.goodsReceiptValue.forEach((element: any, i: number) => {
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
  getGoodsReceiptPackList(lc0003: any) {
    this.grnService.getGoodsReceiptPackList(lc0003).subscribe((data: any) => {
      this.goodsReceiptPackValue = data.data;
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
  async onSaveConfirmation(btnStatus: any) {
    const component = await this.remoteLoader.loadComponentByKey(
      'CommonESignatureComponent'
    );
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
  async onSubmitConfirmation(btnStatus: any) {
    const component = await this.remoteLoader.loadComponentByKey(
      'CommonESignatureComponent'
    );
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
  formatRequestBody() {   
    const dateValue = this.MaterialRequirementForm.value;
    const items = this.items.value;
    const containers = this.containers.value;
    this.body1 = {
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        lcRole: this.headerData.role,
        stage2: 0,
        requestType: '',
        createdBy: this.headerData.createdby,
        comments: this.comments,
        documentModule: 'string',
        documentStatus: 'string',
        gmuserDTOList: [],
        draft: this.draftValue,
      },

      goodReceiptDTO: items.map((item: any) => ({
        uc0001: null,
        unitcode: this.headerData.unitcode,
        ff0001: item.poNo,
        ff0002: item.materialCode,
        ff0003: item.materialName,
        ff0004: item.materialNo,
        ff0005: item.vendorCode,
        ff0006: item.uom,
        ff0007: item.poQuantity,
        ff0008: item.retestRequired,
        ff0009: item.packUOM,
        ff0010: item.inHouseBatchNo,
        ff0011: item.lotSize,
        ff0012: new Date(dateValue.grnDate).toISOString(),
        ff0013: new Date(dateValue.invoiceDate).toISOString(),
        ff0014: item.vendorBatchNo,
        ff0015: item.noOfPacks,
        ff0016: item.wharehouseNo,
        ff0017: 0,
        ff0018: item.wharehouseName,
        ff0019: new Date(item.manfacuringDate).toISOString(),
        ff0020: new Date(item.expiryDate).toISOString(),
        ff0021: dateValue.invoiceNo,
        ff0022: '',
        ff0023: '',
        lc0001: '',
        lc0002: '',
        lc0003: '',
        lc0004: '',
        lc0005: '',
        lc0006: '',
        createdby: this.headerData.createdby,
        status: 0,
        version: 0,
        comments: this.comments,
      })),
      grnAttachmentList: [...this.grnAttachmentList],



      goodReceiptPacksList: containers.map((element: any) => ({
        uc0001: null,
        ff0001: element.containerId,
        ff0002: element.weightUom,
        ff0003: '',
        ff0004: Number(element.weight) || 0,
        ff0005: 0,
        ff0007: 0,
        ff0008: 0,
        ff0009: '',
        ff0010: '',
        ff0011: '',
        ff0012: '',
        ff0013: '',
        ff0014: '',
        ff0015: '',
        ff0016: '',
        ff0017: '',
        ff0018: '',
        ff0019: '',
        ff0020: '',
        ff0021: '',
        ff0022: '',
        ff0023: '',
        unitcode: this.headerData.unitcode,
        lc0001: "string",
        lc0002: "string",
        lc0003: "string",
        lc0004: "string",
        lc0005: "string",
        lc0006: "string",
        createdby: this.headerData.createdby,
        status: 0,
        version: 0,
        comments: this.comments
      }))


    };

  }
  onSubmit(btnStatus: any) {
    if (btnStatus == 1) {
      this.draftValue = false;
    } else {
      this.draftValue = true;
    }

    this.isLoading = true;
    let bodyData = this.formatRequestBody();

    let attachmentList: any[] = [];
    this.body1.grnAttachmentList.forEach((obj) => {
      console.log(obj.selectedFileList);
      if (obj.selectedFileList) {
        attachmentList.push(obj.selectedFileList);
      }
    });
    let selectedFile: any[] = [];
    this.grnAttachmentList.forEach((elements: any) => {
      selectedFile.push(elements.selectedFileList);
    });
    this.grnService
      .onGRNSaveUpdate(attachmentList, this.body1)
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.notificationService.showSuccess(data.status, () => {
          });
          timer(2000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.route.navigateByUrl('/rqpquailtyui/qms/cc-home');
            });
        }
        this.isLoading = false;
      });
  }

  openPONumLOV(index: number) {
    this.grnService
      .grnVerificationList(this.cookieService.get('buCode'))
      .subscribe((data: any) => {
        this.goodsList = data.data;
        const dialogRef = this.dialog.open(GoodsReceiptListComponent, {
          minWidth: '80%',
          data: { tableData: this.goodsList, pageTitle: 'Goods Details' },
        });
        dialogRef.afterClosed().subscribe((selectedRow: any) => {
          if (selectedRow) {
            const row = selectedRow[0];
            const formGroup = this.items.at(index) as FormGroup;
            formGroup.patchValue({
              poNo: row.ff0001,
              materialCode: row.ff0003,
              materialName: row.ff0004,
              materialNo: row.ff0017,
              poQuantity: row.ff0005,
              uom: row.ff0006,
              vendorCode: row.ff0002
            });
          }
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
}
