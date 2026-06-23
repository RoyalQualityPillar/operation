import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { PpService } from 'src/app/rqp-pp-module/pp.service';
import { WhService } from '../../wh.service';
import { Subject, takeUntil, timer } from 'rxjs';
import { Router } from '@angular/router';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';

@Component({
  selector: 'app-sfg-quarantine-list',
  standalone: false,
  templateUrl: './sfg-quarantine-list.component.html',
  styleUrl: './sfg-quarantine-list.component.scss'
})
export class SfgQuarantineListComponent implements OnInit {
   public sfgQuarantineStatusListForm:FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public sfgQuarantineListData: any;
  public dataSource: any;
  public isLoading = false;
  destroy$ = new Subject<void>();
  displayedColumns = [
    'ff0022',
    'ff0025',
    'ff0002',
    'ff0001',
    'ff0006',
    'ff0023',
    'ff0024',
    'createdon',
    'createdby',
    'action',
  ];
  constructor(
    private ppService: PpService,
    private cookieService: CookieService,
    public dialog: MatDialog,
     private fb:FormBuilder,
    private notificationService: NotificationService,
    private remoteLoader: RemoteComponentLoaderService,
    private router: Router,
  ) {
    this.sfgQuarantineStatusListForm = fb.group({
      documentName: [''],
      status:['']
    });
   }
  ngOnInit(): void {
    let unitCode = this.cookieService.get('buCode');
    this.ppService.getSFGQuarantineList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.sfgQuarantineListData = new MatTableDataSource(this.dataSource);
      this.sfgQuarantineListData.sort = this.sort;
      this.sfgQuarantineListData.paginator = this.paginator;
    });
  }
  public pageChanged(event): void {
    if (this.sfgQuarantineListData.length == GlobalConstants.size) {
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
    
          this.ppService.saveFgQuarantineList(row.uc0001).subscribe((data: any) => {
    
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
                           this.router.navigateByUrl('/rqpoperationui/wh/qm-module-admin');
                         
            }
          });
    
        }
    
      });
    }

  // public submit(value: any) {
  //    const quarantineStatus = this.sfgQuarantineStatusListForm.value;
  //   this.ppService.saveFgQuarantineList(value.uc0001).subscribe((data: any) => {
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


