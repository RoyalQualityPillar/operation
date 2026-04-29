import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { WhService } from '../../wh.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { PpService } from 'src/app/rqp-pp-module/pp.service';

@Component({
  selector: 'app-material-reserved-pack-list',
  standalone: false,
  templateUrl: './material-reserved-pack-list.component.html',
  styleUrl: './material-reserved-pack-list.component.scss'
})
export class MaterialReservedPackListComponent implements OnInit {
   @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
public materialReservedPackListData: any;
public dataSource: any;
 public isLoading = false;
 public selectedRow: any;
 public selectRow: any;
 lc0005:any
 displayedColumns = [
    //'selectAction',
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
private router: Router
){}
  ngOnInit(): void {
     const storedData = sessionStorage.getItem('selectRow');
    this.selectRow = JSON.parse(storedData);
    this.lc0005 = this.selectRow.lc0005;
  this.ppService.materialReservedPackList(this.lc0005).subscribe((data: any) => {
        this.dataSource = data.data;
        this.materialReservedPackListData = new MatTableDataSource(this.dataSource);
        this.materialReservedPackListData.sort = this.sort;
        this.materialReservedPackListData.paginator = this.paginator;
         
      
      });      
}

setSelectedID(row: any) {
  this.selectRow = row;
}

 public pageChanged(event): void {
    if (this.materialReservedPackListData.length == GlobalConstants.size) {
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

  // this.router.navigate(['./rqpoperationui/wh/quarantine-display-list']);
  //  sessionStorage.setItem('selectRow', JSON.stringify(this.selectRow));
  //   this.router.navigate(['./rqpoperationui/wh/quarantine-display-list']);
//  this.whService.saveQuarantineList(value.uc0001).subscribe((data: any) => {
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
//           console.log('Success Snackbar Closed');
//         });
//       }
//     });
}
 

}
