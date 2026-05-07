import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolbarService } from '../../service/toolbar.service';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ThemeService } from 'src/app/service/theme.service';
import { SessionService } from 'src/app/service/session.service';
import {
  PasswordExpireConfirmationDialogComponent,
  PasswordExpireConfirmModel,
} from 'src/app/common/password-expire-confirmation-dialog/password-expire-confirmation-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  hide = true;
  LoginForm: FormGroup;
  isLoading = false;
  tokenData: any;
  tokenId: any;
  userId = '';
  data: any;

  constructor(
    public fb: FormBuilder,
    private route: Router,
    private toolbarService: ToolbarService,
    private authService: AuthService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    public themeService: ThemeService,
    public sessionService: SessionService
  ) {
    this.LoginForm = this.fb.group({
      userid: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get userid() {
    return this.LoginForm.get('userid');
  }

  get password() {
    return this.LoginForm.get('password');
  }

  async onLogin() {
    if (this.LoginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.userId = this.LoginForm.controls['userid'].value;

    this.authService
      .getAuth(
        this.LoginForm.controls['userid'].value,
        this.LoginForm.controls['password'].value
      )
      .subscribe((data: any) => {
        this.data = data;
        this.cookieService.set('buCode', data.buCode);
        this.cookieService.set('cssCode', data.cssCode);
        this.toggleTheme();

        if (data.errorInfo != null) {
          this.isLoading = false;
          this.LoginForm.get('password').reset();
          this.dialog.open(MessageDialogComponent, {
            width: '400px',
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.isLoading = false;

          // Start session timeout with activity tracking
          const sessionLogoutTime = data.sessionLogoutTime * 60 * 1000; // Convert minutes to milliseconds
          this.sessionService.initialSessionTimeOut =
            data.sessionLogoutTime * 60 * 1000;
          // this.sessionService.initialSessionTimeOut =2 * 60 * 1000;
          // const sessionLogoutTime = 2 * 60 * 1000; // 2 minutes in milliseconds
          GlobalConstants.expireInDuration = sessionLogoutTime; // Assign directly in milliseconds
          console.log(GlobalConstants.expireInDuration); // Debug log (120,000)
          this.sessionService.startSessionTimeout(sessionLogoutTime); // Pass in milliseconds
          this.checkLoginValidation();
        }
      });
  }

  // async checkLoginValidation() {
  //   const isAuth = true;

  //   // Extract token data and tokenId
  //   this.tokenData = this.data.data.token;
  //   this.tokenId = this.data.data.tokenId;

  //   // Fetch expireInDuration from GlobalConstants
  //  // GlobalConstants.expireInDuration = 2;
  //   const expireInDuration = GlobalConstants.expireInDuration;

  //   // Validate expireInDuration
  //   if (!expireInDuration || isNaN(expireInDuration)) {
  //     console.error('Invalid expireInDuration:', expireInDuration);
  //     throw new Error('Session expiration duration is not valid.');
  //   }

  //   // Set the authentication timer
  //  // this.authService.setAuthTimer(expireInDuration);
  //     GlobalConstants.expireInDuration=expireInDuration;

  //   // Calculate expiration date
  //   const now = new Date();
  //   const expirationDate = new Date(now.getTime() + expireInDuration * 1000);

  //   if (isNaN(expirationDate.getTime())) {
  //     console.error('Invalid expirationDate:', expirationDate);
  //     throw new Error('Expiration date is not valid.');
  //   }

  //   // Save authentication data
  //   await this.authService.saveAuthData(
  //     this.tokenData,
  //     expirationDate,
  //     this.userId,
  //     this.tokenId
  //   );

  //   // Set cookie and update authentication status
  //   this.cookieService.set('isAuth', 'true');
  //   this.authService.setIsAuth(isAuth);

  //   // Redirect based on data status
  //   console.log(this.data.status)
  //   if (this.data.status) {
  //     this.confirmDialog();
  //   } else {
  //     this.route.navigate(['./module-list']);
  //   }
  // }
  async checkLoginValidation() {
    const isAuth = true;

    // Extract token data and tokenId
    this.tokenData = this.data.data.token;
    this.tokenId = this.data.data.tokenId;

    // Fetch expireInDuration from GlobalConstants
    const expireInDuration = GlobalConstants.expireInDuration; // Assuming this is in seconds
    console.log('expireInDuration (seconds):', expireInDuration);

    // Validate expireInDuration
    if (!expireInDuration || isNaN(expireInDuration)) {
      console.error('Invalid expireInDuration:', expireInDuration);
      throw new Error('Session expiration duration is not valid.');
    }

    // Calculate expiration date in local time
    const now = new Date();
    console.log('Current time (local):', now.toLocaleString());

    // Convert seconds to milliseconds for proper date calculation
    const expirationDate = new Date(now.getTime() + expireInDuration);
    console.log(
      'Calculated expirationDate (local):',
      expirationDate.toLocaleString()
    );

    if (isNaN(expirationDate.getTime())) {
      console.error('Invalid expirationDate:', expirationDate);
      throw new Error('Expiration date is not valid.');
    }

    // Save authentication data
    await this.authService.saveAuthData(
      this.tokenData,
      expirationDate, // Save local expiration date
      this.userId,
      this.tokenId
    );

    // Set cookie and update authentication status
    this.cookieService.set('isAuth', 'true', { expires: expirationDate });
    this.authService.setIsAuth(isAuth);

    // Redirect based on data status
    console.log('Data status:', this.data.status);
    if (this.data.status) {
      this.confirmDialog();
    } else {
      this.route.navigate(['./module-list']);
    }
  }

  onForgetPassword() {
    this.toolbarService.isLogin = 'forgetPassword';
    sessionStorage.setItem('isLogin', 'forgetPassword');
    this.route.navigate(['./forget-password']);
  }

  onSelectSignUp() {
    this.dialog.open(ChangePasswordComponent, {
      width: '900px',
      height: '600px',
    });
    // this.route.navigate(['./change-password']);
  }

  async confirmDialog() {
    const message = this.data.status;
    const dialogData = new PasswordExpireConfirmModel(
      'Password Expire Notification',
      message,
      this.data,
      this.userId
    );

    const dialogRef = this.dialog.open(
      PasswordExpireConfirmationDialogComponent,
      {
        minWidth: '600px',
        data: dialogData,
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        console.log('Password change initiated.');
      }
    });
  }

  logoUrl: string;
  getLogo() {
    this.authService
      .getLogoDetail(this.userId)
      .subscribe((arrayBuffer: any) => {
        if (arrayBuffer.data) {
          this.logoUrl = 'data:image/png;base64,' + arrayBuffer.data;
          localStorage.setItem('logoUrl', this.logoUrl);
          this.cookieService.set('isLogo', 'true');
        } else {
          localStorage.clear();
          this.cookieService.set('isLogo', 'false');
        }
      });
  }

  toggleTheme() {
    const cssCode = this.data.cssCode;
    switch (cssCode) {
      case 'A':
        this.themeService.applyGroupStyles(1);
        break;
      case 'B':
        this.themeService.applyGroupStyles(2);
        break;
      case 'C':
        this.themeService.applyGroupStyles(3);
        break;
      case 'D':
        this.themeService.applyGroupStyles(4);
        break;
      default:
        this.themeService.applyGroupStyles(1);
    }
  }
  onForgotPassword() {
    this.toolbarService.isLogin = 'forgetPassword';
    sessionStorage.setItem('isLogin', 'forgetPassword');
    console.log(sessionStorage.getItem('isLogin'));
    // this.route.navigate(['./forget-password']);
    this.dialog.open(ForgetPasswordComponent, {
      width: '900px',
      height: '600px',
    });
  }
}
