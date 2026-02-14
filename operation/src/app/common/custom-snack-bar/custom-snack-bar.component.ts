
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';


@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrl: './custom-snack-bar.component.scss',
  standalone:false,
})
export class CustomSnackBarComponent {

  constructor(
    public snackBarRef: MatSnackBarRef<CustomSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
  onClose(): void {
    this.snackBarRef.dismiss();
    if (this.data?.onClose) {
      this.data.onClose(); // Call the provided function
    }
  }
  getIcon(): string {
    switch (this.data.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }

  //how to use

  // openCustomSnackBar() {
  //   this.snackBar.openFromComponent(CustomSnackBarComponent, {
  //     data: {
  //       message: 'This is a custom SnackBar!',
  //       onClose: this.handleSnackBarClose.bind(this),
  //     },
  //     duration: undefined, // No auto-close
  //     panelClass: ['custom-snackbar-container'] // Optional for additional styling
  //   });
  // }

  // handleSnackBarClose() {
  //   console.log('SnackBar Closed!');
  // }
}
