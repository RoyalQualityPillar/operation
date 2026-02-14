import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from '../common/global-constants';
import { SessionExpireDialogComponent } from '../toolbar/session-expire-dialog/session-expire-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionTimeout: any;
  private warningTimeout: any;
  initialSessionTimeOut:any;
  private lastActivityTimestamp: number = Date.now();
  private warningIssued: boolean = false;
  private activityDebounceTimeout: any;

  constructor(private dialog: MatDialog) {
    this.detectUserActivity();
    this.trackVisibilityAndFocus();
  }
  private isBlogLogo: boolean = false;

  setLogoState(state: boolean): void {
    this.isBlogLogo = state;
  }

  getLogoState(): boolean {
    return this.isBlogLogo;
  }
  startSessionTimeout(sessionDuration: number): void {
   // console.log(`Starting session timeout for duration: ${sessionDuration}ms`); // Logs correct value
    this.clearTimeouts();
  
    this.sessionTimeout = setTimeout(() => {
      this.logoutUser();
    }, sessionDuration);
  
    const warningTime = sessionDuration - 60 * 1000; // 1 minute before logout
  //  console.log(`Warning timeout set for: ${warningTime}ms`);
    this.warningTimeout = setTimeout(() => {
      if (this.isUserInactiveFor(warningTime)) {
        this.showSessionWarning();
      } else {
       // console.log('User was active; skipping warning dialog.');
      }
    }, warningTime);
  }
  

  private showSessionWarning(): void {
    if (!this.warningIssued) {
     // console.log('Displaying session warning dialog.');
      const message = `Your session will expire soon.`;

      const dialogRef = this.dialog.open(SessionExpireDialogComponent, {
        minWidth: '600px',
        data: {
          title: 'Session Expire Warning',
          message: message,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
      //  console.log('Session warning dialog closed.');
        if (result) {
        //  console.log('User responded to warning dialog.');
        }
        // Reset warning state after dialog closes
        this.warningIssued = false;
      });

      this.warningIssued = true; // Avoid showing multiple warnings
    }
  }

  private logoutUser(): void {
  //  console.log('Logging out user due to session timeout.');
    // Implement your logout logic here
  }

  private detectUserActivity(): void {
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach((event) => {
      window.addEventListener(event, this.debouncedActivityHandler.bind(this));
    });
  }

  private debouncedActivityHandler(): void {
    if (this.activityDebounceTimeout) {
      clearTimeout(this.activityDebounceTimeout);
    }

    this.activityDebounceTimeout = setTimeout(() => {
      this.resetActivityTimer();
    }, 500); // Debounce for 500ms to avoid excessive resets
  }

  private resetActivityTimer(): void {
    const inactiveDuration = Date.now() - this.lastActivityTimestamp;

    // Only reset timers if significant inactivity occurred
    if (inactiveDuration > 1000) {
     // console.log('User activity detected; resetting timers.');
      this.lastActivityTimestamp = Date.now();
      this.warningIssued = false; // Reset warning state
      this.clearTimeouts(); // Clear existing timers
      this.startSessionTimeout(GlobalConstants.expireInDuration); // Restart session timer
    } else {
     // console.log('Activity detected but within debounce period; skipping timer reset.');
    }
  }

  private isUserInactiveFor(duration: number): boolean {
    const inactiveTime = Date.now() - this.lastActivityTimestamp;
   // console.log(`User inactive for: ${inactiveTime}ms (threshold: ${duration}ms)`);
    return inactiveTime >= duration;
  }

  private clearTimeouts(): void {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
      //console.log('Cleared session timeout.');
    }
    if (this.warningTimeout) {
      clearTimeout(this.warningTimeout);
     // console.log('Cleared warning timeout.');
    }
  }

  private trackVisibilityAndFocus(): void {
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    window.addEventListener('focus', this.handleFocus.bind(this));
  }

  private handleVisibilityChange(): void {
    if (!document.hidden) {
    //  console.log('Tab became visible; checking timers.');
      this.checkTimers();
    }
  }

  private handleFocus(): void {
  //  console.log('Window regained focus; checking timers.');
    this.checkTimers();
  }

  private checkTimers(): void {
    const currentTime = Date.now();
    const inactiveDuration = currentTime - this.lastActivityTimestamp;

   // console.log(`Checking timers: inactiveDuration=${inactiveDuration}ms, warningThreshold=${(GlobalConstants.expireInDuration - 60)}ms, logoutThreshold=${GlobalConstants.expireInDuration}ms`);

    if (inactiveDuration >= GlobalConstants.expireInDuration) {
    //  console.log('Session timeout exceeded while tab was inactive; logging out user.');
      this.logoutUser();
    } else if (
      inactiveDuration >= (GlobalConstants.expireInDuration - 6000) &&
      !this.warningIssued
    ) {
    //  console.log('Warning timeout exceeded while tab was inactive; showing warning dialog.');
      this.showSessionWarning();
    } else {
    //  console.log('Timers are within expected limits; no action required.');
    }
  }
}
