import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { PpService } from '../../pp.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';

@Component({
  selector: 'app-show-material-issuance',
  standalone: false,
  templateUrl: './show-material-issuance.component.html',
  styleUrl: './show-material-issuance.component.scss'
})
export class ShowMaterialIssuanceComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public MaterialIssuanceForm: FormGroup;
  public materialIssuanceData: any;
  public materialValue: any;
  public selectedDialogData: any;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private remoteLoader: RemoteComponentLoaderService,
    public dialog: MatDialog,
    private ppService: PpService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data,

  ) {
    this.MaterialIssuanceForm = fb.group({
      nareWeight: [''],
      grossWeight: [''],
      netWeight: ['']
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
  Submit() {
    const materialweights = this.MaterialIssuanceForm.value;
    const payload = {
      uc0001: this.materialValue.uc0001,
      ff0006: materialweights.nareWeight,
      ff0007: materialweights.grossWeight,
      ff0008: materialweights.netWeight,
      lc0003: this.materialValue.lc0003,
      lc0005: this.materialValue.gr_lc0005
    }
    this.ppService.saveMaterialIssuance(payload).subscribe((data: any) => {
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
      }
    });
  }
}
