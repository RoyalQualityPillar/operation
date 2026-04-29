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

@Component({
  selector: 'app-material-issuance',
  standalone: false,
  templateUrl: './material-issuance.component.html',
  styleUrl: './material-issuance.component.scss'
})
export class MaterialIssuanceComponent implements OnInit {
   @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
public planOrderMRPListData: any;
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
   this.ppService.getPlanOrderMRPList(unitCode).subscribe((data: any) => {
        this.dataSource = data.data;
        this.planOrderMRPListData = new MatTableDataSource(this.dataSource);
        this.planOrderMRPListData.sort = this.sort;
        this.planOrderMRPListData.paginator = this.paginator;
      });
}
 public pageChanged(event): void {
    if (this.planOrderMRPListData.length == GlobalConstants.size) {
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
 this.ppService.savePlanOrderMRPList(value.uc0001).subscribe((data: any) => {
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
