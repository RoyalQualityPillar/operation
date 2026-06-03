import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { PpService } from '../../pp.service';
import { NotificationService } from 'src/app/common/notification.service';

@Component({
  selector: 'app-approved-material-list',
  standalone: false,
  templateUrl: './approved-material-list.component.html',
  styleUrl: './approved-material-list.component.scss'
})
export class ApprovedMaterialListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public tableData: MatTableDataSource<any> = new MatTableDataSource<any>();
  private dataSource: any;
  public isLoading = false;
  public selectRow: any;
  private pageIndex = 0;
  private newList: any;
  private size: any;
  private copiedData: any;
  public tableDataLoaded = false;
  private lifeCycleInfoDataLength: any;
  public fairRecords: any;
  public materialListValue: any;
  public addedUserdisplayedColumns: string[] = [
    'action',
    'ff0001',
    'ff0002',
    'ff0004',
    'ff0005',
    'ff0012',
    'createdon',
    'createdby',
  ];
  constructor(
    public lifeCycleDataService: LifeCycleDataService,
    private toolbarService: ToolbarService,
    @Inject(MAT_DIALOG_DATA) public data,
    public cookieService: CookieService,
    private apiService: ApiService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ApprovedMaterialListComponent>,
    private ppService: PpService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.materialListValue = this.data.tableData;
    let unitcode = this.cookieService.get('buCode');
    let ff0001 = this.materialListValue.ff0001;
    let lc0005 = this.materialListValue.lc0005;

    this.ppService.getApprovedMaterialListData(unitcode, ff0001, lc0005)
      .subscribe((data: any) => {
        if (data.data?.length > 0) {
          this.fairRecords = data.data
          this.tableData = new MatTableDataSource(this.fairRecords);
          this.tableData.paginator = this.paginator;
          this.tableData.sort = this.sort;
        } else {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: 'No Data Found For Given Input',
              heading: 'Error Information',
            },
          });
        }

      });
  }
  setSelectedID(row: any) {
    this.selectRow = row;
  }
  public pageChanged(event): void {
    if (this.dataSource?.length == GlobalConstants.size && Array.isArray(this.dataSource)) {
      if (
        event.length - (event.pageIndex + 1) * event.pageSize == 0 ||
        event.length < event.pageSize
      ) {
        this.onPaginationCall();
      }
    }
  }
  private onPaginationCall(): void {
    this.pageIndex = this.pageIndex + 1;
    this.size = GlobalConstants.size;
    this.isLoading = true;
    this.lifeCycleDataService
      .getLifeCycleInfo(this.pageIndex, this.size)
      .subscribe((data: any) => {
        this.newList = data.data.content;
        this.dataSource.push(...this.newList);
        this.lifeCycleInfoDataLength = this.dataSource.length;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded = true;
        this.toolbarService.setTableData(this.dataSource);
        this.isLoading = false;
      });
    this.isLoading = false;
  }
  public getVersion(row): string {
    const ff0007 = row.ff0007 ?? '';
    const ff0008 = row.ff0008 ?? '';
    const ff0009 = row.ff0009 ?? '';
    const ff0010 = row.ff0010 ?? '';
    return `${ff0007}.${ff0008}.${ff0009}.${ff0010}`;
  }

  onSubmit(row) {
    row = this.selectRow;
    let uc0001 = this.materialListValue.uc0001;
    let lc0005 = this.materialListValue.lc0005;
    this.ppService.savePlanOrderMrpList(uc0001, lc0005, row.uc0001).subscribe((data: any) => {
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
        this.dialogRef.close();
      }
    });
  }
}

