import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PpService } from '../../pp.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-fg-reject-list',
  standalone: false,
  templateUrl: './fg-reject-list.component.html',
  styleUrl: './fg-reject-list.component.scss'
})
export class FgRejectListComponent implements OnInit {
   @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
public fgRejectListData: any;
public dataSource: any;
 public isLoading = false;
 displayedColumns = [
    'ff0001',
    'ff0003',
    'ff0004',
    'ff0006',
    'createdon',
    'createdby',
    // 'action',
  ];
constructor(
private ppService:PpService,
 private cookieService: CookieService,
  public dialog: MatDialog,
     private notificationService: NotificationService,
){}
  ngOnInit(): void {
     let unitCode = this.cookieService.get('buCode');
   this.ppService.getFgRejectList(unitCode).subscribe((data: any) => {
        this.dataSource = data.data;
        this.fgRejectListData = new MatTableDataSource(this.dataSource);
        this.fgRejectListData.sort = this.sort;
        this.fgRejectListData.paginator = this.paginator;
      });
}
 public pageChanged(event): void {
    if (this.fgRejectListData.length == GlobalConstants.size) {
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

// public submit(value:any){
//  this.ppService.saveExecutionPlaningOrderList(value.uc0001).subscribe((data: any) => {
//       if (data.errorInfo != null) {
//         this.isLoading = false;
//         this.dialog.open(MessageDialogComponent, {
//           data: {
//             message: data.errorInfo.message,
//             heading: 'Error Information',
//           },
//         });
//       } else {
//         this.isLoading = false;
//         this.notificationService.showSuccess(data.status, () => {
//         });
//       }
//     });
// }

}
