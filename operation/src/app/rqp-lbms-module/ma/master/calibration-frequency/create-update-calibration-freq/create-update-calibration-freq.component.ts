import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Subject, timer, takeUntil } from 'rxjs';
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
import { CalibrationFreqService } from '../calibration-freq.service';
import { Router } from '@angular/router';

export interface userData {
  userData: any;
  type: any;
  tableData: any;
}
@Component({
  selector: 'app-create-update-calibration-freq',
  standalone: false,
  templateUrl: './create-update-calibration-freq.component.html',
  styleUrl: './create-update-calibration-freq.component.scss'
})
export class CreateUpdateCalibrationFreqComponent implements OnInit {
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
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private notificationService: NotificationService,
    public buttonLabelService: ButtonLabelService,
    private cookieService: CookieService,
    private calibrationFreqService: CalibrationFreqService,
    public dialogRef: MatDialogRef<CreateUpdateCalibrationFreqComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData,
    private apiService: ApiService,
    private remoteLoader: RemoteComponentLoaderService,
    private route: Router

  ) {
    this.DepartmentMaster = this.fb.group({
      uc0001: [''],
      ff0001: ['', Validators.required],
      ff0002: ['', Validators.required],
      ff0003: ['', Validators.required],
      ff0004: ['', Validators.required],
      createdby: [''],
      status: [''],
      comments: ['', Validators.required],
      unitcode: ['']
    });
  }

  ngOnInit(): void {
    this.DepartmentMaster.controls['unitcode'].patchValue(
      this.cookieService.get('buCode')
    );
    // this.DepartmentMaster.controls['ff0004'].patchValue(
    //   this.cookieService.get('buCode')
    // );
    // this.onLoadStatusDropDown();
    this.onloadDropDown();
    this.onloadDFListDropDown();
    this.onLoadStatusDropDown();

    if (this.userData.type == 'Modification') {
      this.isReadOnly = true;
      this.isUpdate = true;
      this.onLoadFormValue();
    } else {
      this.isReadOnly = false;
      this.isUpdate = false;
    }
  }
  dfList: any;
  onloadDFListDropDown() {
    this.isLoading = true;
    this.calibrationFreqService.getDropDownList(this.cookieService.get('buCode')).subscribe((data: any) => {
      console.log(data);
      this.dfList = data.data.dfList;
      this.isLoading = false;
    });
  }
  buUnitList: any;
  mtMasterList: any;
  utMasterList: any;
  onloadDropDown() {
    this.isLoading = true;
    this.calibrationFreqService.getDropDownList(this.cookieService.get('buCode')).subscribe((data: any) => {
      console.log(data);
      this.buUnitList = data.data.buUnitList;
      this.mtMasterList = data.data.mtMasterList;
      this.utMasterList = data.data.utMasterList;
      this.isLoading = false;
    });
  }
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
    let UC0002 = this.userData.tableData.uc0002;
    const params = { UC0001, UC0002 };

    this.apiService
      .sendRequest(apiEndPoints.calibrationfreqMasterLoadUpdatePage, 'POST', params)
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
    this.DepartmentMaster.controls['ff0001'].setValue(this.formData.ff0001);
    this.DepartmentMaster.controls['ff0002'].setValue(this.formData.ff0002);
    this.DepartmentMaster.controls['ff0003'].setValue(this.formData.ff0003);
    this.DepartmentMaster.controls['ff0004'].setValue(this.formData.ff0004);
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments);
    let statusByValue = changeStatusByCode(this.formData.status);
    this.DepartmentMaster.controls['status'].setValue(statusByValue);
  }
  onUpdate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['status'].setValue(
      changeStatusByDescription(this.DepartmentMaster.controls['status'].value)
    );
    this.calibrationFreqService
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
  async onSaveConfirmation() {
    //  if(this.documentDtoList.length > 0){
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
  // onCreate() {
  //   this.isLoading = true;
  //   this.DepartmentMaster.controls['ff0010'].setValue('test');
  //   this.DepartmentMaster.controls['ff0012'].setValue('test');
  //   this.DepartmentMaster.controls['ff0013'].setValue('test');
  //   this.DepartmentMaster.controls['ff0014'].setValue('test');
  //   this.DepartmentMaster.controls['ff0015'].setValue('test');
  //   this.DepartmentMaster.controls['createdby'].setValue(
  //     this.cookieService.get('userId')
  //   );
  //   this.calibrationFreqService
  //     .onCreate(this.DepartmentMaster.value)
  //     .subscribe((data: any) => {
  //       if (data.errorInfo != null) {
  //         this.isLoading = false;
  //         this.dialog.open(MessageDialogComponent, {
  //           data: {
  //             message: data.errorInfo.message,
  //             heading: 'Error Information',
  //           },
  //         });
  //       } else {
  //         this.isLoading = false;
  //         this.notificationService.showSuccess(data.status, () => {
  //           console.log('Success Snackbar Closed');
  //         });
  //         this.dialogRef.close();
  //       }
  //     });
  // }

  onCreate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['createdby'].setValue(
      this.cookieService.get('userId')
    );
    let params = {};
    this.calibrationFreqService
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
              this.route.navigateByUrl('/rqplabui/lims/calibration-freq-home-page');
            });
        }



      });
    this.dialogRef.close();
  }
  onClear() {
    this.DepartmentMaster.reset();
  }
  openPlantCodeLOV() {
    this.displayedColumns = [
      { field: 'buunitcode', title: 'Code' },
      { field: 'buunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Plant Code',
        dialogColumns: this.displayedColumns,
        dialogData: this.buUnitList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0004'].setValue(
          this.selectedDialogData.buunitcode
        );
      }
    });
  }

  onChangePlantCode() {
    if (this.DepartmentMaster.controls['ff0004'].value == '') {
      this.DepartmentMaster.controls['ff0004'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.DepartmentMaster.controls['ff0004'].value;
      this.isPlantCodeSuccess = false;
      this.buUnitList.forEach((elements) => {
        if (elements.buunitcode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.DepartmentMaster.controls['ff0004'].setErrors({ incorrect: true });
        this.openPlantCodeLOV();
      }
    }
  }
  openProductCategoryLOV() {
    this.displayedColumns = [
      { field: 'mtCode', title: 'Product Category Code' },
      { field: 'mtName', title: 'Product Category Name' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Product Category',
        dialogColumns: this.displayedColumns,
        dialogData: this.mtMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0005'].setValue(
          this.selectedDialogData.mtCode
        );
      }
    });
  }
  onChangeProductCategory() {
    if (this.DepartmentMaster.controls['ff0005'].value == '') {
      this.DepartmentMaster.controls['ff0005'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0005'].value;
      this.mtMasterList.forEach((elements) => {
        if (elements.mtCode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0005'].setErrors({ incorrect: true });
        this.openProductCategoryLOV();
      }
    }
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
  onChangeDosageForm() {
    if (this.DepartmentMaster.controls['ff0006'].value == '') {
      this.DepartmentMaster.controls['ff0006'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0006'].value;
      this.dfList.forEach((elements) => {
        if (elements.dfCode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0006'].setErrors({ incorrect: true });
        this.openDosageFormLOV();
      }
    }
  }
  openDosageFormLOV() {
    this.displayedColumns = [
      { field: 'dfCode', title: 'Dosage Form Code' },
      { field: 'dfName', title: 'Dosage Form Name' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Dosage Form',
        dialogColumns: this.displayedColumns,
        dialogData: this.dfList,
        lovName: 'Dosage Form List',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0006'].setValue(
          this.selectedDialogData.dfCode
        );
      }
    });
  }
  openUOMLOV() {
    this.displayedColumns = [
      { field: 'utCode', title: 'UOM Code' },
      { field: 'utName', title: 'UOM Name' },
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
        this.DepartmentMaster.controls['ff0007'].setValue(
          this.selectedDialogData.utName
        );
      }
    });
  }
  onChangeUOM() {
    if (this.DepartmentMaster.controls['ff0007'].value == '') {
      this.DepartmentMaster.controls['ff0007'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0007'].value;
      this.utMasterList.forEach((elements) => {
        if (elements.utCode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0007'].setErrors({ incorrect: true });
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
        dialogTitle: 'Instrument  Category Master',
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







