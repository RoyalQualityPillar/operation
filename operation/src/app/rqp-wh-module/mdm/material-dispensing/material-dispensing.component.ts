import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { PpService } from 'src/app/rqp-pp-module/pp.service';

@Component({
  selector: 'app-material-dispensing',
  standalone: false,
  templateUrl: './material-dispensing.component.html',
  styleUrl: './material-dispensing.component.scss'
})
export class MaterialDispensingComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public materialDispensingListData: any;
  public dataSource: any;
  public isLoading = false;
  public selectRow: any;
  displayedColumns = [
        'action',
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
  ];
  constructor(
    private ppService: PpService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
     private router: Router
  ) { }
  ngOnInit(): void {
    let unitCode = this.cookieService.get('buCode');
    this.ppService.PlanOrderMrpList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.materialDispensingListData = new MatTableDataSource(this.dataSource);
      this.materialDispensingListData.sort = this.sort;
      this.materialDispensingListData.paginator = this.paginator;
    });
  }
  setSelectedID(row: any) {
  this.selectRow = row;
}
  public pageChanged(event): void {
    if (this.materialDispensingListData.length == GlobalConstants.size) {
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
    value = this.selectRow  
   sessionStorage.setItem('selectRow', JSON.stringify(value));
    this.router.navigate(['./rqpoperationui/wh/material-reserved-list']);
    // this.ppService.savePlanOrderMrpList(value.uc0001).subscribe((data: any) => {
    //   if (data.errorInfo != null) {
    //     this.isLoading = false;
    //     this.dialog.open(MessageDialogComponent, {
    //       data: {
    //         message: data.errorInfo.message,
    //         heading: 'Error Information',
    //       },
    //     });
    //   } else {
    //     this.isLoading = false;
    //     this.notificationService.showSuccess(data.status, () => {
    //       console.log('Success Snackbar Closed');
    //     });
    //   }
    // });
  }

}


