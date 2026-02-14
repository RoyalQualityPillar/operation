import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  Inject,
} from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { downloadCanvasArea } from 'bk-export';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  openPDFByFive,
  openPDFByTwo,
  openPDFByFour,
  openPDFByThree,
} from 'rqp-audit-trail';
import { MessageService } from '../../service/message.service';
import { changeStatusByCode } from '../removeEmptyStrings';

export interface userData {
  userData: any;
  pageTitle: any;
  tableData: any;
  downloadAudit:any;
}

@Component({
    selector: 'app-common-all-audit-trail',
    templateUrl: './common-all-audit-trail.component.html',
    styleUrls: ['./common-all-audit-trail.component.scss'],
    standalone: false
})
export class CommonAllAuditTrailComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  downloadFileName: string = 'auditTrail'; 
  fields: any;
  isLoading = false;
  fileWidth: any;
  fileHeight: any;
  fileWidth1: any;
  fileHeight1: any;
  logoURL: any;
  FileURLObject = {
    url1: '',
    url2: '',
    url3: '',
    url4: '',
  };

  constructor(
    public dialog: MatDialog,
    public messageService: MessageService,
    public dialogRef: MatDialogRef<CommonAllAuditTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.logoURL = localStorage.getItem('logoUrl');
    }, 1000);

    this.fields = this.userData.tableData;
    this.downloadFileName = this.userData.downloadAudit;

    // ✅ run version change detection
    if (this.fields && this.fields.length > 1) {
      this.markVersionChanges();
    }
  }

  /**
   * Mark changes between versions for highlighting
   */
  /**
 * Mark only the last version changes for highlighting
 */
private markVersionChanges() {
  const fieldCount = this.fields[0].fields.length;

  // Reset
  this.fields.forEach((v: any) => {
    v.fields.forEach((f: any) => (f.isChanged = false));
  });

  // For each field (ff0001, ff0002, ...)
  for (let fieldIndex = 0; fieldIndex < fieldCount; fieldIndex++) {
    let lastDifferentIndex: number | null = null;

    // Compare each version with its previous
    for (let i = 1; i < this.fields.length; i++) {
      const prevVal = this.fields[i - 1].fields[fieldIndex]?.value;
      const currVal = this.fields[i].fields[fieldIndex]?.value;

      if (prevVal !== currVal) {
        lastDifferentIndex = i; // keep track of the latest change
      }
    }

    // ✅ Highlight only the last different version
    if (lastDifferentIndex !== null) {
      this.fields[lastDifferentIndex].fields[fieldIndex].isChanged = true;
    }
  }
}


  openPDF() {
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA, 'roleAuditTrail');
  }

  onDownloadPDF() {      
    this.messageService.sendSnackbar(
      'success',
      'File will get downloaded once its ready'
    );
    if (this.fields.length == 1) {
      this.openPDFByOne();
    } else if (this.fields.length == 2) {
      let DATA: any = document.getElementById('Location1');
      let DATA1: any = document.getElementById('Location2');
      let HEADER: any = document.getElementById('header');
      openPDFByTwo(HEADER, DATA, DATA1, 50, 22, this.downloadFileName);
    } else if (this.fields.length == 3) {
      let DATA: any = document.getElementById('Location1');
      let DATA1: any = document.getElementById('Location2');
      let DATA2: any = document.getElementById('Location3');
      let HEADER: any = document.getElementById('header');
      openPDFByThree(HEADER, DATA, DATA1, DATA2, 50, 22, this.downloadFileName);
    } else if (this.fields.length == 4) {
      let DATA: any = document.getElementById('Location1');
      let DATA1: any = document.getElementById('Location2');
      let DATA2: any = document.getElementById('Location3');
      let DATA3: any = document.getElementById('Location4');
      let HEADER: any = document.getElementById('header');
      openPDFByFour(HEADER, DATA, DATA1, DATA2, DATA3, 50, 22, this.downloadFileName);
    } else {
      let DATA: any = document.getElementById('Location1');
      let DATA1: any = document.getElementById('Location2');
      let DATA2: any = document.getElementById('Location3');
      let DATA3: any = document.getElementById('Location4');
      let DATA4: any = document.getElementById('Location5');
      let HEADER: any = document.getElementById('header');
      openPDFByFive(
        HEADER,
        DATA,
        DATA1,
        DATA2,
        DATA3,
        DATA4,
        50,
        22,
        this.downloadFileName
      );
    }
  }

  public openPDFByOne(): void {
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA, this.downloadFileName);
  }

  DATA: any;
  DOWNLOADLINK: any;

  onChangeStatus(data: any) {
    return changeStatusByCode(data);
  }

  public lineName(label: string, name1: string, name2: string): number {
    if (label == 'Line Name') {
    }
    return null;
  }
}
