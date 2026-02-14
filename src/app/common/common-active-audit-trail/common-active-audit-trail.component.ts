import { Component, AfterViewInit, ViewChild, OnInit, ViewEncapsulation, ElementRef, Inject } from '@angular/core';

import { downloadCanvasArea } from 'bk-export';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../../service/message.service';

// import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
// import { MessageService } from 'src/app/service/message.service';

export interface userData {
  userData: any;
  pageTitle: any;
  tableData: any;
  downloadAudit: any;
}
@Component({
  selector: 'app-common-active-audit-trail',
  templateUrl: './common-active-audit-trail.component.html',
  styleUrls: ['./common-active-audit-trail.component.scss'],
  standalone: false
})
export class CommonActiveAuditTrailComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;
  downloadFileName: string = 'auditTrail';
  fields: any;
  logoURL: any;
  isLoading = false
  constructor(
    public dialog: MatDialog,
    public messageService: MessageService,
    public dialogRef: MatDialogRef<CommonActiveAuditTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.logoURL = localStorage.getItem('logoUrl');
    }, 1000);
    this.fields = this.userData.tableData
    this.downloadFileName = this.userData.downloadAudit;
  }
  openPDF() {
    // Logic to open PDF
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA, this.downloadFileName)
  }
}
