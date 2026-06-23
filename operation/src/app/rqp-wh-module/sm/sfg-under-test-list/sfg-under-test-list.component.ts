import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { WhService } from '../../wh.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { Router } from '@angular/router';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';

@Component({
  selector: 'app-sfg-under-test-list',
  standalone: false,
  templateUrl: './sfg-under-test-list.component.html',
  styleUrl: './sfg-under-test-list.component.scss'
})
export class SfgUnderTestListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public sfgUnderTestListData: any;
  public dataSource: any;
  public isLoading = false;
  displayedColumns = [
    'ff0001',
    'ff0002',
    'ff0003',
    'ff0004',
    'ff0006',
    'ff0023',
    'ff0024',
    'createdon',
    'createdby',
    'action',
  ];
  constructor(
    private whService: WhService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    private remoteLoader: RemoteComponentLoaderService,
  ) { }
  ngOnInit(): void {
    let unitCode = this.cookieService.get('buCode');
    this.whService.getSFGUnderTestList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.sfgUnderTestListData = new MatTableDataSource(this.dataSource);
      this.sfgUnderTestListData.sort = this.sort;
      this.sfgUnderTestListData.paginator = this.paginator;
    });
  }
  public pageChanged(event): void {
    if (this.sfgUnderTestListData.length == GlobalConstants.size) {
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
  public async submit(row: any): Promise<void> {

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

      this.whService.saveFgUnderTestLList(row.uc0001,row.status).subscribe((data: any) => {

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

//   public submit(value: any) {
//     const component = await this.remoteLoader.loadComponentByKey(
//         'CommonESignatureComponent'
//       );

//   const dialogRef = this.dialog.open(component, {
//     height: '300px',
//     width: '600px',
//     data: {},
//     disableClose: true,
//   });

//   dialogRef.afterClosed().subscribe((result) => {

//     if (result && result.data) {

//       this.isLoading = true;
//     this.whService.saveFgUnderTestLList(value.uc0001, value.status).subscribe((data: any) => {
//       if (data.errorInfo != null) {
//         this.isLoading = false;
//         this.dialog.open(MessageDialogComponent, {
//           data: {
//             message: data.errorInfo.message,
//             heading: 'Error Information',
//           },
//         });
//       } else {
//         this.isLoading = false;
//         this.notificationService.showSuccess(data.status, () => {
//         this.router.navigateByUrl('/rqpoperationui/wh/sm-module-admin');
//        }
//       });

//     }

//   });
// }

// }
}
