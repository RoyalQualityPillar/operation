import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { AuthService } from 'src/app/service/auth.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Subscription } from 'rxjs';
import { NgZone } from '@angular/core';
import { SessionService } from 'src/app/service/session.service';

@Component({
    selector: 'app-session-expire-dialog',
    templateUrl: './session-expire-dialog.component.html',
    styleUrls: ['./session-expire-dialog.component.scss'],
    standalone: false
})
export class SessionExpireDialogComponent implements OnInit {
  title: string;
  message: string;
  subscription: Subscription;
  constructor(public dialogRef: MatDialogRef<SessionExpireDialogComponent>,
    private sessionService : SessionService,
    @Inject(MAT_DIALOG_DATA) public data: SessionExpireConfirmModel,
    private authService:AuthService,
    public cookieService:CookieService,private route: Router,public toolbarService: ToolbarService,private zone: NgZone) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }
  totalSeconds: number = 60; 
  minutesDisplay: number = 0; 
  secondsDisplay: number = 0; 
  timerInterval:any;
 ngOnInit() {
  this.setupSessionTimer();
}

private setupSessionTimer() {
  // Check if setInterval is already running
  if (!this.timerInterval) {
    let dismissed = false;
    console.log(this.cookieService.get('isAuth'));
    if (this.cookieService.get('isAuth')) {
      this.timerInterval = setInterval(() => {
        if (this.totalSeconds > 0) {
          this.totalSeconds--;
          this.minutesDisplay = Math.floor(this.totalSeconds / 60);
          this.secondsDisplay = this.totalSeconds % 60;
        } else if (!dismissed) {
          dismissed = true;
         // this.onDismiss();
        }
      }, 1000);
    }
  }
}
    
  

  tokenData:any;
  tokenId:any;
    onConfirm(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    this.subscription = this.toolbarService.getSessionExtended(this.cookieService.get('tokenId')).subscribe((data:any)=>{
      console.log(data)
      //reset 
      this.totalSeconds = 60;
      this.tokenData=data.token;
      this.tokenId=data.tokenId;
      this.cookieService.set('tokenId',this.tokenId)
      let isAuth=true;
  /*************new code start  */
  GlobalConstants.expireInDuration = this.sessionService.initialSessionTimeOut;
  console.log(GlobalConstants.expireInDuration); // Debug log (120,000)
  const now = new Date();
    console.log('Current time (local):', now.toLocaleString());
  this.sessionService.startSessionTimeout(GlobalConstants.expireInDuration);
  const expirationDate = new Date(now.getTime() + GlobalConstants.expireInDuration);
   /****************nuew code end */
    //  console.log(GlobalConstants.expireInDuration)
    //  const expireInDuration =GlobalConstants.expireInDuration;
    //  this.authService.setAuthTimer(expireInDuration)
    //  const now =new Date();
    //  const expirationDate= new Date(now.getTime() + expireInDuration*1000);
    //  console.log(expirationDate);
     this.authService.saveAuthData(this.tokenData,expirationDate,this.cookieService.get('userId'),this.tokenId);
     this.cookieService.set('isAuth','true');
     this.authService.setIsAuth(isAuth)
     const isAuth1 = this.authService.getIsAuth();
     console.log(isAuth1)

    // const expireInDuration =3600;
    //  const expireInDuration =GlobalConstants.expireInDuration;
    //  this.authService.setAuthTimer(expireInDuration)
    //  const now =new Date();
    //  const expirationDate= new Date(now.getTime() + expireInDuration*1000);
    //  console.log(expirationDate);
    //  let isAuth=true;
    //  this.cookieService.set('isAuth','true');
    //  this.authService.setIsAuth(isAuth)
    //  this.authService.saveAuthData(this.tokenData,expirationDate,this.cookieService.get('userId'),this.tokenId);
    })
   
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
     // Close the dialog, return true
     this.toolbarService.logout(this.cookieService.get('userId')).subscribe((data:any)=>{
      console.log(data)
    })
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
     localStorage.clear();
     console.log('onDismiss')
     this.route.navigate(['./login'])
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class SessionExpireConfirmModel {

  constructor(public title: string, public message: string) {
  }
}
