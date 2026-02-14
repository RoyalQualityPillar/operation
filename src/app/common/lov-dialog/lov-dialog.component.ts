import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-lov-dialog',
    templateUrl: './lov-dialog.component.html',
    styleUrls: ['./lov-dialog.component.scss'],
    standalone: false
})
export class LovDialogComponent implements OnInit {
  dialogColumns: any;
  dialogData: any;
  selectedData: any;
  lovName: any;
  dialogTitle: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public refDialog: MatDialogRef<LovDialogComponent>
  ) {}

  ngOnInit() {
    this.dialogColumns = this.data.dialogColumns;
    this.dialogData = this.data.dialogData;
    this.dialogTitle = this.data.dialogTitle;
  }
  onSelectedChange(val) {
    this.selectedData = val;
    this.refDialog.close({ data: this.selectedData });
  }

  closePopUp() {
    this.refDialog.close();
  }
  onPagination(event: any) {
    //todo
  }
}
