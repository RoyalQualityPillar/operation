import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pms-list',
  standalone: false,
  templateUrl: './pms-list.component.html',
  styleUrl: './pms-list.component.scss'
})
export class PmsListComponent implements OnInit {
  dialogColumns: any;
  dialogData: any;
  selectedData: any;
  lovName: any;
  dialogTitle: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public refDialog: MatDialogRef<PmsListComponent>
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

