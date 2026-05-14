import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { PpService } from 'src/app/rqp-pp-module/pp.service';

@Component({
  selector: 'app-fg-quarantine-list',
  standalone: false,
  templateUrl: './fg-quarantine-list.component.html',
  styleUrl: './fg-quarantine-list.component.scss'
})
export class FgQuarantineListComponent implements OnInit {
   public fgQuarantineStatusListForm:FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public planningOrderListData: any;
  public dataSource: any;
  public isLoading = false;
  displayedColumns = [
    'ff0001',
    'ff0003',
    'ff0004',
    'ff0006',
    'createdon',
    'createdby',
    'action',
  ];
  constructor(
    private ppService: PpService,
    private cookieService: CookieService,
    public dialog: MatDialog,
     private fb:FormBuilder,
    private notificationService: NotificationService,
  ) {
    this.fgQuarantineStatusListForm = fb.group({
      documentName: [''],
      status:['']
    });
   }
  ngOnInit(): void {
    let unitCode = this.cookieService.get('buCode');
    this.ppService.getFgQuarantineList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.planningOrderListData = new MatTableDataSource(this.dataSource);
      this.planningOrderListData.sort = this.sort;
      this.planningOrderListData.paginator = this.paginator;
    });
  }
  public pageChanged(event): void {
    if (this.planningOrderListData.length == GlobalConstants.size) {
      if (
        event.length - (event.pageIndex + 1) * event.pageSize == 0 ||
        event.length < event.pageSize
      ) {
        this.onPaginationCall();
      }
    }
  }

  public onPaginationCall(): void {
    //todo
  }

  public submit(value: any) {
     const quarantineStatus = this.fgQuarantineStatusListForm.value;
    this.ppService.saveFgQuarantineList(value.uc0001,quarantineStatus.status ).subscribe((data: any) => {
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
        });
      }
    });
  }

}

