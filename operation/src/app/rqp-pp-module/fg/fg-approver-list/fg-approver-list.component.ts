import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PpService } from '../../pp.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { FgLocationUpdateComponent } from '../fg-location-update/fg-location-update.component';

@Component({
  selector: 'app-fg-approver-list',
  standalone: false,
  templateUrl: './fg-approver-list.component.html',
  styleUrl: './fg-approver-list.component.scss'
})
export class FgApproverListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public fgApproverListData: any;
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
    private notificationService: NotificationService,
    private remoteLoader: RemoteComponentLoaderService,
  ) { }
  ngOnInit(): void {
    let unitCode = this.cookieService.get('buCode');
    this.ppService.getFgUnderApproverList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.fgApproverListData = new MatTableDataSource(this.dataSource);
      this.fgApproverListData.sort = this.sort;
      this.fgApproverListData.paginator = this.paginator;
    });
  }
  public pageChanged(event): void {
    if (this.fgApproverListData.length == GlobalConstants.size) {
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
    this.dialog.open(FgLocationUpdateComponent, {
      minWidth: '80%',
      data: { tableData: value, pageTitle: 'Approved Material Location' }
    });
  }

}
