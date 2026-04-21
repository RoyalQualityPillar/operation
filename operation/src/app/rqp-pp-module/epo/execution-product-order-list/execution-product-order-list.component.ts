import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { PpService } from '../../pp.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';

@Component({
  selector: 'app-execution-product-order-list',
  standalone: false,
  templateUrl: './execution-product-order-list.component.html',
  styleUrl: './execution-product-order-list.component.scss'
})
export class ExecutionProductOrderListComponent implements OnInit {
   @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
public executionProductData: any;
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
private ppService:PpService,
 private cookieService: CookieService,
  public dialog: MatDialog,
     private notificationService: NotificationService,
){}
  ngOnInit(): void {
     let unitCode = this.cookieService.get('buCode');
   this.ppService.qualityStatusList(unitCode).subscribe((data: any) => {
        this.dataSource = data.data;
        this.executionProductData = new MatTableDataSource(this.dataSource);
        this.executionProductData.sort = this.sort;
        this.executionProductData.paginator = this.paginator;
      });
}
 public pageChanged(event): void {
    if (this.executionProductData.length == GlobalConstants.size) {
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

public submit(value:any){
 this.ppService.saveExecutionProductOrderList(value.uc0001).subscribe((data: any) => {
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
