import { Injectable } from '@angular/core';
import {
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBar,
} from '@angular/material/snack-bar';
export enum snackBarTypes {
  success = 'success',
  warning = 'warning',
  failure = 'failure',
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  snackBarRef: MatSnackBarRef<SimpleSnackBar>;

  constructor(private snackBar: MatSnackBar) {}
  sendSnackbar(type: string, message: string, action?: string) {
    const panelClass = 'global-snackbar-success';

    this.snackBarRef = this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['global-snackbar-success'],
    });
  }
}
