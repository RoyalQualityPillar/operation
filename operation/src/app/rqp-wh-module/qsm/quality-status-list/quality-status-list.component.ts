import { Component, OnInit } from '@angular/core';
import { WhService } from '../../wh.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-quality-status-list',
  standalone: false,
  templateUrl: './quality-status-list.component.html',
  styleUrl: './quality-status-list.component.scss'
})
export class QualityStatusListComponent implements OnInit {
  public qualityStatusListForm:FormGroup;
  public tableData:any;
  public isLoading = false;
   destroy$ = new Subject<void>();
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
    private fb:FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ){
    this.qualityStatusListForm = fb.group({
      documentName: [''],
      status:['']
    });
  }
  ngOnInit(): void {
   const userId = this.cookieService.get('unitCode');
    this.whService.qualityStatusList(this.cookieService.get('buCode')).subscribe(({ data }) => {
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
     const uc0001 = row.uc0001;
     const status = this.qualityStatusListForm.value.status;
     this.whService.saveQualityStatusList(uc0001, status).subscribe((data: any) => {
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
         this.qualityStatusListForm.reset();
         timer(2000)
                     .pipe(takeUntil(this.destroy$))
                     .subscribe(() => {
                       this.router.navigateByUrl('/rqpoperationui/wh/qsm-module-admin');
                     });
       }
     });
   }
}
