import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { WhService } from '../../wh.service';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from 'src/app/common/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quarantine-list',
  standalone: false,
  templateUrl: './quarantine-list.component.html',
  styleUrl: './quarantine-list.component.scss'
})
export class QuarantineListComponent implements OnInit {
   @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
public quarantineListData: any;
public dataSource: any;
 public isLoading = false;
 public selectedRow: any;
 public selectRow: any;
 displayedColumns = [
    'action',
    'ff0001',
    'ff0003',
    'ff0004',
    'ff0006',
    'createdon',
    'createdby',
  ];
constructor(
private whService:WhService,
 private cookieService: CookieService,
  public dialog: MatDialog,
     private notificationService: NotificationService,
     private router: Router
){}
  ngOnInit(): void {
     let unitCode = this.cookieService.get('buCode');
   this.whService.quarantineList(unitCode).subscribe((data: any) => {
        this.dataSource = data.data;
        this.quarantineListData = new MatTableDataSource(this.dataSource);
        this.quarantineListData.sort = this.sort;
        this.quarantineListData.paginator = this.paginator;
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
value = this.selectRow  
   sessionStorage.setItem('selectRow', JSON.stringify(value));
    this.router.navigate(['./rqpoperationui/wh/quarantine-display-list']);
}
 

}
