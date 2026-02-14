import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material/dialog';
export interface MessageDialogData {
  heading: string;
  message: string;
}

@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.scss'],
    standalone: false
})
export class MessageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MessageDialogData,
  public refDialog :MatDialogRef<MessageDialogComponent>,) { }

  ngOnInit() {
    console.log('matDialog init');
  }
  
  closePopUp()
  {
    this.refDialog.close();
  }

  onNoClick(): void {
    this.refDialog.close();
  }
}
