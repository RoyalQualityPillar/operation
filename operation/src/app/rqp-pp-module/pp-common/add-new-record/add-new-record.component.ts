import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { PmsListComponent } from 'src/app/rqp-dms-module/dms/pms-list/pms-list.component';
import { AdminService } from 'src/app/rqp-dms-module/dms/service/admin.service';
import { DmsService } from 'src/app/rqp-dms-module/dms/service/dms.service';
import { MessageService } from 'src/app/service/message.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';

export interface userData {
  userData: any;
  type: any;
  tableData: any;
}
@Component({
  selector: 'app-add-new-record',
  standalone: false,
  templateUrl: './add-new-record.component.html',
  styleUrl: './add-new-record.component.scss'
})
export class AddNewRecordComponent implements OnInit {
  public psmList: any[] = [];
  HeaderForm: FormGroup;
  public isSubjectCodeSuccess: boolean;
  displayedColumns: any;
  selectedDialogData: any;
  public marketValue: any;
  public bmrProductNumber:any;
  isLoading = false;
  isPlantCodeSuccess = false;
  unitList: any;
  isUpdate = false;
  isStatusSuccess = false;
  statusList: any;
  bmrNumberData: any;
  addRecord = new FormGroup({
    productNo: new FormControl(''),
    productTypeCode: new FormControl(''),
    bmrCode: new FormControl(''),
    bmrSerialNo: new FormControl(''),
    bmrDraftCode: new FormControl(''),
    bmrDraftSerialNo: new FormControl(''),
    batchCode: new FormControl(''),
    batchNo: new FormControl(''),
    unitcode: new FormControl(''),
    status: new FormControl(''),
    createdby: new FormControl(''),
    comments: new FormControl(''),
  });

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public userData: userData,
    private messageService: MessageService,
    private cookieService: CookieService,
    private dmsService: DmsService,
    private adminService: AdminService,
    private remoteLoader: RemoteComponentLoaderService,
    private notificationService: NotificationService,
      public dialogRef: MatDialogRef<AddNewRecordComponent>,
  ) { }
  ngOnInit(): void {
    this.bmrNumberData = this.userData.tableData;
    this.addRecord.controls['unitcode'].patchValue(
      this.cookieService.get('buCode')
    );
    this.dmsService.bmrInput(this.cookieService.get('buCode')).subscribe(({ data }) => {
      this.psmList = data.pmsList;
    });
    this.onLoadStatusDropDown();
    if (this.bmrNumberData) {
      this.addRecord.patchValue({
        productNo: this.bmrNumberData.ff0002
      });
    }
  }
  onLoadStatusDropDown() {
    this.isLoading = true;
    this.adminService.getDropDownList().subscribe((data: any) => {
      this.statusList = data.data.statusInfo2;
      this.isLoading = false;
    });
  }
  onChangeProductNo() {
    if (this.addRecord.controls['productNo'].value == '') {
      this.addRecord.controls['productNo'].setValue('');
    } else {
      let statusCurrentValue = this.addRecord.controls['productNo'].value;
      this.data.psmList.forEach((elements) => {
        if (elements.mdGName == statusCurrentValue) {
          this.isSubjectCodeSuccess = true;
        }
      });
      if (this.isSubjectCodeSuccess == false) {
        this.addRecord.controls['productNo'].setErrors({
          incorrect: true,
        });
        this.openProductNoLOV();
      }
    }
  }

  openProductNoLOV() {
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
        dialogData: this.data.psmList,
        lovName: 'statusList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.addRecord.controls['productNo'].setValue(
          this.selectedDialogData.productNO
        );
      }
    });
  }
  onChangeSubject() {
    if (this.addRecord.controls['productNo'].value == '') {
      this.addRecord.controls['productNo'].setValue('');
    } else {
      let statusCurrentValue = this.addRecord.controls['productNo'].value;
      this.psmList.forEach((elements) => {
        if (elements.mdGName == statusCurrentValue) {
          this.isSubjectCodeSuccess = true;
        }
      });
      if (this.isSubjectCodeSuccess == false) {
        this.addRecord.controls['productNo'].setErrors({
          incorrect: true,
        });
        this.openStatusLOV1();
      }
    }
  }

  openStatusLOV1() {
    this.displayedColumns = [
      { field: 'productNO', title: 'Product No' },
      { field: 'productName', title: 'Product Name' },
      { field: 'productCode', title: 'Product Code' },
      { field: 'market', title: 'Market' },
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
        this.marketValue = this.selectedDialogData.market;
        this.bmrProductNumber = this.selectedDialogData.productNO;
        this.addRecord.controls['productNo'].setValue(
          this.selectedDialogData.productCode
        );
        this.addRecord.controls['productTypeCode'].setValue(
          this.selectedDialogData.market
        );

      }
    });
  }
  // public submit(): void {
  //   const { productNo, bmrCode, bmrSerialNo, bmrDraftCode, bmrDraftSerialNo } =
  //     this.addRecord.value;

  //   const payload = {
  //     uc0001: productNo,
  //     unitcode: '',
  //     ff0001: '',
  //     ff0002: '',
  //     ff0003: '',
  //     ff0004: 0,
  //     ff0005: '',
  //     ff0006: 0,
  //     ff0007: '',
  //     ff0008: '',
  //     ff0009: '',
  //     ff0010: '',
  //     ff0011: '',
  //     ff0012: '',
  //     ff0013: '',
  //     ff0014: '',
  //     ff0015: '',
  //     ff0016: '',
  //     ff0018: bmrDraftCode,
  //     ff0019: bmrCode,
  //     ff0020: bmrSerialNo,
  //     ff0021: bmrDraftSerialNo,
  //     bucode: '',
  //     createdby: '',
  //     status: 0,
  //     comments: '',
  //     lc0002: '',
  //     lc0004: '',
  //     lc0003: '',
  //     lc0005: '',
  //     lc0001: '',
  //     lc0006: '',
  //   };

  //   this.dmsService.pmBmrUpdate(payload).subscribe((data) => {
  //     if (data.errorInfo != null) {
  //       this.dialog.open(MessageDialogComponent, {
  //         data: {
  //           message: data.errorInfo.message,
  //           heading: 'Error Information',
  //         },
  //       });
  //     } else {
  //       this.messageService.sendSnackbar(
  //         'success',
  //         `${productNo} Record inserted successfully`
  //       );
  //     }
  //   });
  // }
  public async onUpdateConfirmation() {
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
          this.submit();
        }
      }
    });
  }
  public submit(): void {
    const { productNo, bmrCode, bmrSerialNo, bmrDraftCode, batchNo, batchCode, bmrDraftSerialNo, comments } =
      this.addRecord.value;

    const payload = {
      uc0001: productNo,
      unitcode: this.cookieService.get('buCode'),
      ff0001: this.bmrProductNumber,
      ff0002: bmrDraftCode,
      ff0003: bmrCode,
      ff0004: bmrSerialNo,
      ff0005: bmrDraftSerialNo,
      ff0006: this.marketValue,
      ff0007: '',
      ff0008: '',
      ff0009: batchNo,
      ff0010: batchCode,
      createdby: '',
      status: 0,
      comments: comments,
    };

    this.dmsService.pmBmrUpdate(payload).subscribe((data) => {
      if (data.errorInfo != null) {
        this.dialog.open(MessageDialogComponent, {
          data: {
            message: data.errorInfo.message,
            heading: 'Error Information',
          },
        });
      } else {
        // this.messageService.sendSnackbar(
        //   'success',
        //   `${productNo} Record inserted successfully`
        // ); 
        this.notificationService.showSuccess(data.status, () => { });
 this.dialogRef.close();
      }
    });
  }

  openBusinessUnitCodeLOV() {
    this.displayedColumns = [
      { field: 'unitCode', title: 'Organization Code' },
      { field: 'unitName', title: 'Organization Name' },
    ];
    if (this.unitList.length > 0) {
      const dialogRef = this.dialog.open(LovDialogComponent, {
        height: '500px',
        width: '600px',
        data: {
          dialogTitle: 'Life Cycle Number',
          dialogColumns: this.displayedColumns,
          dialogData: this.unitList,
          lovName: 'businessUnitList',
        },
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.selectedDialogData = result.data;
          this.addRecord.controls['unitcode'].setValue(
            this.selectedDialogData.unitCode
          );
        }
      });
    }
  }

  onChangePlantCode() {
    if (this.addRecord.controls['unitcode'].value == '') {
      this.addRecord.controls['unitcode'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.addRecord.controls['unitcode'].value;
      this.isPlantCodeSuccess = false;
      this.unitList.forEach((elements) => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.addRecord.controls['unitcode'].setErrors({ incorrect: true });
        this.openBusinessUnitCodeLOV();
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
        this.addRecord.controls['status'].setValue(
          this.selectedDialogData.description
        );
      }
    });
  }

  onChangeStatus() {
    if (this.addRecord.controls['status'].value == '') {
      this.addRecord.controls['status'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.addRecord.controls['status'].value;
      this.statusList.forEach((elements) => {
        if (elements.description == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.addRecord.controls['status'].setErrors({ incorrect: true });
        this.openStatusLOV();
      }
    }
  }
}

