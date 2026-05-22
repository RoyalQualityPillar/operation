import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export interface userData {
  userData: any;
  fileType: any;
}

@Component({
    selector: 'app-preview-file',
    templateUrl: './preview-file.component.html',
    styleUrls: ['./preview-file.component.scss'],
    standalone: false
})
export class PreviewFileComponent implements OnInit {
  @ViewChild('iframeElement') iframeElement!: ElementRef;
  safeUrl: any;
  pdf: SafeResourceUrl;

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<PreviewFileComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any
  ) {}

  ngOnInit(): void {
    console.log(this.userData)
    if (this.userData.showIframe) {
      this.showIframePdf();
    } else {
      this.handleBlobOrUrl(this.userData.tableData);
    }
  }

  handleBlobOrUrl(data: string | Blob): void {
    if (this.userData.type.toLowerCase() === 'pdf') {
      if (typeof data === 'string' && data.startsWith('blob:')) {
        this.safeUrl = data; // Directly assign the blob URL
        this.showIframePdf();
      } else if (data instanceof Blob) {
        const blobUrl = URL.createObjectURL(data);
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      } else {
        console.error('Invalid data type for PDF source.');
      }
    }
  }

  showIframePdf() {
    console.log(this.userData.tableData)
    if (this.userData.type == 'pdf' || this.userData.type == 'PDF') {
      this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.userData.tableData
      );
    }
  }
}
