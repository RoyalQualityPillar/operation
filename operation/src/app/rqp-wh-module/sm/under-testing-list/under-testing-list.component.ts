import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { WhService } from '../../wh.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';

@Component({
  selector: 'app-under-testing-list',
  standalone: false,
  templateUrl: './under-testing-list.component.html',
  styleUrl: './under-testing-list.component.scss'
})
export class UnderTestingListComponent implements OnInit {
  public tableData:any;
  public isLoading = false;
 public addedUserdisplayedColumns: string[] = [
    'lc0002',
    'ff0001',
    'ff0004',
    'ff0002',
    'gr_ff0004',
    'gr_ff0002',
    'ff0005',
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
  ){}
  ngOnInit(): void {
   const userId = this.cookieService.get('unitCode');
    this.whService.underTestingList(this.cookieService.get('buCode')).subscribe(({ data }) => {
      this.tableData = data;
    }); 
  }
  public pageChanged(event): void {
    if (this.tableData?.length == GlobalConstants.size && Array.isArray(this.tableData)) {
      if (
        event.length - (event.pageIndex + 1) * event.pageSize == 0 ||
        event.length < event.pageSize
      ) {
        this.onPaginationCall();
      }
    }
  }
  private onPaginationCall(): void {
   
  }
  public onSubmit(row: any): void {
     console.log(row)
     this.whService.saveTestList(row.uc0001).subscribe((data: any) => {
       console.log(data);
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
           console.log('Success Snackbar Closed');
         });
       }
     });
   }
}
