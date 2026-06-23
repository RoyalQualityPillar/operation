import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { WhService } from '../../wh.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-under-testing-list',
  standalone: false,
  templateUrl: './under-testing-list.component.html',
  styleUrl: './under-testing-list.component.scss'
})
export class UnderTestingListComponent implements OnInit {
  public tableData:any;
  public isLoading = false;
   destroy$ = new Subject<void>()
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
      private remoteLoader: RemoteComponentLoaderService,
    
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

      this.whService.saveTestList(row.uc0001).subscribe((data: any) => {

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

          this.notificationService.showSuccess(data.status, () => {});
           
          this.router.navigateByUrl('/rqpoperationui/wh/sm-module-admin');
                                        
        }
      });

    }

  });
}
// }
//   public onSubmit(row: any): void {
//      this.whService.saveTestList(row.uc0001).subscribe((data: any) => {
//        if (data.errorInfo != null) {
//          this.isLoading = false;
//          this.dialog.open(MessageDialogComponent, {
//            data: {
//              message: data.errorInfo.message,
//              heading: 'Error Information',
//            },
//          });
//        } else {
//          this.isLoading = false;
//          this.notificationService.showSuccess(data.status, () => {
//          });
//        }
//      });
//    }

}
