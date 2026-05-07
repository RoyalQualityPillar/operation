import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarService } from '../../service/toolbar.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CookieService } from 'ngx-cookie-service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from '../../common/global-constants';
import { AuthService } from 'src/app/service/auth.service';
import { ThemeService } from 'src/app/service/theme.service';
import { ApiService } from 'src/app/service/api-service/api.service';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { routesMap } from 'src/app/common/router-constant';
import { NotificationService } from 'src/app/common/notification.service';
export interface selectedRowInterface {
  userId: string;
  lifeCycleCode: string;
  lcRole: string;
  stage: number;
  moduleName: string;
  moduelCode: string;
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  standalone: false,
})
export class DataTableComponent implements OnInit, AfterViewInit {
  public selection = new SelectionModel<any>(true, []);
  public moduleData: any;
  public tableData: MatTableDataSource<any>;
  public copiedData: any;
  public lifeCycleInfoDataLength: any;
  public tableDataLoaded = false;
  public size: any;
  public processdata: any;
  public filterObject: any;
  public isLoading = false;
  public logoUrl: string;
  public downloadTxt: any;
  public downloadCsvFile: any;
  public isFilterExpanded = false;
  public lifeCycleTableDataURL: any;
  public filterApiUrl: any;
  public HttpMethod: any;
  public params: any;
  public module: any;
  public mainmodule: any;
  public cureentSelectedRow: any;
  public selectedUserId: any;
  public selectedModuleName: any;
  public selectedLifecycleCode: any;
  public totalRow: any;
  public selectedRow: any;
  public pageIndex = 0;
  public newList: any;
  public columnConfig = {
    action: 'Action',
    userid: 'User ID',
    lcnum: 'Life Cycle Code',
    lcrole: 'LC Role',
    stage: 'Stage',
    ff0003: 'Module Code',
    ff0001: 'Module Name',
  };
  public filterOptions: string[] = Object.keys(this.columnConfig);
  public tableTitle: string = 'User Rights & Life Cycle Data';
  public buttonConfig = [
    { label: 'Submit', action: 'submit', color: 'primary' },
  ];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private route: Router,
    private router: ActivatedRoute,
    private toolbarService: ToolbarService,
    private lifeCycleDataService: LifeCycleDataService,
    private cookieService: CookieService,
    private authService: AuthService,
    private dialog: MatDialog,
    private themeService: ThemeService,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  public toggleFilter(): void {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((data: any) => {
      this.module = data.idMainCode;
      this.mainmodule = data.idName;
    });
    let pageIndex = this.pageIndex;
    let size = GlobalConstants.size;
    let userId = this.cookieService.get('userId');
    let module = this.module;
    let mainmodule = this.mainmodule;
    let unitCode = this.cookieService.get('buCode');
    let munitCode = this.cookieService.get('buCode');
    this.params = {
      userId,
      pageIndex,
      size,
      module,
      mainmodule,
      unitCode,
      munitCode,
    };
    this.filterApiUrl = '';
    this.lifeCycleTableDataURL = apiEndPoints.lifeCycleTableData;
    this.HttpMethod = 'GET';
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    this.toggleTheme();
    window.scrollTo(0, 0);
  }

  public getLogo(): void {
    this.authService
      .getLogoDetail(this.cookieService.get('userId'))
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
  public toggleTheme(): void {
    let cssCode = this.cookieService.get('cssCode');
    if (cssCode == 'A') {
      this.themeService.applyGroupStyles(1);
    } else if (cssCode == 'B') {
      this.themeService.applyGroupStyles(2);
    } else if (cssCode == 'C') {
      this.themeService.applyGroupStyles(3);
    } else if (cssCode == 'D') {
      this.themeService.applyGroupStyles(4);
    } else {
      this.themeService.applyGroupStyles(1);
    }
  }

  public onPrint(): void {
    window.print();
  }

  public onSelectRow(val: any): void {
    this.cureentSelectedRow = this.selection.selected;
    if (this.cureentSelectedRow.length == 1) {
      this.selectedUserId = this.cureentSelectedRow[0].userid;
      this.selectedLifecycleCode = this.cureentSelectedRow[0].lcrole;
      this.selectedModuleName = this.cureentSelectedRow[0].stage;
    } else if (this.cureentSelectedRow.length > 1) {
      let arrayLength = this.cureentSelectedRow.length - 1;
      this.selectedUserId = this.cureentSelectedRow[arrayLength].userid;
      this.selectedLifecycleCode = this.cureentSelectedRow[arrayLength].lcrole;
      this.selectedModuleName = this.cureentSelectedRow[arrayLength].stage;
    } else {
      this.dialog.open(MessageDialogComponent, {
        width: '400px',
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
      return;
    }
    let body = {
      userid: '',
      lcrole: '',
      stage: '',
    };
    body.userid = this.selectedUserId;
    body.lcrole = this.selectedLifecycleCode;
    body.stage = this.selectedModuleName;
    this.selection.clear();
    this.lifeCycleDataService.getModuleName(body).subscribe((data: any) => {
      this.cookieService.set('moduleCode', data[0].ff0003); //uc0001 to ff0003
      this.cookieService.set('subMenuFlag', 'true');
      this.cookieService.set('menuHeader', data[0].stage);
      this.cookieService.set('subMenu1', data[0].links);
      this.route.navigate(['./module-home-page']);
    });
  }

  public setSelectedID(row: any): void {
    this.selectedRow = row;
  }
  public onSubmit(val: any): void {
    if (this.selectedRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
    } else {
      let body = {
        userId: '',
        lcnum: '',
      };
      body.userId = this.selectedRow.userid;
      body.lcnum = this.selectedRow.lcnum;
      const selectedRowInterfaceData: selectedRowInterface = {
        userId: this.selectedRow.userid,
        lifeCycleCode: this.selectedRow.lcnum,
        lcRole: this.selectedRow.lcrole,
        stage: this.selectedRow.stage,
        moduleName: this.selectedRow.uc0001,
        moduelCode: this.selectedRow.ff0001,
      };
      this.lifeCycleDataService.setSelectedRowData(selectedRowInterfaceData);
      this.isLoading = true;
      this.lifeCycleDataService.getModuleName(body).subscribe((data: any) => {
        this.moduleData = data[0];
        this.cookieService.set('moduleCode', data[0].ff0003);
        this.redirect(data);
        this.isLoading = false;
      });
    }
  }
  public redirect(data: any): void {
    this.cookieService.set('subMenuFlag', 'true');
    this.cookieService.set('menuHeader', data[0]?.ff0001);
    let isfindSuccessDQ = 0;
    let dqObj = {
      ff0001: 'Sale Quatetion',
      lcnum: 'RQP1DQWHLC0002',
      lcrole: 'DQ-Update',
      stage: 1,
      userId: this.selectedRow.userid,
    };
    data.forEach((ele) => {
      if (ele.lcrole == 'DQ-Initator' || ele.lcrole == 'DQ-Reviewer') {
        ++isfindSuccessDQ;
      }
    });
    if (isfindSuccessDQ > 0) {
      data.push(dqObj);
    }

    let isfindSuccessFQ = 0;
    let fqObj = {
      ff0001: 'Fair Quatetion',
      lcnum: 'RQP1FQWHLC0002',
      lcrole: 'FQ-Update',
      stage: 1,
      userId: this.selectedRow.userid,
    };
    data.forEach((ele) => {
      if (ele.lcrole == 'FQ-Initator' || ele.lcrole == 'FQ-Reviewer') {
        ++isfindSuccessFQ;
      }
    });
    if (isfindSuccessFQ > 0) {
      data.push(fqObj);
    }
    this.lifeCycleDataService.subMenuList = data;
    const ff0003 = data[0].ff0003;

    if (ff0003 in routesMap) {
      if (ff0003 === 'SQT') {
        this.lifeCycleDataService.allQtHomePageStageValue =
          this.selectedRow.stage;
      }
      this.route.navigate([routesMap[ff0003]]);
    } else {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'You dont have access for this module',
          heading: 'Error Information',
        },
      });
    }
  }

  public handleButtonAction(event: { action: string; row: any }): void {
    const { action, row } = event;
    this.selectedRow = row;
    switch (action) {
      case 'submit':
        this.onSubmit(row);
        break;
    }
  }

  public showSuccess(): void {
    this.notificationService.showSuccess('Operation Successful!', () => {
      console.log('Success Snackbar Closed');
    });
  }

  public showError(): void {
    this.notificationService.showError('An Error Occurred!', () => {
      console.log('Error Snackbar Closed');
    });
  }

  public showWarning(): void {
    this.notificationService.showWarning('This is a Warning!', () => {
      console.log('Warning Snackbar Closed');
    });
  }
}
