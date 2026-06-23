import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { PpService } from '../../pp.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { Router } from '@angular/router';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-fg-execution-process-order',
  standalone: false,
  templateUrl: './fg-execution-process-order.component.html',
  styleUrl: './fg-execution-process-order.component.scss'
})
export class FgExecutionProcessOrderComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public planningOrderListData: any;
  public dataSource: any;
  public isLoading = false;
  destroy$ = new Subject<void>();
  displayedColumns = [
    'ff0001',
    'ff0003',
    'ff0004',
    'ff0006',
    'createdon',
    'createdby',
    'action',
  ];
  constructor(
    private ppService: PpService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private remoteLoader: RemoteComponentLoaderService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    let unitCode = this.cookieService.get('buCode');
    this.ppService.getSfgMaterialCompletedProductionList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.planningOrderListData = new MatTableDataSource(this.dataSource);
      this.planningOrderListData.sort = this.sort;
      this.planningOrderListData.paginator = this.paginator;
    });
  }
  public pageChanged(event): void {
    if (this.planningOrderListData.length == GlobalConstants.size) {
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

      this.ppService.saveProductionCompletedList(row.uc0001).subscribe((data: any) => {

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
         this.planningOrderListData.reset();
          timer(2000)
                               .pipe(takeUntil(this.destroy$))
                               .subscribe(() => {
                                 this.router.navigateByUrl('/rqpoperationui/wh/qsm-module-admin');
                               });
        }
      });

    }

  });
}

  // public submit(value: any) {
  //   this.ppService.saveProductionCompletedList(value.uc0001).subscribe((data: any) => {
  //     if (data.errorInfo != null) {
  //       this.isLoading = false;
  //       this.dialog.open(MessageDialogComponent, {
  //         data: {
  //           message: data.errorInfo.message,
  //           heading: 'Error Information',
  //         },
  //       });
  //     } else {
  //       this.isLoading = false;
  //       this.notificationService.showSuccess(data.status, () => {
  //       });
  //     }
  //   });
  // }

}

