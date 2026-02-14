import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CustomSnackBarComponent} from '../common/custom-snack-bar/custom-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) {}
  
    showSuccess(message: string, onClose?: () => void) {
      this.openSnackBar(message, 'success', onClose);
    }
  
    showError(message: string, onClose?: () => void) {
      this.openSnackBar(message, 'error', onClose);
    }
  
    showWarning(message: string, onClose?: () => void) {
      this.openSnackBar(message, 'warning', onClose);
    }
  
    private openSnackBar(message: string, type: 'success' | 'error' | 'warning', onClose?: () => void) {
      const panelClass = {
        success: 'success-snackbar',
        error: 'error-snackbar',
        warning: 'warning-snackbar',
      }[type];
  
      this.snackBar.openFromComponent(CustomSnackBarComponent, {
        data: { message, onClose, type },
        duration: undefined,
        panelClass,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }