import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { WhService } from 'src/app/rqp-wh-module/wh.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';

@Component({
  selector: 'app-fg-location-update',
  standalone: false,
  templateUrl: './fg-location-update.component.html',
  styleUrl: './fg-location-update.component.scss'
})
export class FgLocationUpdateComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public MaterialLocationForm: FormGroup;
  public materialIssuanceData: any;
  public materialValue: any;
  public selectedDialogData: any;
  public isLoading = false;
  constructor(
    private fb: FormBuilder,
    private remoteLoader: RemoteComponentLoaderService,
    public dialog: MatDialog,
    private whService: WhService,
    @Inject(MAT_DIALOG_DATA) public data,
    private notificationService: NotificationService,
    private router: Router,

  ) {
    this.MaterialLocationForm = fb.group({
      location: [''],
    });
  }

  ngOnInit(): void {
    this.materialValue = this.data.tableData;

  }
  async onSubmitConfirmation() {
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
          this.Submit();
        }
      }
    });
  }
  public async Submit() {
    const materialLocationValue = this.MaterialLocationForm.value;
    let uc0001 = this.materialValue.uc0001;
    let ff0011 = materialLocationValue.location;
    const component = await this.remoteLoader.loadComponentByKey(
      'CommonESignatureComponent'
    );

    const dialogRef = this.dialog.open(component, {
      height: '300px',
      width: '600px',
      data: {},
      disableClose: true,
    });
    this.whService.sfglocationupdatesave(uc0001, ff0011).subscribe((data: any) => {
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
          this.router.navigateByUrl('/rqpoperationui/wh/slc-module-admin');
        });
      }
    });
  }
}

