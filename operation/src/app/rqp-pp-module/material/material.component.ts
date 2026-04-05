import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { GlobalConstants } from "src/app/common/global-constants";
import { GrnService } from "src/app/rqp-wh-controller/grn/grn.service";

@Component({
  selector: 'app-material',
  standalone: false,
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss'
})
export class MaterialComponent implements OnInit {
  public questionBankTable: any;
  public selectedRow: any;

  public displayedColumns = [
    'action',
    // 'uc0001',
    'ff0001',
    'ff0002',
    'ff0003',
    'ff0004',
    'ff0005',
    // 'ff0006',
    // 'ff0007',
    // 'ff0008',
    'status',
    'createdon',
    'createdby',
  ];

  constructor(
    private grnService: GrnService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.cookieService.get('unitCode');
    this.grnService.questionBankTable(this.cookieService.get('buCode')).subscribe(({ data }) => {
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

  // public submit(): void {
  //   // this.router.navigate(['./rqpquailtyui/lms/lms-question-init'], {queryParams: this.selectedRow,});
  //  sessionStorage.setItem('selectedRow', JSON.stringify(this.selectedRow));
  //   this.router.navigate(['./rqpquailtyui/lms/lms-question-init']);
  // }
}
