import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
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
  public quarantineListForm: FormGroup;
  public quarantineListData: any;
  public dataSource: any;
  public isLoading = false;
  public selectedRow: any;
  public selectRow: any;
  lc0003: any
  displayedColumns = [
    //'selectAction',
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
    'action',
  ];
  constructor(
    private whService: WhService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.quarantineListForm = fb.group({
      status: ['']
    });
  }
  ngOnInit(): void {
    const storedData = sessionStorage.getItem('selectRow');
    this.selectRow = JSON.parse(storedData);
    this.lc0003 = this.selectRow.lc0003;
    this.whService.quarantineDisplayList(this.lc0003).subscribe((data: any) => {
      this.dataSource = data.data.mergedList;
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

  public submit(value: any) {

    let quarantineValue = value;
    let uc0001 = quarantineValue.uc0001;
    let status = this.quarantineListForm.value.status;
    if (!status) {
      this.notificationService.showError('Please Select Status');
      return;
    }
    this.whService.saveQuarantineList(uc0001, status).subscribe((data: any) => {
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
        });
      }
    });
  }


}
