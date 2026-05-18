import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { IwsService } from '../iws.service';

@Component({
  selector: 'app-iws-initiator',
  standalone: false,
  templateUrl: './iws-initiator.component.html',
  styleUrl: './iws-initiator.component.scss'
})
export class IwsInitiatorComponent implements OnInit {
  public pageData: any;
  public headerData: any;
  public isLoading: boolean;
  public disableButtons = false;
  public comments: string;
  public headerRequestBody: any;
  public nextStageListData: any;
  parameterNo:number = 0;
  setPointNo:number = 0;
  parameterName:any;
  parameters: any[] = [];
  uomList = ['°C', 'RPM', 'Bar', 'Kg', 'Minutes', 'pH', 'mL', '%'];
  constructor(
    public dialog: MatDialog,
    private iwsSwervice:IwsService,
    private toolbarService: ToolbarService,
    private lifeCycleDataService: LifeCycleDataService,
    private remoteLoader: RemoteComponentLoaderService,
  ) { }
  ngOnInit(): void {
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'BMR-Initiator',
    };
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();
  }
  getHeaderData(event: any) {
    console.log(event);
    this.headerData = event;
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      lcStage: this.toolbarService.currentStage,
    };
    console.log(body);
    this.iwsSwervice.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
  onGenerateParameters(){
this.parameters = [];

  for (let i = 0; i < this.parameterNo; i++) {
    const setPoints = [];

    for (let j = 0; j < this.setPointNo; j++) {
      setPoints.push({
        setPoint: '',
        min: '',
        max: '',
        uom: '',
        result: '',
        passLimit: ''
      });
    }

    this.parameters.push({
      parameterNo: i + 1,
      parameterName:this.parameterName,
      setPoints: setPoints
    });
      console.log(this.parameters);
  }
  
  }
  checkResult(setPointObj: any) {
  const setPoint = parseFloat(setPointObj.setPoint);
  const min = parseFloat(setPointObj.min);
  const max = parseFloat(setPointObj.max);

  if (!isNaN(setPoint) && !isNaN(min) && !isNaN(max)) {
    if (setPoint >= min && setPoint <= max) {
      setPointObj.result = 'PASS';
    } else {
      setPointObj.result = 'FAIL';
    }
  } else {
    setPointObj.result = '';
  }
}
  async onSaveConfirmation() {
    const component = await this.remoteLoader.loadComponentByKey('CommonESignatureComponent');
    const dialogRef = this.dialog.open(component, {
      height: '300px',
      width: '600px',
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        if (this.selectedDialogData) {
          this.onSubmit('0');
        }
      }
    });

  }
  selectedDialogData: any;
  async onSubmitConfirmation() {
    // if (this.documentDtoList.length > 0) {
    const component = await this.remoteLoader.loadComponentByKey('CommonESignatureComponent');
    const dialogRef = this.dialog.open(component, {
      height: '300px',
      width: '600px',
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        if (this.selectedDialogData) {
          this.onSubmit('1');
        }
      }
    });
    // } else {
    //   this.dialog.open(MessageDialogComponent, {
    //     data: {
    //       message: 'please add document before procced.',
    //       heading: 'Error Information',
    //     },
    //   });
    // }
  }
  onSubmit(value: any) {
    this.disableButtons = true;
    let draftValue: boolean;
    if (value == 1) {
      draftValue = false;
    } else {
      draftValue = true;
    }


    let body = {

    };

    this.isLoading = true;
    // this.dmsService
    //   .bmrOnCreate(selectedFile, selectedAttachment, body)
    //   .subscribe((data: any) => {
    //     if (data.errorInfo != null) {
    //       this.isLoading = false;
    //       this.dialog.open(MessageDialogComponent, {
    //         data: {
    //           message: data.errorInfo.message,
    //           heading: 'Error Information',
    //         },
    //       });
    //     } else {
    //       this.isLoading = false;

    //       this.notificationService.showSuccess(data.status, () => { });
    //       timer(2000)
    //         .pipe(takeUntil(this.destroy$))
    //         .subscribe(() => {
    //           this.router.navigateByUrl('/rqpquailtyui/dms/bmr-module-home-page');
    //         });
    //     }
    //   });
  }
}
