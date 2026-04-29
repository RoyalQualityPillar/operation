import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { WhService } from '../../wh.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import { LocationUpdateComponent } from '../location-update/location-update.component';

@Component({
  selector: 'app-approved-material-list',
  standalone: false,
  templateUrl: './approved-material-list.component.html',
  styleUrl: './approved-material-list.component.scss'
})
export class ApprovedMaterialListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public approvedMaterialListData: any;
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
    private whService: WhService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
     private router: Router,
  ) { }
  ngOnInit(): void {   
    let unitCode = this.cookieService.get('buCode');
    this.whService.approverList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.approvedMaterialListData = new MatTableDataSource(this.dataSource);
      this.approvedMaterialListData.sort = this.sort;
      this.approvedMaterialListData.paginator = this.paginator;
    });
  }
  setSelectedID(row: any) {
  this.selectRow = row;
}
  public pageChanged(event): void {
    if (this.approvedMaterialListData.length == GlobalConstants.size) {
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
   
this.dialog.open(LocationUpdateComponent, {
  minWidth: '80%',
  data: { tableData:value, pageTitle: 'Approved Material Location'}
});

  }

}


