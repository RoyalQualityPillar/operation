import { Component, OnInit, ViewChild } from '@angular/core';
import { PpService } from '../../pp.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';

@Component({
  selector: 'app-material-requ-verf',
  standalone: false,
  templateUrl: './material-requ-verf.component.html',
  styleUrl: './material-requ-verf.component.scss'
})
export class MaterialRequVerfComponent implements OnInit {
   @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
public planningOrderListData: any;
public dataSource: any;
 public isLoading = false;
 displayedColumns = [
    'lc0005',
    'ff0001',
    'ff0002',
    'ff0003',
     'ff0004',
    'ff0005',
    'ff0012',
    'ff0014',
    'lc0003',
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
   this.ppService.PlanOrderMrpList(unitCode).subscribe((data: any) => {
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

public submit(value:any){
 this.ppService.savePlanOrderMrpList(value.uc0001).subscribe((data: any) => {
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


