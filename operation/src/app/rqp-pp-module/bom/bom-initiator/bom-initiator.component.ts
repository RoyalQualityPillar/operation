import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PmsListComponent } from 'src/app/rqp-dms-module/dms/pms-list/pms-list.component';
import { BomService } from '../bom.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil, timer } from 'rxjs';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-bom-initiator',
  standalone: false,
  templateUrl: './bom-initiator.component.html',
  styleUrl: './bom-initiator.component.scss'
})
export class BomInitiatorComponent implements OnInit {
  public BOMRequirementForm: FormGroup;
  public ContainerRequirementForm: FormGroup;
  public BOMAttachmentRequirementForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public selectedDialogData: any;
  public isSubjectCodeSuccess: boolean;
  public displayedColumns: any;
  public body1: any;
  public draftValue: boolean;
  public uploadedDocfileName: any;
  public tableData: any;
  public nextStageListData: any;
  public headerRequestBody: any;
  public isLoading = false;
  public comments: string;
  destroy$ = new Subject<void>();
  public selectedFiles: any;
  public selectedFileList: File[] = [];
  public psmList: any[] = [];
  public bomAttachmentList: any[] = [];
  public pmmMaterialList: any[] = [];
  public saleProductList: any[] = [];
  public isStatusSuccess = false;
  constructor(
    private bomService: BomService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private remoteLoader: RemoteComponentLoaderService,
    private notificationService: NotificationService,
    private route: Router,
    public buttonLabelService: ButtonLabelService,
    private toolbarService: ToolbarService,
    private cookieService: CookieService,
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
      pageType: 'create',
      isRasiInit: 'bom-Initiator',
    };
    this.onloadDropDownList();
    this.onLoadNextStageData();
  }
  public onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      lcStage: this.toolbarService.currentStage,
    };

    this.bomService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
  getHeaderData(event: any) {
    this.headerData = event;
    let uc0001 = this.headerData.unitcode;
    this.bomService.bmrInput(uc0001).subscribe(({ data }) => {
      this.psmList = data.pmsList;
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
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
  handleFileInput(event: any) {
    this.selectedFiles = event.target.files[0];
    if (this.selectedFiles) {
      this.uploadedDocfileName = this.selectedFiles.name;
    }
  }
  onloadDropDownList() {
    this.isLoading = true;
    this.bomService.getDropDownList(this.cookieService.get('buCode')).subscribe((data: any) => {
      this.pmmMaterialList = data.data.pmmMaterialList;
      this.saleProductList = data.data.saleProductList;
      this.isLoading = false;
    });
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
        stage2: 0,
        requestType: '',
        createdBy: this.headerData.createdby,
        comments: this.comments,
        documentModule: 'string',
        documentStatus: 'string',
        gmuserDTOList: [],
        draft: this.draftValue,
      },

      bomItemItems: containers.map((item: any) => ({
        uc0001: null,
        ff0001: item.materialNo,
        ff0002: item.materialName,
        ff0003: item.materialCode,
        ff0004: item.weight,
        ff0005: item.weightUom,
        ff0007: "string",
        ff0008: "string",
        ff0009: "string",
        ff0010: "string",
        unitcode: this.headerData.unitcode,
        lc0001: '',
        lc0002: '',
        lc0003: '',
        lc0004: '',
        lc0005: '',
        lc0006: '',
        createdby: this.headerData.createdby,
        status: 0,
        comments: this.comments,
      })),

      bomIndexIndex: products.map((element: any) => ({
        uc0001: null,
        unitcode: this.headerData.unitcode,
        ff0001: element.productNo,
        ff0002: element.productName,
        ff0003: element.market,
        ff0004: element.productCode,
        ff0005: element.uom,
        ff0006: element.shelfLifeMonths,
        ff0007: element.productType,
        ff0008: element.dosageForm,
        ff0009: element.inputCode,
        ff0010: element.productTrackingCode,
        lc0001: "string",
        lc0002: "string",
        lc0003: "string",
        lc0004: "string",
        lc0005: "string",
        lc0006: "string",
        createdby: this.headerData.createdby,
        status: 0,
        // version: 0,
        comments: this.comments
      })),
      bomAttachmentList: this.bomAttachmentList,



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
              this.route.navigateByUrl('/rqpquailtyui/qms/cc-home');
            });
        }
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
