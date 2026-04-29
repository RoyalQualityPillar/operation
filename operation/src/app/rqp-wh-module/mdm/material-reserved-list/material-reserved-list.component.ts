import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { NotificationService } from 'src/app/common/notification.service';
import { PpService } from 'src/app/rqp-pp-module/pp.service';

@Component({
  selector: 'app-material-reserved-list',
  standalone: false,
  templateUrl: './material-reserved-list.component.html',
  styleUrl: './material-reserved-list.component.scss'
})
export class MaterialReservedListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public materialReservedListData: any;
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
    this.ppService.materialReservedList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.materialReservedListData = new MatTableDataSource(this.dataSource);
      this.materialReservedListData.sort = this.sort;
      this.materialReservedListData.paginator = this.paginator;
    });
  }
  setSelectedID(row: any) {
  this.selectRow = row;
}
  public pageChanged(event): void {
    if (this.materialReservedListData.length == GlobalConstants.size) {
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
    this.router.navigate(['./rqpoperationui/wh/material-reserved-pack-list']);
   
  }

}


