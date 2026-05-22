import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
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

  public displayedColumns = [
    'action',
    'uc0001',
    'ff0001',
    'ff0002',
    'ff0003',
    'ff0004',
    'ff0005',
    'ff0006',
    'ff0007',
    'ff0008',
    'status',
    'createdon',
    'createdby',
  ];

  constructor(
    private whService: WhService,
    private cookieService: CookieService,
    private router: Router
  ) {}

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

  public submit(): void {
    // this.router.navigate(['./rqpquailtyui/lms/lms-question-init'], {queryParams: this.selectedRow,});
   sessionStorage.setItem('selectedRow', JSON.stringify(this.selectedRow));
    this.router.navigate(['./rqpquailtyui/lms/lms-question-init']);
  }
}
