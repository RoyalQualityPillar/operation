import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { GrnService } from '../grn.service';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { Subject, takeUntil, timer } from 'rxjs';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import { PmsListComponent } from 'src/app/rqp-dms-module/dms/pms-list/pms-list.component';
import { GoodsReceiptListComponent } from '../goods-receipt-list/goods-receipt-list.component';

@Component({
  selector: 'app-grn-initiator',
  standalone: false,
  templateUrl: './grn-initiator.component.html',
  styleUrl: './grn-initiator.component.scss'
})
export class GrnInitiatorComponent implements OnInit {
  public MaterialRequirementForm: FormGroup;
  public MaterialLotRequirementForm: FormGroup;
  public GRNRequirementForm: FormGroup;
  public ContainerRequirementForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public displayedColumns: any;
  public selectedDialogData: any;
  public itemCategoryList: any;
  public icsMasterList: any;
  public comments: string;
  public nextStageListData: any;
  public headerRequestBody: any;
  public draftValue: boolean;
  public isLoading = false;
  public containerList: any[] = [];
  destroy$ = new Subject<void>();
  public goodsList: any;
  public body1: any;
  public tableData: any;
  public uploadedDocfileName: any;
  public isSubjectCodeSuccess: boolean;
  public grnAttachmentList: any[] = [];
  public selectedFiles: any;
  public selectedFileList: File[] = [];

  constructor(
    public fb: FormBuilder,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private grnService: GrnService,
    public buttonLabelService: ButtonLabelService,
    private remoteLoader: RemoteComponentLoaderService,
    private toolbarService: ToolbarService,
    private notificationService: NotificationService,
    private route: Router,

  ) {
    this.MaterialRequirementForm = fb.group({
      grnDate: [''],
      invoiceDate: [''],
      invoiceNo: ['']
    });
    //     this.ContainerRequirementForm = fb.group({
    // containerId: [''],
    //       weight: [''],
    //       weightUom: ['']
    //     });
    this.ContainerRequirementForm = this.fb.group({
      containers: this.fb.array([this.createContainer()])
    });
    this.MaterialLotRequirementForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
    //     this.MaterialLotRequirementForm = fb.group({
    //       poNo: [''],
    //       materialCode: [''],
    //       materialName: [''],
    //       materialNo: [''],
    //       poQuantity: [''],
    //       uom: [''],
    //       vendorCode: [''],
    //       vendorBatchNo: [''],
    //       lotSize: [''],
    //       manfacuringDate: [''],
    //       expiryDate:[''],
    //       retestRequired:[''],
    //       noOfPacks:[''],
    //       packUOM:[''],
    //       inHouseBatchNo:[''],
    //       storageLocation:[''],
    //       wharehouseName:[''],
    // wharehouseNo:[''],
    //       containerId: [''],
    //       weight: [''],
    //       weightUom: ['']
    //     });
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
      pageType: 'create',
      isRasiInit: 'grn-Initiator',
    };
    this.onLoadInputApi();
    this.onLoadNextStageData();
  }
  public onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      lcStage: this.toolbarService.currentStage,
    };

    this.grnService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
  getHeaderData(event: any) {
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
  addRow() {
    this.items.push(this.createItem());
  }
  removeRow(index: number) {
    this.items.removeAt(index);
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
  onLoadInputApi() {
    let unitCode = this.headerData.unitcode;
    let module = 'CCA';
    let mainModule = 'CC';
    this.grnService
      .onLoadInputNewAPI(unitCode, module, mainModule)
      .subscribe((data: any) => {
        this.itemCategoryList = data.data.itemCategoryList;
        this.icsMasterList = data.data.icsMasterList;
        // this.isReadonly = true;
      });
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
      grnAttachmentList: this.grnAttachmentList,



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
    // let grnAttachmentList: any[] = [];
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
}
