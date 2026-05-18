import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarService } from 'src/app/service/toolbar.service';

@Component({
    selector: 'app-logout-confirm',
    templateUrl: './logout-confirm.component.html',
    styleUrls: ['./logout-confirm.component.scss'],
    standalone: false
})
export class LogoutConfirmComponent implements OnInit {
  title: string;
  message: string;
  constructor(public dialogRef: MatDialogRef<LogoutConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LogoutConfirmModel,
    public cookieService:CookieService,private route: Router,public toolbarService: ToolbarService,) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  onConfirm(): void {
    this.toolbarService.logout(this.cookieService.get('userId')).subscribe((data:any)=>{
      console.log(data)
    })
    // Close the dialog, return true
    this.cookieService.delete('userId');
    this.cookieService.delete('token');
    this.cookieService.delete('isLogin');
    this.cookieService.delete('menuHeader');
    this.cookieService.delete('subMenu1');
    this.cookieService.delete('tokenId');
    this.cookieService.delete('attESHr');
    this.cookieService.delete('isAuth');
    this.cookieService.delete('expiration');
    this.cookieService.deleteAll();
    this.route.navigate(['./login'])
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class LogoutConfirmModel {

  constructor(public title: string, public message: string) {
  }
}
