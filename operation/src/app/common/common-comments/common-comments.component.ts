import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LovDialogComponent } from '../lov-dialog/lov-dialog.component';

@Component({
  selector: 'app-common-comments',
  templateUrl: './common-comments.component.html',
  styleUrls: ['./common-comments.component.scss'],
  standalone: false,
})
export class CommonCommentsComponent {
  UserRequirementForm: FormGroup;
  showNextStage = false;
  displayedColumns: any;
  @Input() nextStageListData: any;
  selectedDialogData: any;
  @Output() commentsData = new EventEmitter();
  @Input() dataSource: any;
  commentsDisplayColumn: string[] = [
    'createdby',
    'ff0003',
    'ff0005',
    'createdon',
    'comments',
  ];

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.UserRequirementForm = this.fb.group({
      comments: [''],
      stage2: [''],
    });

    this.UserRequirementForm.valueChanges.subscribe((data) => {
      this.commentsData.emit(this.UserRequirementForm.value);
    });
  }

  onRequestVersion(row) {
    return row.ff0005 + '.' + row.ff0006 + '.' + row.ff0007 + '.' + row.ff0008;
  }

  openNextStageLov() {
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Stage',
        dialogColumns: this.displayedColumns,
        dialogData: this.nextStageListData,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.UserRequirementForm.controls['stage2'].setValue(result.data.stage);
      }
    });
  }
}
