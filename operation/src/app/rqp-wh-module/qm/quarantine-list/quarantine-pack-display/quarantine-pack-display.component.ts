import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { NotificationService } from 'src/app/common/notification.service';
import { WhService } from 'src/app/rqp-wh-module/wh.service';

@Component({
  selector: 'app-quarantine-pack-display',
  standalone: false,
  templateUrl: './quarantine-pack-display.component.html',
  styleUrl: './quarantine-pack-display.component.scss'
})
export class QuarantinePackDisplayComponent implements OnInit {
   @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
public quarantineListData: any;
public dataSource: any;
 public isLoading = false;
 public selectedRow: any;
 public selectRow: any;
 lc0003:any
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
private whService:WhService,
private cookieService: CookieService,
public dialog: MatDialog,
private notificationService: NotificationService,
private router: Router
){}
  ngOnInit(): void {
     const storedData = sessionStorage.getItem('selectRow');
    this.selectRow = JSON.parse(storedData);
    this.lc0003 = this.selectRow.lc0003;
  this.whService.quarantineDisplayList(this.lc0003).subscribe((data: any) => {
        // this.dataSource = data;
        // this.quarantineListData = new MatTableDataSource(this.dataSource);
        // this.quarantineListData.sort = this.sort;
        // this.quarantineListData.paginator = this.paginator;
         
      
      });      
}

setSelectedID(row: any) {
  this.selectRow = row;
}

 public pageChanged(event): void {
    if (this.quarantineListData.length == GlobalConstants.size) {
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
//  this.whService.savequarantineList(value.uc0001).subscribe((data: any) => {
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
