import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Subject, async, timer, takeUntil } from 'rxjs';
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
import { CalibrationSchService } from '../calibration-sch.service';
import { Router } from '@angular/router';

export interface userData {
  userData: any;
  type: any;
  tableData: any;
}
@Component({
  selector: 'app-create-update-calibration-sch',
  standalone: false,
  templateUrl: './create-update-calibration-sch.component.html',
  styleUrl: './create-update-calibration-sch.component.scss'
})
export class CreateUpdateCalibrationSchComponent implements OnInit {
  isReadOnly = true;
  isUpdate = false;
  DepartmentMaster: FormGroup;
  orgList: any;
  buTypeList: any;
  unitList: any;
  formData: any;
  icMasterList: any;
  deptCodeList: any;
  clfMasterList: any;
  // imMasterList: any;
  cdIndexList: any;
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
     private calibrationSchService: CalibrationSchService,
    public dialogRef: MatDialogRef<CreateUpdateCalibrationSchComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData,
    private apiService: ApiService,
        private remoteLoader: RemoteComponentLoaderService,
        private route:Router
    
  ) {
    this.DepartmentMaster = this.fb.group({
      uc0001: [''],
      ff0004: ['', Validators.required],
      ff0001: ['', Validators.required],
      ff0002: ['', Validators.required],
      ff0003: ['', Validators.required],
      ff0005: ['', Validators.required],
      ff0006: ['', Validators.required],
      ff0007: ['', Validators.required],
      createdby: [''],
      status: [''],
      comments: ['',Validators.required],
      unitcode: ['']
    });
  }

  ngOnInit(): void {
    this.DepartmentMaster.controls['unitcode'].patchValue(
      this.cookieService.get('buCode')
    );
    this.onloadDeptListDropDown();
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
 onloadDeptListDropDown() {
    this.isLoading = true;
    this.calibrationSchService.getDropDownDeptList(this.cookieService.get('buCode')).subscribe((data: any) => {
      console.log(data);
      this.clfMasterList = data.data.clfMasterList;
      // this.imMasterList = data.data.imMasterList;
      this.cdIndexList = data.data.cdIndexList;
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
      .sendRequest(apiEndPoints.calibrationschMasterLoadUpdatePage, 'POST', params)
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
    this.DepartmentMaster.controls['ff0005'].setValue(this.formData.ff0005);
    this.DepartmentMaster.controls['ff0006'].setValue(this.formData.ff0006);
    this.DepartmentMaster.controls['ff0007'].setValue(this.formData.ff0007);
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments);
    let statusByValue = changeStatusByCode(this.formData.status);
    this.DepartmentMaster.controls['status'].setValue(statusByValue);
  }
  onUpdate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['status'].setValue(
      changeStatusByDescription(this.DepartmentMaster.controls['status'].value)
    );
    this.calibrationSchService
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
  
    onCreate() {
          this.isLoading = true;
          this.DepartmentMaster.controls['createdby'].setValue(
            this.cookieService.get('userId')
          );
          let params = {};
          this.calibrationSchService
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
                    this.route.navigateByUrl('/rqplabui/lims/calibration-sch-home-page');
                  });
              }
      
      
      
            });
          this.dialogRef.close();
        }
  onClear() {
    this.DepartmentMaster.reset();
  }
  
onChangeModuleNo() {
    if (this.DepartmentMaster.controls['ff0001'].value == '') {
      this.DepartmentMaster.controls['ff0001'].setValue('');
      this.DepartmentMaster.controls['ff0002'].setValue('');
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0001'].value;
      this.cdIndexList.forEach((elements) => {
        if (elements.productNO == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0001'].setErrors({ incorrect: true });
        this.DepartmentMaster.controls['ff0002'].setErrors({ incorrect: true });
        this.openCIndexListLOV();
      }
    }
  }
   openCIndexListLOV() {
    this.displayedColumns = [
      { field: 'ff0001', title: 'Department Name' },
      { field: 'lc0002', title: 'Department Code' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Cd Index List',
        dialogColumns: this.displayedColumns,
        dialogData: this.cdIndexList,
        lovName: 'deptCodeList',
      },

      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0001'].setValue(
          this.selectedDialogData.ff0001
        );
        this.DepartmentMaster.controls['ff0002'].setValue(
          this.selectedDialogData.lc0002
        );
      }
    });
  }

  onChangeSheetNo() {
    if (this.DepartmentMaster.controls['ff0002'].value == '') {
      this.DepartmentMaster.controls['ff0002'].setValue('');
      this.DepartmentMaster.controls['ff0001'].setValue('');
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0002'].value;
      this.cdIndexList.forEach((elements) => {
        if (elements.productNO == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0002'].setErrors({ incorrect: true });
        this.DepartmentMaster.controls['ff0001'].setErrors({ incorrect: true });
        this.openCIndexListLOV();
      }
    }
  }

   onChangeFrequencyCode() {
    if (this.DepartmentMaster.controls['ff0003'].value == '') {
      this.DepartmentMaster.controls['ff0003'].setValue('');
      this.DepartmentMaster.controls['ff0006'].setValue('');
      this.DepartmentMaster.controls['ff0007'].setValue('');
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0003'].value;
      this.clfMasterList.forEach((elements) => {
        if (elements.productNO == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0003'].setErrors({ incorrect: true });
        this.DepartmentMaster.controls['ff0006'].setErrors({ incorrect: true });
        this.DepartmentMaster.controls['ff0007'].setErrors({ incorrect: true });
        this.openFrequencyListLOV();
      }
    }
  }
    onChangeScheduleCount() {
    if (this.DepartmentMaster.controls['ff0006'].value == '') {
      this.DepartmentMaster.controls['ff0006'].setValue('');
      this.DepartmentMaster.controls['ff0003'].setValue('');
      this.DepartmentMaster.controls['ff0007'].setValue('');
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0006'].value;
      this.clfMasterList.forEach((elements) => {
        if (elements.productNO == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0006'].setErrors({ incorrect: true });
        this.DepartmentMaster.controls['ff0003'].setErrors({ incorrect: true });
        this.DepartmentMaster.controls['ff0007'].setErrors({ incorrect: true });
        this.openFrequencyListLOV();
      }
    }
  }
    onChangeFrequencyType() {
    if (this.DepartmentMaster.controls['ff0007'].value == '') {
      this.DepartmentMaster.controls['ff0007'].setValue('');
      this.DepartmentMaster.controls['ff0003'].setValue('');
      this.DepartmentMaster.controls['ff0006'].setValue('');
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0007'].value;
      this.clfMasterList.forEach((elements) => {
        if (elements.productNO == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0007'].setErrors({ incorrect: true });
        this.DepartmentMaster.controls['ff0003'].setErrors({ incorrect: true });
        this.DepartmentMaster.controls['ff0006'].setErrors({ incorrect: true });
        this.openFrequencyListLOV();
      }
    }
  }


   openFrequencyListLOV() {
    this.displayedColumns = [
      { field: 'ff0001', title: 'Frequency Code' },
      { field: 'ff0002', title: 'Schedule Count' },
      { field: 'ff0003', title: 'Frequency Type' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Clf Master List',
        dialogColumns: this.displayedColumns,
        dialogData: this.clfMasterList,
        lovName: 'deptCodeList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        
        this.DepartmentMaster.controls['ff0003'].setValue(
          this.selectedDialogData.ff0002
        );
        this.DepartmentMaster.controls['ff0006'].setValue(
          this.selectedDialogData.ff0001
        );
        this.DepartmentMaster.controls['ff0007'].setValue(
          this.selectedDialogData.ff0003
        );
      }
    });
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
 onChangePlantCode2 () {
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





