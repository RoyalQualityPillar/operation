import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { NotificationService } from 'src/app/common/notification.service';
import { ShowMaterialIssuanceComponent } from 'src/app/rqp-pp-module/mrp/show-material-issuance/show-material-issuance.component';
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
    'ff0006',
    'ff0007',
    'ff0005',
    'lc0003',
    'status',
    'createdon',
    'createdby',
  ];
  constructor(
    private ppService: PpService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
     private router: Router,
  ) { }
  ngOnInit(): void {
    const storedValue = sessionStorage.getItem('selectRow');
    let value = JSON.parse(storedValue);
    let unitCode = this.cookieService.get('buCode');
    let lc0005 = value.lc0005;
    this.ppService.materialReservedList(unitCode, lc0005).subscribe((data: any) => {
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
  //  sessionStorage.setItem('selectRow', JSON.stringify(value));
  //   this.router.navigate(['./rqpoperationui/wh/material-reserved-pack-list']);
   
this.dialog.open(ShowMaterialIssuanceComponent, {
  minWidth: '80%',
  data: { tableData:value, pageTitle: 'Material Weights'}
});

  }

}


