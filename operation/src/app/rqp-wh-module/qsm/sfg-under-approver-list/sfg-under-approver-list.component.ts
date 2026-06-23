import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';
import { WhService } from '../../wh.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';


@Component({
  selector: 'app-sfg-under-approver-list',
  standalone: false,
  templateUrl: './sfg-under-approver-list.component.html',
  styleUrls: ['./sfg-under-approver-list.component.scss'],
})
export class SfgUnderApproverListComponent implements OnInit {
   @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public sfgunderapproverListForm:FormGroup;
  public tableData:any;
  public isLoading = false;
   destroy$ = new Subject<void>();
 public addedUserdisplayedColumns: string[] = [
    'uc0001',
    'ff0001',
    'ff0006',
    'ff0002',
    'gr_ff0004',
    //'ff0003',
    'gr_ff0002',
    'ff0008',
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
    private remoteLoader: RemoteComponentLoaderService,
  ){
    this.sfgunderapproverListForm = fb.group({
      documentName: [''],
      status:['']
    });
  }
  ngOnInit(): void {
   const userId = this.cookieService.get('unitCode');
    this.whService.sfgUnderApproverList(this.cookieService.get('buCode')).subscribe(({ data }) => {
      this.tableData = data;
    }); 
  }
  ngAfterViewInit() {
  if (this.tableData) {
    
    this.tableData.paginator = this.paginator;
  }
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
  public async onSubmit(row: any): Promise<void> {
    const component = await this.remoteLoader.loadComponentByKey(
        'CommonESignatureComponent'
      );

  const dialogRef = this.dialog.open(component, {
    height: '300px',
    width: '600px',
    data: {},
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe((result) => {

    if (result && result.data) {

      this.isLoading = true;

     const uc0001 = row.uc0001;
     const ff0008 = this.sfgunderapproverListForm.value.status;
     this.whService.saveUnderApproverList(uc0001, ff0008).subscribe((data: any) => {
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
         this.sfgunderapproverListForm.reset();
        
                       this.router.navigateByUrl('/rqpoperationui/wh/qsm-module-admin');
                    
       }
     });
   }
    });
}
}

