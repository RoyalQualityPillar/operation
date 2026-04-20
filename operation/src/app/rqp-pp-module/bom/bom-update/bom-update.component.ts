import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BomService } from '../bom.service';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PmsListComponent } from 'src/app/rqp-dms-module/dms/pms-list/pms-list.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil, timer } from 'rxjs';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { getFileExtension } from 'src/app/common/removeEmptyStrings';

@Component({
  selector: 'app-bom-update',
  standalone: false,
  templateUrl: './bom-update.component.html',
  styleUrl: './bom-update.component.scss'
})
export class BomUpdateComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public BOMRequirementForm: FormGroup;
  public ContainerRequirementForm: FormGroup;
  public BOMAttachmentRequirementForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public nextStageListData: any;
  public headerRequestBody: any;
  public previousStageListData: any;
  public ff0005: number;
  public ff0001: any;
  public lc0001: any;
  public lc0003: any;
  public ff0002: any;
  public tableData: any;
  public isStatusSuccess = false;
  public selectedDialogData: any;
  public isSubjectCodeSuccess: boolean;
  public displayedColumns: any;
  public bomIndexValue: any;
  public bomItemValue: any;
  public isLoading = false;
  public uploadedDocfileName: any;
  private comments: string;
  public selectedFiles: any;
  public dataSource: any;
  public body1: any;
  public draftValue: boolean;
  destroy$ = new Subject<void>();
  public reviewCommentsData: any;
  public selectedFileList: File[] = [];
  public psmList: any[] = [];
  public pmmMaterialList: any[] = [];
  public saleProductList: any[] = [];
  public bomAttachmentList: any[] = [];
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
    public dialog: MatDialog,
    private shareHostDataService: ShareHostDataService,
    private lifeCycleDataService: LifeCycleDataService,
    private cookieService: CookieService,
    private remoteLoader: RemoteComponentLoaderService,
    private notificationService: NotificationService,
    private route: Router,
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
  public getHeaderData(event: any) {
    this.headerData = event;
    let uc0001 = this.headerData.unitcode;
    this.bomService.bmrInput(uc0001).subscribe(({ data }) => {
      this.psmList = data.pmsList;
    });
    this.onReviewData();
  }
  onReviewData() {
    this.bomService
      .onCommentsData(this.ff0001, this.headerData.lcnum, this.ff0005)
      .subscribe((data: any) => {
        this.reviewCommentsData = data.data;
        this.dataSource = new MatTableDataSource(this.reviewCommentsData);
        this.dataSource.sort = this.sort;
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
  addProduct() {
    this.products.push(this.createProduct());
  }
  removeProduct(index: number) {
    this.products.removeAt(index);
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
  addContainer() {
    this.containers.push(this.createContainer());
  }
  removeContainer(index: number) {
    this.containers.removeAt(index);
  }
  removeRow(index: number) {
    // this.items.removeAt(index);
    this.bomAttachmentList.splice(index, 1);
  }
  onloadDropDownList() {
    this.isLoading = true;
    this.bomService.getDropDownList(this.cookieService.get('buCode')).subscribe((data: any) => {
      this.pmmMaterialList = data.data.pmmMaterialList;
      this.saleProductList = data.data.saleProductList;
      this.isLoading = false;
    });
  }
  handleFileInput(event: any) {
    this.selectedFiles = event.target.files[0];
    if (this.selectedFiles) {
      this.uploadedDocfileName = this.selectedFiles.name;
    }
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
  filterEmptyObjects(objects: any[]): any[] {
    return objects.filter((obj) => Object.keys(obj).length > 0);
  }
  onCreateSelectedDataList() {
    this.selectedFileList.push(this.selectedFiles);
    // Check if the document name is provided before proceeding
    if (this.BOMAttachmentRequirementForm.controls['documentName'].value) {
      // Add new action attachment object
      this.bomAttachmentList.push({
        uc0001: null,
        selectedFileList: this.selectedFiles,
        ff0001: this.BOMAttachmentRequirementForm.controls['documentName'].value,
        ff0005: 'AT',
        "ff0013": "string",
        ff0015: "att",
        "lc0002": "string",
        "lc0003": "string",
        "lc0004": "string",
        documentAction: 'CREATE',
        "documnetType": "CREATE"
      });

      let filteredObjects = this.filterEmptyObjects(this.bomAttachmentList);
      this.bomAttachmentList = filteredObjects;
      // this.tableData = new MatTableDataSource(item.bomAttachmentList);
      this.tableData = this.bomAttachmentList;
    } else {
      console.log('Document name is empty, not adding bomAttachmentList');
    }
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
      if (data.data) {
        data.data.forEach((element: any) => {
          if (
            element.documentAction == null ||
            element.documentAction == '' ||
            element.documentAction == undefined
          ) {
            element.documentAction = 'IGNORE';
          } else {
            element.documentAction = element.documentAction;
          }
        });
      }
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
             this.bomItemValue.forEach((pack: any, i: number) => {
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
  getBOMIndexMasterList(lc0003: any) {
    this.bomService.getBOMIndexMasterList(lc0003).subscribe((data: any) => {
      console.log(data);
      this.bomIndexValue = data.data;
      console.log(this.bomIndexValue)
       this.bomIndexValue.forEach((element: any, i: number) => {
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
    const products = this.products.value;
    const containers = this.containers.value;
    this.body1 = {
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        lcRole: this.headerData.role,
        lcrqNumber: this.pageData?.requestNo,
        stage2: 0,
        requestType: '',
        createdBy: this.headerData.createdby,
        comments: this.comments,
        documentModule: 'string',
        documentStatus: 'string',
        gmuserDTOList: [],
        draft: this.draftValue,
      },

      bomItemItems: this.bomItemValue.map((item: any) => ({
        uc0001: item.uc0001,
        unitcode: item.unitcode,
        ff0001: item.ff0001,
        ff0002: item.ff0002,
        ff0003: item.ff0003,
        ff0004: item.ff0004,
        ff0005: item.ff0005,
        ff0006: item.ff0006,
        ff0007: item.ff0007,
        ff0008: item.ff0008,
        ff0009: item.ff0009,
        ff0010: item.ff0010,
        lc0001: item.lc0001,
        lc0002: item.lc0002,
        lc0003: item.lc0003,
        lc0004: item.lc0004,
        lc0005: item.lc0005,
        lc0006: item.lc0006,
        createdby: item.createdby,
        status: item.status,
        comments: this.comments,
      })),

      bomIndexIndex: this.bomIndexValue.map((element: any) => ({
        uc0001: element.uc0001,
        ff0001: element.ff0001,
        ff0002: element.ff0002,
        ff0003: element.ff0003,
        ff0004: element.ff0004,
        ff0005: element.ff0005,
        ff0006: element.ff0006,
        ff0007: element.ff0007,
        ff0008: element.ff0008,
        ff0009: element.ff0009,
        ff0010: element.ff0010,
        unitcode: element.unitcode,
        lc0001: element.lc0001,
        lc0002: element.lc0002,
        lc0003: element.lc0003,
        lc0004: element.lc0004,
        lc0005: element.lc0005,
        lc0006: element.lc0006,
        createdby: element.createdby,
        status: element.status,
        comments: this.comments
      })),
      // bomAttachmentList: this.bomAttachmentListData,
      bomAttachmentList: [
        ...this.bomAttachmentList,
        ...this.bomAttachmentListData
      ]


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
    this.body1.bomAttachmentList.forEach((obj) => {
      console.log(obj.selectedFileList);
      if (obj.selectedFileList) {
        attachmentList.push(obj.selectedFileList);
      }
    });
    this.bomService
      .onBOMSaveUpdate(attachmentList, this.body1)
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.isLoading = false;
          this.notificationService.showSuccess(data.status, () => {
          });
          timer(2000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.route.navigateByUrl('/rqpoperationui/pp/bom-module-admin');
            });
        }
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
  onChangeSubject(index: number) {
    const productNumber = this.products.at(index).get('productNo');
    if (!productNumber.value) {
      productNumber.setValue('');
    } else {
      let statusCurrentValue = productNumber.value;
      this.psmList.forEach((elements) => {
        if (elements.mdGName == statusCurrentValue) {
          this.isSubjectCodeSuccess = true;
        }
      });
      if (this.isSubjectCodeSuccess == false) {
        productNumber.setErrors({
          incorrect: true,
        });
        this.openStatusLOV(index);
      }
    }
  }

  openStatusLOV(index: number) {
    this.displayedColumns = [
      { field: 'productNO', title: 'Product No' },
      { field: 'productName', title: 'Product Name' },
    ];
    const dialogRef = this.dialog.open(PmsListComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Status',
        dialogColumns: this.displayedColumns,
        dialogData: this.psmList,
        lovName: 'statusList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.products.at(index).patchValue({
          productNo: this.selectedDialogData.productNO
        });

        this.bomService
          .productList(this.selectedDialogData.productNO)
          .subscribe(({ data }) => {
            data.forEach((element) => {
              this.products.at(index).patchValue({
                dosageForm: element.ff0009,
                productName: element.ff0001,
                productCode: element.ff0002,
                market: element.ff0003,
                uom: element.ff0007,
                shelfLifeMonths: element.ff0005,
                productType: element.ff0008,
                inputCode: element.ff0010,
                productTrackingCode: element.ff0011,
                requestNo: element.ff0007,
                version: element.ff0008,
              });
            });
          });
      }
    });
  }
  openMaterialListLOV(index: number) {
    this.displayedColumns = [
      { field: 'materialnumber', title: 'Material Number' },
      { field: 'materialcode', title: 'Material Code' },
      { field: 'materialname', title: 'Material Name' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Sales Product List',
        dialogColumns: this.displayedColumns,
        dialogData: this.pmmMaterialList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.containers.at(index).patchValue({
          materialNo: this.selectedDialogData.materialnumber,
          materialName: this.selectedDialogData.materialname,
          materialCode: this.selectedDialogData.materialcode
        });
      }
    });
  }
  onChangeByMaterialCode(index: number) {
    const materialNo = this.containers.at(index).get('materialNo');
    const materialName = this.containers.at(index).get('materialName');
    const materialCode = this.containers.at(index).get('materialCode');
    if (materialCode.value == '') {
      materialNo.setValue('');
      materialName.setValue('');
      materialCode.setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = materialCode.value;
      this.saleProductList.forEach((elements) => {
        if (elements.puunitcode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        materialNo.setErrors({ incorrect: true });
        materialName.setErrors({ incorrect: true });
        materialCode.setErrors({ incorrect: true });
        this.openMaterialListLOV(index);
      }
    }
  }
  onChangeMaterialNo(index: number) {
    const materialNo = this.containers.at(index).get('materialNo');
    const materialName = this.containers.at(index).get('materialName');
    const materialCode = this.containers.at(index).get('materialCode');
    if (materialNo.value == '') {
      materialNo.setValue('');
      materialName.setValue('');
      materialCode.setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = materialNo.value;
      this.saleProductList.forEach((elements) => {
        if (elements.punumber == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        materialNo.setErrors({ incorrect: true });
        materialName.setErrors({ incorrect: true });
        materialCode.setErrors({ incorrect: true });
        this.openMaterialListLOV(index);
      }
    }
  }
  onChangeMaterialName(index: number) {
    const materialNo = this.containers.at(index).get('materialNo');
    const materialName = this.containers.at(index).get('materialName');
    const materialCode = this.containers.at(index).get('materialCode');
    if (materialName.value == '') {
      materialNo.setValue('');
      materialName.setValue('');
      materialCode.setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = materialName.value;
      this.saleProductList.forEach((elements) => {
        if (elements.puunitname == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        materialNo.setErrors({ incorrect: true });
        materialName.setErrors({ incorrect: true });
        materialCode.setErrors({ incorrect: true });
        this.openMaterialListLOV(index);
      }
    }
  }
}
