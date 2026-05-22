import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { LmsService } from 'src/app/rqp-lms-module/lms.service';
import { WhService } from 'src/app/rqp-wh-module/wh.service';

@Component({
  selector: 'app-under-sampling-list-home-page',
  standalone: false,
  templateUrl: './under-sampling-list-home-page.component.html',
  styleUrl: './under-sampling-list-home-page.component.scss'
})
export class UnderSamplingListHomePageComponent implements OnInit {
  public questionBankTable: any;
  public selectedRow: any;
  public isLoading = false;

  public displayedColumns = [
    'lc0002',
    'ff0001',
    'ff0004',
    'ff0002',
    'gr_ff0004',
    // 'gr_ff0003',
    'gr_ff0002',
    'createdon',
    'createdby',
    'action'

  ];

  constructor(
    private whService: WhService,
    private cookieService: CookieService,
    private router: Router,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    const userId = this.cookieService.get('unitCode');
    this.whService.questionBankTable(this.cookieService.get('buCode')).subscribe(({ data }) => {
      this.questionBankTable = data;
    });
  }

  setSelectedID(row: any): void {
    this.selectedRow = row;
  }

  public pageChanged(event): void {
    if (this.questionBankTable.length == GlobalConstants.size) {
      if (
        event.length - (event.pageIndex + 1) * event.pageSize == 0 ||
        event.length < event.pageSize
      ) {
        this.onPaginationCall();
      }
    }
  }

  public onPaginationCall() {
    //todo
  }

  public submit(row: any): void {
    this.whService.saveSampling(row.uc0001).subscribe((data: any) => {
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
