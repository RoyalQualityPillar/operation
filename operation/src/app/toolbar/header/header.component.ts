import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarService } from '../../service/toolbar.service';
import { CookieService } from 'ngx-cookie-service';
import {
  LogoutConfirmModel,
  LogoutConfirmComponent,
} from '../logout-confirm/logout-confirm.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { AuthService } from 'src/app/service/auth.service';
import { SUB_MENU_ROUTES } from 'src/app/common/menu-keys';
import { SessionService } from 'src/app/service/session.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  result: string = '';
  color = 'accent';
  public buCode: string;
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    public toolbarService: ToolbarService,
    public cookieService: CookieService,
    public dialog: MatDialog,
    public sessionService: SessionService,
    public lifeCycleDataService: LifeCycleDataService,
    private authService: AuthService
  ) {}
  userId: any;
  logoURL: any;
  ngOnInit(): void {
    // this.logoURL=this.cookieService.get('logoUrl')
    this.userId = this.cookieService.get('userId');
    setInterval(() => {
      this.logoURL = localStorage.getItem('logoUrl');
    }, 1000);
  }

  navigatehome() {
    // this.route.navigate(['./data-table']); //need to add new dashobard
    this.cookieService.set('subMenuFlag', 'false');
    this.route.navigate(['./module-list']);
  }
  confirmDialog(): void {
    const message = `Are you sure you want to logout?`;
    const dialogData = new LogoutConfirmModel('Logout Confirmation', message);
    const dialogRef = this.dialog.open(LogoutConfirmComponent, {
      minWidth: '600px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.result = dialogResult;
      }
    });
  }
  onLogout() {
    this.toolbarService
      .logout(this.cookieService.get('userId'))
      .subscribe((data: any) => {
        console.log(data);
      });
    //this.toolbarService.isLogin="loginFaild";
    this.cookieService.delete('userId');
    this.cookieService.delete('token');
    this.cookieService.delete('isLogin');
    this.cookieService.delete('menuHeader');
    this.cookieService.delete('subMenu1');
    localStorage.clear();
    this.route.navigate(['./login']);
    this.cookieService.delete('isAuth');
    this.cookieService.deleteAll();
  }
  onChangePassword() {
    //this.route.navigate(['./data-table'])
    this.dialog.open(ChangePasswordComponent, {
      width: '900px',
      height: '600px',
      data: {
        changePassword: true,
      },
    });
  }
  submenu1(subMenuName1: any) {
    // let subMenuName123='AD-MasterDataRegistration'
    if (subMenuName1 == 'CC-QA Approver') {
      this.route.navigate(['./master-data-management']);
    } else if (subMenuName1 == ' Approver') {
      this.route.navigate(['./quotation-home-page']);
    }
  }
  onSelectSubMenu(subMenu: any, stage: any) {
    console.log(subMenu);
    this.toolbarService.currentStage = stage;
    console.log(this.toolbarService.currentStage);
    let selectedSubMenu = subMenu.trim();
    // Check if the selected sub-menu has a matching route
    const route = SUB_MENU_ROUTES[selectedSubMenu];
    console.log(route);
    if (route) {
      this.route.navigate([route]);
    } else {
      console.error('Invalid sub-menu selected:', subMenu);
    }
    // Check if sub-menu contains 'Initiator'
    //if (subMenu.includes('Initiator')) {
    this.toolbarService.currentSelectedMenu = subMenu.trim();
    //}
    // Handle special cases like setting a custom stage
    if (subMenu === 'QT-Update' || subMenu === 'SQT-Update') {
      this.toolbarService.currentStage = 1;
    }
  }

  // onSelectSubMenu(subMenu: any, stage: any) {
  //   console.log(subMenu);
  //   this.toolbarService.currentStage = stage;
  //   console.log(this.toolbarService.currentStage);
  //   if (subMenu == 'CC-Cross Functional Reviewer') {
  //     this.route.navigate(['./master-data-management']);
  //   } else if (subMenu == 'CC-QA Approver') {
  //     this.route.navigate(['./sd/quotation-home-page']);
  //   } else if (subMenu == 'AD-Administrator') {
  //     this.route.navigate(['./admin/ad-administrator']);
  //   } else if (subMenu == 'AD-Master Data') {
  //     this.route.navigate(['./admin/ad-master']);
  //   } else if (subMenu == 'QT-Initator') {
  //     this.route.navigate(['./sd/quotation-home-page']);
  //   } else if (subMenu == 'QT-Update') {
  //     this.toolbarService.currentStage = 1;
  //     this.route.navigate(['./sd/qt-update-page']);
  //   } else if (subMenu == 'QT-Master Data') {
  //     this.route.navigate(['./sd/qt-master-data-home-page']);
  //   } else if (subMenu == 'AD-Master Data') {
  //     this.route.navigate(['./admin/ad-master']);
  //   } else if (subMenu == 'SQT-Initiator') {
  //     this.route.navigate(['./sd/qt-initiator']);
  //   } else if (subMenu == 'SQT-Reviewer' || subMenu == 'SQT-Approver') {
  //     this.route.navigate(['./sd/qt-reviewer']);
  //   } else if (subMenu == 'SQT-Update') {
  //     this.toolbarService.currentStage = 1;
  //     this.route.navigate(['./sd/qt-update']);
  //   } else if (subMenu == 'SD-Master Data') {
  //     this.route.navigate(['./sd/qt-master-data-home-page']);
  //   }
  //   else if (subMenu == 'URS-Initiator') {
  //     this.route.navigate(['./dms/user-initiator']);
  //   } else if (subMenu == 'URS-Department Reviewer') {
  //     this.route.navigate(['./dms/urs-review-home-page']);
  //   } else if (subMenu == 'URS-QA Reviewer') {
  //     this.route.navigate(['./dms/urs-qa-review-home-page']);
  //   } else if (subMenu == 'URS-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/urs-cross-function-review-home-page']);
  //   } else if (subMenu == 'URS-QA Approver') {
  //     this.route.navigate(['./dms/urs-qa-approver-review-home-page']);
  //   } else if (subMenu == 'URS-Authorization') {
  //     this.route.navigate(['./dms/urs-authorization-review-home-page']);
  //   } else if (subMenu == 'URS-Closure') {
  //     this.route.navigate(['./dms/urs-closure-review-home-page']);
  //   } else if (subMenu == 'URS-Update') {
  //     this.route.navigate(['./dms/urs-update-home-page']);
  //   } else if (subMenu == 'STP-Initiator') {
  //     this.route.navigate(['./dms/stp-initiator']);
  //   } else if (subMenu == 'STP-Department Reviewer') {
  //     this.route.navigate(['./dms/stp-review-home-page']);
  //   } else if (subMenu == 'STP-QA Reviewer') {
  //     this.route.navigate(['./dms/stp-qa-review-home-page']);
  //   } else if (subMenu == 'STP-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/stp-cross-function-review-home-page']);
  //   } else if (subMenu == 'STP-QA Approver') {
  //     this.route.navigate(['./dms/stp-qa-approver-review-home-page']);
  //   } else if (subMenu == 'STP-Authorization') {
  //     this.route.navigate(['./dms/stp-authorization-review-home-page']);
  //   } else if (subMenu == 'STP-Closure') {
  //     this.route.navigate(['./dms/stp-closure-review-home-page']);
  //   } else if (subMenu == 'STP-Update') {
  //     this.route.navigate(['./dms/stp-update-home-page']);
  //   } else if (subMenu == 'PVP-Initiator') {
  //     this.route.navigate(['./dms/pvp-initiator']);
  //   } else if (subMenu == 'PVP-Department Reviewer') {
  //     this.route.navigate(['./dms/pvp-review-home-page']);
  //   } else if (subMenu == 'PVP-QA Reviewer') {
  //     this.route.navigate(['./dms/pvp-qa-review-home-page']);
  //   } else if (subMenu == 'PVP-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/pvp-cross-function-review-home-page']);
  //   } else if (subMenu == 'PVP-QA Approver') {
  //     this.route.navigate(['./dms/pvp-qa-approver-review-home-page']);
  //   } else if (subMenu == 'PVP-Authorization') {
  //     this.route.navigate(['./dms/pvp-authorization-review-home-page']);
  //   } else if (subMenu == 'PVP-Closure') {
  //     this.route.navigate(['./dms/pvp-closure-review-home-page']);
  //   } else if (subMenu == 'PVP-Update') {
  //     this.route.navigate(['./dms/pvp-update-home-page']);
  //   } else if (subMenu == 'PVR-Initiator') {
  //     this.route.navigate(['./dms/pvr-initiator']);
  //   } else if (subMenu == 'PVR-Department Reviewer') {
  //     this.route.navigate(['./dms/pvr-review-home-page']);
  //   } else if (subMenu == 'PVR-QA Reviewer') {
  //     this.route.navigate(['./dms/pvr-qa-review-home-page']);
  //   } else if (subMenu == 'PVR-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/pvr-cross-function-review-home-page']);
  //   } else if (subMenu == 'PVR-QA Approver') {
  //     this.route.navigate(['./dms/pvr-qa-approver-review-home-page']);
  //   } else if (subMenu == 'PVR-Authorization') {
  //     this.route.navigate(['./dms/pvr-authorization-review-home-page']);
  //   } else if (subMenu == 'PVR-Closure') {
  //     this.route.navigate(['./dms/pvr-closure-review-home-page']);
  //   } else if (subMenu == 'PVR-Update') {
  //     this.route.navigate(['./dms/pvr-update-home-page']);
  //   } else if (subMenu == 'SOP-Initiator') {
  //     this.route.navigate(['./dms/sop-initiator']);
  //   } else if (subMenu == 'SOP-Department Reviewer') {
  //     this.route.navigate(['./dms/sop-review-home-page']);
  //   } else if (subMenu == 'SOP-QA Reviewer') {
  //     this.route.navigate(['./dms/sop-qa-review-home-page']);
  //   } else if (subMenu == 'SOP-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/sop-cross-function-review-home-page']);
  //   } else if (subMenu == 'SOP-QA Approver') {
  //     this.route.navigate(['./dms/sop-qa-approver-review-home-page']);
  //   } else if (subMenu == 'SOP-Authorization') {
  //     this.route.navigate(['./dms/sop-authorization-review-home-page']);
  //   } else if (subMenu == 'SOP-Closure') {
  //     this.route.navigate(['./dms/sop-closure-review-home-page']);
  //   } else if (subMenu == 'SOP-Update') {
  //     this.route.navigate(['./dms/sop-update-home-page']);
  //   } else if (subMenu == 'SPC-Initiator') {
  //     this.route.navigate(['./dms/spc-initiator']);
  //   } else if (subMenu == 'SPC-Department Reviewer') {
  //     this.route.navigate(['./dms/spc-review-home-page']);
  //   } else if (subMenu == 'SPC-QA Reviewer') {
  //     this.route.navigate(['./dms/spc-qa-review-home-page']);
  //   } else if (subMenu == 'SPC-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/spc-cross-function-review-home-page']);
  //   } else if (subMenu == 'SPC-QA Approver') {
  //     this.route.navigate(['./dms/spc-qa-approver-review-home-page']);
  //   } else if (subMenu == 'SPC-Authorization') {
  //     this.route.navigate(['./dms/spc-authorization-review-home-page']);
  //   } else if (subMenu == 'SPC-Closure') {
  //     this.route.navigate(['./dms/spc-closure-review-home-page']);
  //   } else if (subMenu == 'SPC-Update') {
  //     this.route.navigate(['./dms/spc-update-home-page']);
  //   } else if (subMenu == 'AWS-Initiator') {
  //     this.route.navigate(['./dms/aws-initiator']);
  //   } else if (subMenu == 'AWS-Department Reviewer') {
  //     this.route.navigate(['./dms/aws-review-home-page']);
  //   } else if (subMenu == 'AWS-QA Reviewer') {
  //     this.route.navigate(['./dms/aws-qa-review-home-page']);
  //   } else if (subMenu == 'AWS-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/aws-cross-function-review-home-page']);
  //   } else if (subMenu == 'AWS-QA Approver') {
  //     this.route.navigate(['./dms/aws-qa-approver-review-home-page']);
  //   } else if (subMenu == 'AWS-Authorization') {
  //     this.route.navigate(['./dms/aws-authorization-review-home-page']);
  //   } else if (subMenu == 'AWS-Closure') {
  //     this.route.navigate(['./dms/aws-closure-review-home-page']);
  //   } else if (subMenu == 'AWS-Update') {
  //     this.route.navigate(['./dms/aws-update-home-page']);
  //   } else if (subMenu == 'BMR-Initiator') {
  //     this.route.navigate(['./dms/bmr-initiator']);
  //   } else if (subMenu == 'BMR-Department Reviewer') {
  //     this.route.navigate(['./dms/bmr-review-home-page']);
  //   } else if (subMenu == 'BMR-QA Reviewer') {
  //     this.route.navigate(['./dms/bmr-qa-review-home-page']);
  //   } else if (subMenu == 'BMR-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/bmr-cross-function-review-home-page']);
  //   } else if (subMenu == 'BMR-QA Approver') {
  //     this.route.navigate(['./dms/bmr-qa-approver-review-home-page']);
  //   } else if (subMenu == 'BMR-Authorization') {
  //     this.route.navigate(['./dms/bmr-authorization-review-home-page']);
  //   } else if (subMenu == 'BMR-Closure') {
  //     this.route.navigate(['./dms/bmr-closure-review-home-page']);
  //   } else if (subMenu == 'BMR-Update') {
  //     this.route.navigate(['./dms/bmr-update-home-page']);
  //   } else if (subMenu == 'BPR-Initiator') {
  //     this.route.navigate(['./dms/bpr-initiator']);
  //   } else if (subMenu == 'BPR-Department Reviewer') {
  //     this.route.navigate(['./dms/bpr-review-home-page']);
  //   } else if (subMenu == 'BPR-QA Reviewer') {
  //     this.route.navigate(['./dms/bpr-qa-review-home-page']);
  //   } else if (subMenu == 'BPR-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/bpr-cross-function-review-home-page']);
  //   } else if (subMenu == 'BPR-QA Approver') {
  //     this.route.navigate(['./dms/bpr-qa-approver-review-home-page']);
  //   } else if (subMenu == 'BPR-Authorization') {
  //     this.route.navigate(['./dms/bpr-authorization-review-home-page']);
  //   } else if (subMenu == 'BPR-Closure') {
  //     this.route.navigate(['./dms/bpr-closure-review-home-page']);
  //   } else if (subMenu == 'BPR-Update') {
  //     this.route.navigate(['./dms/bpr-update-home-page']);
  //   } else if (subMenu == 'COA-Initiator') {
  //     this.route.navigate(['./dms/coa-initiator']);
  //   } else if (subMenu == 'COA-Department Reviewer') {
  //     this.route.navigate(['./dms/coa-review-home-page']);
  //   } else if (subMenu == 'COA-QA Reviewer') {
  //     this.route.navigate(['./dms/coa-qa-review-home-page']);
  //   } else if (subMenu == 'COA-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/coa-cross-function-review-home-page']);
  //   } else if (subMenu == 'COA-QA Approver') {
  //     this.route.navigate(['./dms/coa-qa-approver-review-home-page']);
  //   } else if (subMenu == 'COA-Authorization') {
  //     this.route.navigate(['./dms/coa-authorization-review-home-page']);
  //   } else if (subMenu == 'COA-Closure') {
  //     this.route.navigate(['./dms/coa-closure-review-home-page']);
  //   } else if (subMenu == 'COA-Update') {
  //     this.route.navigate(['./dms/coa-update-home-page']);
  //   } else if (subMenu == 'CVP-Initiator') {
  //     this.route.navigate(['./dms/cvp-initiator']);
  //   } else if (subMenu == 'CVP-Department Reviewer') {
  //     this.route.navigate(['./dms/cvp-review-home-page']);
  //   } else if (subMenu == 'CVP-QA Reviewer') {
  //     this.route.navigate(['./dms/cvp-qa-review-home-page']);
  //   } else if (subMenu == 'CVP-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/cvp-cross-function-review-home-page']);
  //   } else if (subMenu == 'CVP-QA Approver') {
  //     this.route.navigate(['./dms/cvp-qa-approver-review-home-page']);
  //   } else if (subMenu == 'CVP-Authorization') {
  //     this.route.navigate(['./dms/cvp-authorization-review-home-page']);
  //   } else if (subMenu == 'CVP-Closure') {
  //     this.route.navigate(['./dms/cvp-closure-review-home-page']);
  //   } else if (subMenu == 'CVP-Update') {
  //     this.route.navigate(['./dms/cvp-update-home-page']);
  //   } else if (subMenu == 'CVR-Initiator') {
  //     this.route.navigate(['./dms/cvr-initiator']);
  //   } else if (subMenu == 'CVR-Department Reviewer') {
  //     this.route.navigate(['./dms/cvr-review-home-page']);
  //   } else if (subMenu == 'CVR-QA Reviewer') {
  //     this.route.navigate(['./dms/cvr-qa-review-home-page']);
  //   } else if (subMenu == 'CVR-Cross Functional Reviewer') {
  //     this.route.navigate(['./dms/cvr-cross-function-review-home-page']);
  //   } else if (subMenu == 'CVR-QA Approver') {
  //     this.route.navigate(['./dms/cvR-qa-approver-review-home-page']);
  //   } else if (subMenu == 'CVR-Authorization') {
  //     this.route.navigate(['./dms/cvr-authorization-review-home-page']);
  //   } else if (subMenu == 'CVR-Closure') {
  //     this.route.navigate(['./dms/cvr-closure-review-home-page']);
  //   } else if (subMenu == 'CVR-Update') {
  //     this.route.navigate(['./dms/cvr-update-home-page']);
  //   } else if (subMenu == 'DQ-Initator') {
  //     this.route.navigate(['./sd/draft-initator-home-page']);
  //   } else if (subMenu == 'DQ-Reviewer') {
  //     this.route.navigate(['./sd/draft-reviewer-home-page']);
  //   } else if (subMenu == 'DQ-Update') {
  //     this.route.navigate(['./sd/draft-update-home-page']);
  //   } else if (subMenu == 'FQ-Initator') {
  //     this.route.navigate(['./sd/fair-initator-home-page']);
  //   } else if (subMenu == 'FQ-Reviewer') {
  //     this.route.navigate(['./sd/fair-reviewer-home-page']);
  //   } else if (subMenu == 'LMS-Master Data') {
  //     this.route.navigate(['./lms/lms-master-home-page']);
  //   } else if (subMenu == 'QMS-Master Data') {
  //     this.route.navigate(['./qms/qms-master-home-page']);
  //   } else if (subMenu == 'HR-Master Data') {
  //     this.route.navigate(['./hr/hr-master-home-page']);
  //   } else if (subMenu == 'FI-Master Data') {
  //     this.route.navigate(['./fi/fi-master-home-page']);
  //   } else if (subMenu == 'LIMS-Master Data') {
  //     this.route.navigate(['./lims/lims-master-home-page']);
  //   } else if (subMenu == 'LMS-Master Data') {
  //     this.route.navigate(['./lms/lms-master-home-page']);
  //   } else if (subMenu == 'CAPA-Initiator') {
  //     this.route.navigate(['./qms/capa-initiator']);
  //   } else if (subMenu == 'DEV-Initiator') {
  //     this.route.navigate(['./qms/dev-initiator']);
  //   } else if (subMenu == 'NCIA-Initiator') {
  //     this.route.navigate(['./qms/ncia-initiator']);
  //   } else if (subMenu == 'NCIA-Reviewer') {
  //     this.route.navigate(['./qms/ncia-reviewer-home-page']);
  //   } else if (subMenu == 'NCIA-Approver') {
  //     this.route.navigate(['./qms/ncia-reviewer-home-page']);
  //   } else if (subMenu == 'NCIA-Update') {
  //     this.route.navigate(['./qms/ncia-update-home-page']);
  //   } else if (subMenu == 'NCI-Initiator') {
  //     this.route.navigate(['./qms/nci-initiator']);
  //   } else if (subMenu == 'GWL-Initiator') {
  //     this.route.navigate(['./gl/gwl-initiator']);
  //   } else if (subMenu == 'GWL-Reviewer') {
  //     this.route.navigate(['./gl/gwl-reviewer']);
  //   } else if (subMenu == 'GWL-Approver') {
  //     this.route.navigate(['./gl/gwl-reviewer']);
  //   } else if (subMenu == 'GWL-Update') {
  //     this.route.navigate(['./gl/gwl-update']);
  //   } else if (subMenu == 'NCI-Initiator') {
  //     this.route.navigate(['./qms/nci-initiator']);
  //   } else if (subMenu == 'NCI-Department Reviewer') {
  //     this.route.navigate(['./qms/nci-department-review-home-page']);
  //   } else if (subMenu == 'NCI-QA Reviewer') {
  //     this.route.navigate(['./qms/nci-qa-review-home-page']);
  //   } else if (subMenu == 'NCI-Cross Functional Reviewer') {
  //     this.route.navigate(['./qms/nci-cross-review-home-page']);
  //   } else if (subMenu == 'NCI-QA Approver') {
  //     this.route.navigate(['./qms/nci-qa-approver-review-home-page']);
  //   } else if (subMenu == 'NCI-Authorization') {
  //     this.route.navigate(['./qms/nci-authorization-review-home-page']);
  //   } else if (subMenu == 'NCI-Closure') {
  //     this.route.navigate(['./qms/nci-closure-review-home-page']);
  //   } else if (subMenu == 'NCI-Update') {
  //     this.route.navigate(['./qms/nci-update-home-page']);
  //   } else if (subMenu == 'CC-Initiator') {
  //     this.route.navigate(['./qms/cc-initiator']);
  //   } else if (subMenu == 'MM-Master Data') {
  //     this.route.navigate(['./mm/mm-master-data-home-page']);
  //   } else if (subMenu == 'FQ-Update') {
  //     this.route.navigate(['./sd/fair-update-home-page']);
  //   } else if (subMenu == 'PDQ-Initiator') {
  //     this.route.navigate(['./mm/dq-initiator']);
  //   } else if (subMenu == 'PFQ-Initiator') {
  //     this.route.navigate(['./mm/fq-initiator']);
  //   } else if (subMenu == 'PPO-Initiator') {
  //     this.route.navigate(['./mm/po-initiator']);
  //   } else if (subMenu == 'PQT-Initiator') {
  //     this.route.navigate(['./mm/qt-initiator']);
  //   } else if (subMenu == 'PQT-Reviewer' || subMenu == 'PQT-Approver') {
  //     this.route.navigate(['./mm/qt-reviewer']);
  //   } else if (subMenu == 'PQT-Update') {
  //     this.route.navigate(['./mm/qt-update']);
  //   } else if (subMenu == 'QMS-Master Data') {
  //     this.route.navigate(['./qms/qms-master-home-page']);
  //   } else if (subMenu == 'CAPA-Initiator') {
  //     this.route.navigate(['./qms/capa-initiator']);
  //   } else if (subMenu == 'DEV-Initiator') {
  //     this.route.navigate(['./qms/dev-initiator']);
  //   } else if (subMenu == 'NCI-Initiator') {
  //     this.route.navigate(['./qms/nci-initiator']);
  //   } else if (subMenu == 'CC-Initiator') {
  //     this.route.navigate(['./qms/cc-initiator']);
  //   } else if (subMenu == 'MM-Master Data') {
  //     this.route.navigate(['./mm/mm-master-data-home-page']);
  //   } else if (subMenu == 'FQ-Update') {
  //     this.route.navigate(['./sd/fair-update-home-page']);
  //   } else if (subMenu == 'PDQ-Initiator') {
  //     this.route.navigate(['./mm/dq-initiator']);
  //   } else if (subMenu == 'PDQ-Update') {
  //     this.route.navigate(['./mm/dq-update']);
  //   } else if (subMenu == 'PDQ-Reviewer' || subMenu == 'PDQ-Approver') {
  //     this.route.navigate(['./mm/dq-reviewer']);
  //   } else if (subMenu == 'PFQ-Initiator') {
  //     this.route.navigate(['./mm/fq-initiator']);
  //   } else if (subMenu == 'PFQ-Update') {
  //     this.route.navigate(['./mm/fq-update']);
  //   } else if (subMenu == 'PFQ-Reviewer' || subMenu == 'PFQ-Approver') {
  //     this.route.navigate(['./mm/fq-reviewer']);
  //   } else if (subMenu == 'PPO-Initiator') {
  //     this.route.navigate(['./mm/po-initiator']);
  //   } else if (subMenu == 'PPO-Update') {
  //     this.route.navigate(['./mm/po-update']);
  //   } else if (subMenu == 'PPO-Reviewer' || subMenu == 'PPO-Approver') {
  //     this.route.navigate(['./mm/po-reviewer']);
  //   } else if (subMenu == 'PQT-Initiator') {
  //     this.route.navigate(['./mm/qt-initiator']);
  //   } else if (subMenu == 'PQT-Reviewer' || subMenu == 'PQT-Approver') {
  //     this.route.navigate(['./mm/qt-reviewer']);
  //   } else if (subMenu == 'PQT-Update') {
  //     this.route.navigate(['./mm/qt-update']);
  //   } else if (subMenu == 'PSI-Initiator') {
  //     this.route.navigate(['./mm/si-initiator']);
  //   } else if (subMenu == 'PSI-Reviewer' || subMenu == 'PSI-Approver') {
  //     this.route.navigate(['./mm/si-reviewer']);
  //   } else if (subMenu == 'PSI-Update') {
  //     this.route.navigate(['./mm/si-update']);
  //   } else if (subMenu == 'PSO-Initiator') {
  //     this.route.navigate(['./mm/so-initiator']);
  //   } else if (subMenu == 'PSO-Reviewer' || subMenu == 'PSO-Approver') {
  //     this.route.navigate(['/mm/so-reviewer']);
  //   } else if (subMenu == 'PSO-Update') {
  //     this.route.navigate(['./mm/so-update']);
  //   } else if (subMenu == 'PDO-Initiator') {
  //     this.route.navigate(['./mm/do-initiator']);
  //   } else if (subMenu == 'PDO-Reviewer' || subMenu == 'PDO-Approver') {
  //     this.route.navigate(['/mm/do-reviewer']);
  //   } else if (subMenu == 'PDO-Update') {
  //     this.route.navigate(['/mm/do-update']);
  //   } else if (subMenu == 'SSI-Initiator') {
  //     this.route.navigate(['/sd/si-initiator']);
  //   } else if (subMenu == 'SSI-Update') {
  //     this.route.navigate(['./sd/si-update']);
  //   } else if (subMenu == 'SSI-Reviewer' || subMenu == 'SSI-Approver') {
  //     this.route.navigate(['./sd/si-reviewer']);
  //   } else if (subMenu == 'SFQ-Initiator') {
  //     this.route.navigate(['/sd/fair-init']);
  //   } else if (subMenu == 'SFQ-Update') {
  //     this.route.navigate(['/sd/fair-update']);
  //   } else if (subMenu == 'SFQ-Reviewer' || subMenu == 'SFQ-Approver') {
  //     this.route.navigate(['sd/fair-reviewer']);
  //   } else if (subMenu == 'SDQ-Initiator') {
  //     this.route.navigate(['/sd/dq-init']);
  //   } else if (subMenu == 'SDQ-Update') {
  //     this.route.navigate(['/sd/dq-update']);
  //   } else if (subMenu == 'SDQ-Reviewer' || subMenu == 'SDQ-Approver') {
  //     this.route.navigate(['/sd/dq-reviwer']);
  //   } else if (subMenu == 'SSO-Initiator') {
  //     this.route.navigate(['./sd/so-initiator']);
  //   } else if (subMenu == 'SSO-Reviewer' || subMenu == 'SSO-Approver') {
  //     this.route.navigate(['/sd/so-reviewer']);
  //   } else if (subMenu == 'SSO-Update') {
  //     this.route.navigate(['./sd/so-update']);
  //   } else if (subMenu == 'SDO-Initiator') {
  //     this.route.navigate(['./sd/do-initiator']);
  //   } else if (subMenu == 'SDO-Reviewer' || subMenu == 'SDO-Approver') {
  //     this.route.navigate(['/sd/do-reviewer']);
  //   } else if (subMenu == 'SDO-Update') {
  //     this.route.navigate(['./sd/do-update']);
  //   } else if (subMenu == 'SPO-Initiator') {
  //     this.route.navigate(['./sd/po-initiator']);
  //   } else if (subMenu == 'SPO-Update') {
  //     this.route.navigate(['./sd/po-update']);
  //   } else if (subMenu == 'SPO-Reviewer' || subMenu == 'SPO-Approver') {
  //     this.route.navigate(['./sd/po-reviewer']);
  //   } else if (subMenu === 'URS-Module  Admin') {
  //     this.route.navigate(['./dms/dms-module-admin']);
  //   } else if (subMenu == 'LMSQB-Update') {
  //     this.route.navigate(['./lms/lmsqb-update-home-page']);
  //   } else if (subMenu == 'LMSQB-Initiator') {
  //     this.route.navigate(['./lms/lmsqb-initator']);
  //   } else if (subMenu == 'URS-PR-Initiator') {
  //     this.route.navigate(['./dms/urs-pr-init-save']);
  //   } else if (subMenu === 'ES-Initiator') {
  //     this.route.navigate(['./excel/es-init']);
  //   } else if (subMenu === 'ES-Update') {
  //     this.route.navigate(['./excel/es-update']);
  //   } else if (subMenu === 'ES-Reviewer' || subMenu === 'ES-Approver') {
  //     this.route.navigate(['/excel/es-reviewer']);
  //   } else if (subMenu === 'RAS1-Initiator') {
  //     this.route.navigate(['/excel/rasi-init']);
  //   } else if (subMenu === 'RAS1-Update') {
  //     this.route.navigate(['/excel/rasi-update']);
  //   } else if (subMenu === 'RAS1-Reviewer' || subMenu == 'RAS1-Approver') {
  //     this.route.navigate(['/excel/rasi-reviewer']);
  //   } else if (subMenu === 'WSR-Initiator') {
  //     this.route.navigate(['/lims/wsr-init']);
  //   } else if (subMenu === 'WSR-Update') {
  //     this.route.navigate(['/lims/wsr-update']);
  //   } else if (subMenu === 'WSR-Reviewer' || subMenu == 'WSR-Approver') {
  //     this.route.navigate(['/lims/wsr-reviewer']);
  //   } else if (subMenu === 'FAS1-Initiator') {
  //     this.route.navigate(['/excel/fas1-initiator']);
  //   } else if (subMenu === 'BLG-Initiator') {
  //     this.route.navigate(['/blg/blg-initiator']);
  //   } else if (subMenu === 'BLG-Update') {
  //     this.route.navigate(['/blg/blg-update']);
  //   } else if (subMenu === 'BLG-Reviewer' || subMenu == 'BLG-Approver') {
  //     this.route.navigate(['/blg/blg-reviewer']);
  //   }
  //   else if (subMenu === 'FAS1-Update') {
  //     this.route.navigate(['/excel/fas1-update']);
  //   } else if (subMenu === 'FAS1-Reviewer' || subMenu == 'FAS1-Approver') {
  //     this.route.navigate(['/excel/fas1-reviewer']);
  //   } else if (subMenu === 'TR-Initiator') {
  //     this.route.navigate(['/lims/test-registration-initiator']);
  //   }
  // }
  //without login
  onHome() {
    //on home
  }

  onGuildeLines() {
    this.route.navigate(['./guidelines']);
  }
}
