import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
  standalone: false,
})
export class CommonHeaderComponent implements OnInit {
  @Output() headerData = new EventEmitter<any>();
  // @Output() requestNo = new EventEmitter<any>();
  @Input() pageData: any;
  HeaderForm: FormGroup;
  isReadonly = true;
  constructor(
    public fb: FormBuilder,
    private shareHostDataService: ShareHostDataService,
    private toolbarService: ToolbarService,
    private lifeCycleDataService: LifeCycleDataService
  ) {
    this.HeaderForm = this.fb.group({
      unitcode: [''],
      lcnum: [''],
      modulecode: [''],
      stage: [''],
      departmentcode: [''],
      role: [''],
      createdby: [''],
      requestNo: [''],
      version: [''],
    });
  }
  headerRequestBody: any;
  headerDetail: any;
  currentVersion: any;
  isAdmin: any;
  currentStage: any;
  ngOnInit(): void {
    console.log('working');
    console.log(this.pageData);
    console.log(this.pageData.pageName);
    if (this.pageData.version) {
      this.currentVersion = this.pageData.version.split('.')[0];
      this.currentStage = this.pageData.version.split('.')[2];
    }
    console.log(this.currentVersion);
    console.log(this.currentStage);
    if (this.currentVersion > 0 && this.currentStage == 0) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    // this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.headerRequestBody = this.shareHostDataService.selectedRowInterfaceData;
    console.log(this.headerRequestBody);
    if (this.pageData.pageName == 'qt-review' || 'qtUpdateDetail' || 'lms') {
      this.HeaderForm.controls['requestNo'].setValue(this.pageData.requestNo);
      this.HeaderForm.controls['version'].setValue(this.pageData.version);
    }

    let body: any;
    let lifeCycleCode: any;
    let currentStage: any;
    console.log(this.pageData.pageType);
    if (this.pageData.pageType == 'create') {
      //let currentStageValue = this.lifeCycleDataService.getSelectedRowData()
      //console.log(currentStageValue);
      //currentStage=currentStageValue.stage
      //currentStage = this.toolbarService.currentStage;
      currentStage = this.shareHostDataService.currentStage;
      // lifeCycleCode = this.headerRequestBody.lifeCycleCode;
      lifeCycleCode = this.headerRequestBody.lcnum;
    } else {
      currentStage = this.shareHostDataService.selectedStage;
      // currentStage = this.toolbarService.selectedStage;
      lifeCycleCode = this.toolbarService.getSelectedLifeCycleCode();
    }

    console.log(lifeCycleCode);
    body = {
      createdBy: this.headerRequestBody.userid,
      lcNumber: lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      //lcStage:this.toolbarService.currentStage
      // lcRole: this.toolbarService.currentSelectedMenu,
      // lcStage: currentStage,
      lcRole: this.shareHostDataService.currentSelectedMenu,
      lcStage: this.shareHostDataService.currentStage,
      uc0001: this.pageData.requestNo,
    };
    console.log(this.isAdmin);
    this.toolbarService
      .getHeaderCommonData(body, this.isAdmin)
      .subscribe((data: any) => {
        console.log(data);
        this.headerDetail = data.data[0];
        this.isReadonly = true;
        this.HeaderForm.controls['unitcode'].setValue(
          this.headerDetail.unitcode
        );
        this.HeaderForm.controls['lcnum'].setValue(this.headerDetail.lcnum);
        this.HeaderForm.controls['modulecode'].setValue(
          this.headerDetail.modulecode
        );
        this.HeaderForm.controls['departmentcode'].setValue(
          this.headerDetail.departmentcode
        );

        this.HeaderForm.controls['role'].setValue(this.headerDetail.role);

        this.HeaderForm.controls['stage'].setValue(this.headerDetail.stage);
        this.HeaderForm.controls['createdby'].setValue(
          this.headerDetail.createdby
        );
        if (
          this.pageData.pageName == 'qt-review' ||
          'qtUpdateDetail' ||
          'lms'
        ) {
          this.headerDetail.requestNo = this.pageData.requestNo;
        }
        this.headerData.emit(this.headerDetail);
      });
  }
}
