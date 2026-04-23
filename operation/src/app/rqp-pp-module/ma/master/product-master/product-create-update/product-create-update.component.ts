import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Subject, timer, takeUntil } from 'rxjs';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { MessageService } from 'src/app/service/message.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

export interface userData {
  userData: any;
  type: any;
  tableData: any;
} 
@Component({
  selector: 'app-product-create-update',
  standalone: false,
  templateUrl: './product-create-update.component.html',
  styleUrl: './product-create-update.component.scss'
})
export class ProductCreateUpdateComponent implements OnInit, OnDestroy {
  isReadOnly = true;
  isUpdate = false;
  DepartmentMaster: FormGroup;
  orgList: any;
  buTypeList: any;
  unitList: any;
  formData: any;
  isLoading = false;
  statusList: any;
  displayedColumns: any;
  selectedDialogData: any;
  isStatusSuccess = false;
  isPlantCodeSuccess = false;
  private destroy$ = new Subject<void>();

  constructor(
    public fb: FormBuilder,
    public buttonLabelService: ButtonLabelService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private productService: ProductService,
    private remoteLoader: RemoteComponentLoaderService,
    private cookieService: CookieService,
    private apiService: ApiService,
    private route: Router,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProductCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
  ) {
    this.DepartmentMaster = this.fb.group({
      unitcode: [''],
      uc0001: [''],
      ff0001: ['', Validators.required],
      ff0002: ['', Validators.required],
      ff0003: ['', Validators.required],
      ff0004: [0, Validators.required],
      ff0005: ['', Validators.required],
      ff0006: [0, Validators.required],
      ff0007: ['', Validators.required],
      ff0008: ['', Validators.required],
      ff0009: ['', Validators.required],
      ff0010: ['', Validators.required],
      ff0011: ['', Validators.required],
      createdby: [''],
      status: [''],
      comments: ['', Validators.required],
    });
  }

 ngOnInit(): void {
    this.DepartmentMaster.controls['unitcode'].patchValue(
      this.cookieService.get('buCode')
    );
    this.onloadDropDown();
    this.onLoadStatusDropDown();
    console.log(this.userData.type);
    if (this.userData.type == 'Modification') {
      this.isReadOnly = true;
      this.isUpdate = true;
      this.onLoadFormValue();
    } else {
      this.isReadOnly = false;
      this.isUpdate = false;
    }
  }

  onloadDropDown() {
    this.isLoading = true;
    let unitCode = this.cookieService.get('buCode');
    let params = { unitCode };
    //this.businessUnitService.getDropDownList().subscribe((data: any) => {
    this.apiService
      .sendRequest(apiEndPoints.dropDownInputList, 'GET', params)
      .subscribe((data: any) => {
        this.orgList = data.data.orgList;
        this.buTypeList = data.data.buTypeList;
        this.unitList = data.data.unitList;
        this.isLoading = false;
      });
  }
  onLoadStatusDropDown() {
    this.isLoading = true;
    this.productService.getDropDownList().subscribe((data: any) => {
      this.statusList = data.data.statusInfo;
      this.isLoading = false;
    });
  }
  onLoadFormValue() {
    console.log(this.userData);
    this.isLoading = true;
    // this.organizationService
    //   .onLoadUpdatePage(this.userData.tableData.uc0001)
    //   .subscribe((data: any) => {
    let UC0001 = this.userData.tableData.uc0001;
    const params = { UC0001 };
    this.apiService
      .sendRequest(apiEndPoints.dmproductLoadUpdatePage, 'POST', params)
      .subscribe((data: any) => {
        this.formData = data.data;
        this.isLoading = false;
        this.setFormValue();
      });
  }
  setFormValue() {
    this.DepartmentMaster.controls['unitcode'].setValue(this.formData.unitcode);
    this.DepartmentMaster.controls['uc0001'].setValue(this.formData.uc0001);
    this.DepartmentMaster.controls['ff0001'].setValue(this.formData.ff0001);
    this.DepartmentMaster.controls['ff0002'].setValue(this.formData.ff0002);
    this.DepartmentMaster.controls['ff0003'].setValue(this.formData.ff0003);
    this.DepartmentMaster.controls['ff0004'].setValue(this.formData.ff0004);
    this.DepartmentMaster.controls['ff0005'].setValue(this.formData.ff0005);
    this.DepartmentMaster.controls['ff0006'].setValue(this.formData.ff0006);
    this.DepartmentMaster.controls['ff0007'].setValue(this.formData.ff0007);
    this.DepartmentMaster.controls['ff0008'].setValue(this.formData.ff0008);
    this.DepartmentMaster.controls['ff0009'].setValue(this.formData.ff0009);
    this.DepartmentMaster.controls['ff0010'].setValue(this.formData.ff0010);
    this.DepartmentMaster.controls['ff0011'].setValue(this.formData.ff0011);
    this.DepartmentMaster.controls['status'].setValue(this.formData.status);
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments);
  }
  onUpdate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['createdby'].setValue(
      this.cookieService.get('userId')
    );
    let params = {};
    this.productService
      .onCreate(this.DepartmentMaster.value)
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.isLoading = false;
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.isLoading = false;
          this.messageService.sendSnackbar(
            'success',
            'Record Created Successfully'
          );
          this.dialogRef.close();
        }
      });
  }
  public async onSaveConfirmation() {
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
          this.onCreate();
        }
      }
    });
  }
  onCreate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['createdby'].setValue(
      this.cookieService.get('userId')
    );
    let params = {};
    this.productService
      .onCreate(this.DepartmentMaster.value)
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.isLoading = false;
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.isLoading = false;
          this.notificationService.showSuccess(data.status, () => { });
          timer(2000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.route.navigateByUrl('/rqpquailtyui/dms/sop-module-home-page');
            });
        }



      });
    this.dialogRef.close();
  }
  onClear() {
    this.DepartmentMaster.reset();
  }

  openBusinessUnitCodeLOV() {
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Business Unit',
        dialogColumns: this.displayedColumns,
        dialogData: this.unitList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['unitcode'].setValue(
          this.selectedDialogData.unitCode
        );
      }
    });
  }

  onChangePlantCode() {
    if (this.DepartmentMaster.controls['unitcode'].value == '') {
      this.DepartmentMaster.controls['unitcode'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.DepartmentMaster.controls['unitcode'].value;
      this.isPlantCodeSuccess = false;
      this.unitList.forEach((elements) => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.DepartmentMaster.controls['unitcode'].setErrors({
          incorrect: true,
        });
        this.openBusinessUnitCodeLOV();
      }
    }
  }
  openStatusLOV() {
    this.displayedColumns = [
      { field: 'code', title: 'Code' },
      { field: 'description', title: 'Descritption' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Status',
        dialogColumns: this.displayedColumns,
        dialogData: this.statusList,
        lovName: 'statusList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['status'].setValue(
          this.selectedDialogData.code
        );
      }
    });
  }

  onChangeStatus() {
    if (this.DepartmentMaster.controls['status'].value == '') {
      this.DepartmentMaster.controls['status'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['status'].value;
      this.statusList.forEach((elements) => {
        if (elements.code == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['status'].setErrors({ incorrect: true });
        this.openStatusLOV();
      }
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
