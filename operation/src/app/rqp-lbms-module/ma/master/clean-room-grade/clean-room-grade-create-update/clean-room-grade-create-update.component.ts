import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { changeStatusByCode, changeStatusByDescription } from 'src/app/common/removeEmptyStrings';
import { AdminService } from 'src/app/rqp-dms-module/dms/service/admin.service';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { MessageService } from 'src/app/service/message.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { CleanRoomGradeService } from '../clean-room-grade.service';
export interface userData {
  userData: any;
  type: any;
  tableData: any;
}
@Component({
  selector: 'app-clean-room-grade-create-update',
  standalone: false,
  templateUrl: './clean-room-grade-create-update.component.html',
  styleUrl: './clean-room-grade-create-update.component.scss'
})
export class CleanRoomGradeCreateUpdateComponent implements OnInit {
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
  pmmMaterialList: {
    materialcode: string;
    materialname: string;
    materialnumber: string;
  }[];

  constructor(
    public fb: FormBuilder,
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private notificationService: NotificationService,
    public buttonLabelService: ButtonLabelService,
    private cookieService: CookieService,
    private cleanRoomGradeService: CleanRoomGradeService,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CleanRoomGradeCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData,
    private remoteLoader: RemoteComponentLoaderService,
  ) {
    this.DepartmentMaster = this.fb.group({
      uc0001: [''],
      ff0001: ['', Validators.required],
      ff0002: ['', Validators.required],
      createdby: [''],
      status: [''],
      comments: ['', Validators.required],
      unitcode: ['']
    });
  }

  ngOnInit(): void {
    this.onLoadStatusDropDown();
    this.DepartmentMaster.controls['unitcode'].patchValue(
      this.cookieService.get('buCode')
    );

    // this.onloadDropDown();
    if (this.userData.type == 'Modification') {
      this.isReadOnly = true;
      this.isUpdate = true;
      this.onLoadFormValue();
    } else {
      this.isReadOnly = false;
      this.isUpdate = false;
    }
  }
  saleProductList: any;
  buUnitList: any;
  suUnitList: any;
  puUnitList: any;
  stageMasterList: any;

  mtMasterList: any;
  utMasterList: any;
  
  onLoadStatusDropDown() {
    this.isLoading = true;
    this.adminService.getDropDownList().subscribe((data: any) => {
      this.statusList = data.data.statusInfo;
      this.isLoading = false;
    });
  }
  onLoadFormValue() {
    this.isLoading = true;
    let UC0001 = this.userData.tableData.uc0001;
    const params = { UC0001 };

    this.apiService
      .sendRequest(apiEndPoints.crmMasterLoadUpdatePage, 'POST', params)
      .subscribe((data: any) => {
        if (data.data == null) {
          this.isLoading = false;
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.formData = data.data;
          this.isLoading = false;
          this.setFormValue();
        }
      });
  }
  setFormValue() {
    this.DepartmentMaster.controls['uc0001'].setValue(this.formData.uc0001);
    this.DepartmentMaster.controls['ff0001'].setValue(this.formData.ff0001);
    this.DepartmentMaster.controls['ff0002'].setValue(this.formData.ff0002);
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments);
    let statusByValue = changeStatusByCode(this.formData.status);
    this.DepartmentMaster.controls['status'].setValue(statusByValue);
  }
  onUpdate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['status'].setValue(
      changeStatusByDescription(this.DepartmentMaster.controls['status'].value)
    );

    this.cleanRoomGradeService
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
            'Record Updated Successfully'
          );
          this.dialogRef.close();
        }
      });
  }
 async  onSaveConfirmation() {
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

    this.cleanRoomGradeService
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
          this.notificationService.showSuccess(data.status, () => {
            console.log('Success Snackbar Closed');
          });
          this.dialogRef.close();
        }
      });
  }
  onClear() {
    this.DepartmentMaster.reset();
  }

  openStatusLOV() {
    this.displayedColumns = [
      { field: 'code', title: 'Status Code' },
      { field: 'description', title: 'Status Name' },
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
  onChangeDosageForm() {}
  openDosageFormLOV() {}
  openUOMLOV() {
    this.displayedColumns = [
      { field: 'utCode', title: 'Code' },
      { field: 'utName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'UOM',
        dialogColumns: this.displayedColumns,
        dialogData: this.utMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0016'].setValue(
          this.selectedDialogData.utName
        );
      }
    });
  }
  onChangeUOM() {
    if (this.DepartmentMaster.controls['ff0016'].value == '') {
      this.DepartmentMaster.controls['ff0016'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0016'].value;
      this.utMasterList.forEach((elements) => {
        if (elements.utCode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0016'].setErrors({ incorrect: true });
        this.openUOMLOV();
      }
    }
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


  onChangePlantCode2() {
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
        this.openBusinessUnitCodeLOV2();
      }
    }
  }
  openBusinessUnitCodeLOV2() {
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'crg Master',
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
}

