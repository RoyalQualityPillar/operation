import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalConstants } from '../global-constants';
import { Subscription, take } from 'rxjs';
import { SdService } from 'src/app/rqp-sd-module/sd.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { exportData } from 'bk-export';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';

@Component({
  selector: 'app-reviewer-template',
  templateUrl: './reviewer-template.component.html',
  styleUrls: ['./reviewer-template.component.scss'],
  standalone: false,
})
export class ReviewerTemplateComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() Url: string;
  @Input() childType: string = 'default';
  selection = new SelectionModel<any>(true, []);
  @ViewChild('tableWrapper', { static: true }) tableWrapper: ElementRef;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChildren(MatPaginator) matPaginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) matSort = new QueryList<MatSort>();
  @Output() module = new EventEmitter();
  public hideNextSteps = false;
  public displayedColumns: string[] = [
    'action',
    'uc0001',
    'ff0001',
    'ff0003',
    'ff0004',
    'ff0005',
    'ff0007',
    'createdby',
    'status',
    'createdon',
  ];
  public isLoading: boolean;
  public headerData: any;
  public headerRequestBody: any;
  public requestType = null;
  public page = 0;
  public pageSize = GlobalConstants.size;
  private headerDataSubscription: Subscription;
  private getReviewDataAPICall: Subscription;
  public dataSource: any;
  public copiedData: string;
  public tableData = new MatTableDataSource();
  public tableDataLoaded: boolean;
  //toolbarService: any;
  public filterFieldError = false;
  public filterValueError = false;
  public filterObject: any;
  public isFilterExpanded = true;
  public selectedRow: any;
  public newList: any;
  public previousTableList: any;
  public paginationFinalList = [];
  public totalRow: any;

  constructor(
    public sdService: SdService,
    private shareHostDataService: ShareHostDataService,
    public lifeCycleDataService: LifeCycleDataService,
    public router: Router,
    private toolbarService: ToolbarService,
    private activate: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.filterObject = {
      field: 'SELECT',
      value: '',
      condition: 'SELECT',
    };
    // this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.headerRequestBody = this.shareHostDataService.selectedRowInterfaceData;
  }
  ngAfterViewInit(): void {
    let navigate: boolean;
    this.activate.queryParams.subscribe((data: any) => {
      navigate = data.navigate;
      if (navigate) {
        this.lifeCycleDataService.chartData
          .asObservable()
          .subscribe((data: any) => {
            this.dataSource = data;
            this.copiedData = JSON.stringify(this.dataSource);
            this.tableData = new MatTableDataSource(this.dataSource);
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
          });
      }
    });
    let body: any;
    if (!navigate) {
      body = {
        createdBy: this.headerRequestBody.userid,
        lcNumber: this.headerRequestBody.lcnum,
        // lcNumber: this.headerRequestBody.lifeCycleCode,
        // lcStage: this.headerRequestBody.stage,
        lcStage: this.shareHostDataService.currentStage,
        //lcStage: this.toolbarService.currentStage,
        //lcRole:this.headerRequestBody.lcRole,
        lcRole: this.shareHostDataService.currentSelectedMenu,
        //lcRole: this.toolbarService.currentSelectedMenu,
      };
      if (this.childType == 'completed') {
        this.headerDataSubscription = this.toolbarService
          .getHeaderData(body, true)
          .subscribe((data: any) => {
            this.headerData = data.data[0];
            if (this.headerData) {
              this.onReviewCompletedData();
            }
          });
      }
      if (this.childType == 'terminated') {
        this.headerDataSubscription = this.toolbarService
          .getHeaderData(body, true)
          .subscribe((data: any) => {
            this.headerData = data.data[0];
            if (this.headerData) {
              this.onReviewTerminatedData();
            }
          });
      }
      if (this.childType == 'obsoleted') {
        this.headerDataSubscription = this.toolbarService
          .getHeaderData(body, true)
          .subscribe((data: any) => {
            this.headerData = data.data[0];
            if (this.headerData) {
              this.onReviewObsoletedData();
            }
          });
      }
      if (this.childType == 'process') {
        this.headerDataSubscription = this.toolbarService
          .getHeaderData(body, true)
          .subscribe((data: any) => {
            this.headerData = data.data[0];

            if (this.headerData) {
              this.onProcessCompletedData();
            }
          });
      } else if (this.childType == 'todoAll') {
        this.headerDataSubscription = this.sdService
          .getHeaderData(body)
          .subscribe((data: any) => {
            this.headerData = data.data[0];
            this.module.emit(this.headerData.role);
            if (this.headerData) {
              this.onReviewerData();
            }
          });
      }
    }
  }

  public toggleFilter(): void {
    this.isFilterExpanded = !this.isFilterExpanded;
  }
  public onReviewerData(): void {
    this.isLoading = true;
    if (this.headerData.role.includes('Cross Functional Reviewer')) {
      this.requestType = 'specific';
    }
    this.getReviewDataAPICall = this.sdService
      .getReviewerData(
        this.headerData.lcnum,
        this.headerData.stage,
        this.page,
        this.pageSize,
        this.requestType
      )
      .pipe(take(1))
      .subscribe((data: any) => {
        if (data) {
          this.dataSource = data.data.content;
          this.copiedData = JSON.stringify(this.dataSource);
          this.tableData = new MatTableDataSource(this.dataSource);
          this.tableData.paginator = this.paginator;
          this.tableData.sort = this.sort;
          this.tableDataLoaded = true;
          ///  this.toolbarService.setTableData(this.dataSource)
          this.isLoading = false;
        }
      });
  }
  public onReviewCompletedData(): void {
    this.isLoading = true;
    this.getReviewDataAPICall = this.sdService
      .getReviewerCompletedData(
        this.headerData.unitcode,
        this.headerData.modulecode,
        this.page,
        this.pageSize
      )
      .pipe(take(1))
      .subscribe((data: any) => {
        this.dataSource = data.data;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded = true;
        ///  this.toolbarService.setTableData(this.dataSource)
        this.isLoading = false;
      });
  }
  public onReviewTerminatedData(): void {
    this.isLoading = true;
    this.getReviewDataAPICall = this.sdService
      .getReviewerTerminatedData(
        this.headerData.unitcode,
        this.headerData.modulecode,
        this.page,
        this.pageSize
      )
      .pipe(take(1))
      .subscribe((data: any) => {
        this.dataSource = data.data;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded = true;
        ///  this.toolbarService.setTableData(this.dataSource)
        this.isLoading = false;
      });
  }
  public onReviewObsoletedData(): void {
    this.isLoading = true;
    this.getReviewDataAPICall = this.sdService
      .getReviewerObsoletedData(
        this.headerData.unitcode,
        this.headerData.modulecode,
        this.page,
        this.pageSize
      )
      .pipe(take(1))
      .subscribe((data: any) => {
        this.dataSource = data.data;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded = true;
        ///  this.toolbarService.setTableData(this.dataSource)
        this.isLoading = false;
      });
  }
  public onProcessCompletedData(): void {
    this.isLoading = true;
    this.getReviewDataAPICall = this.sdService
      .getInProcessCompletedData(
        this.headerData.unitcode,
        this.headerData.modulecode,
        this.page,
        this.pageSize
      )
      .pipe(take(1))
      .subscribe((data: any) => {
        this.dataSource = data.data;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded = true;
        ///  this.toolbarService.setTableData(this.dataSource)
        this.isLoading = false;
      });
  }
  public onRequestVersion(row): string {
    return row.ff0007 + '.' + row.ff0008 + '.' + row.ff0009 + '.' + row.ff0010;
  }
  onStatus(statusCode: any) {
    if (statusCode == 1001) {
      return 'ACTIVE';
    } else if (statusCode == 1004) {
      return 'LOCKED';
    } else if (statusCode == 1005) {
      return 'UNLOCKED';
    } else if (statusCode == 1003) {
      return 'DISABLE';
    } else {
      return '';
    }
  }
  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tableData.filter = filterValue;
  }

  public setSelectedID(row: any): void {
    this.selectedRow = row;
  }
  //Pagination
  public pageChanged(event): void {
    if (this.dataSource.length == GlobalConstants.size) {
      if (
        event.length - (event.pageIndex + 1) * event.pageSize == 0 ||
        event.length < event.pageSize
      ) {
        this.onPaginationCall();
      }
    }
  }

  public onPaginationCall(): void {
    //this.dataSource.push(...this.getNewList);
    //add dataSorce,pagination, sort
    // this.pageIndex=this.pageIndex+1;
    // this.size=GlobalConstants.size;
    this.isLoading = true;
    this.sdService
      .getReviewerData(
        this.headerData.lcnum,
        this.headerData.stage,
        this.page,
        this.pageSize,
        null
      )
      .subscribe((data: any) => {
        this.newList = data.data.content;
        this.dataSource.push(...this.newList);
        this.previousTableList = JSON.parse(this.copiedData);
        //this.copiedData.push(...this.newTableList);
        this.previousTableList.push(...this.newList);
        this.copiedData = this.previousTableList;
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.matPaginator.toArray()[0];
        this.tableData.sort = this.matSort.toArray()[0];
        this.isLoading = false;
      });
  }

  public applyFilterByColumn(): void {
    this.filterFieldError = false;
    this.filterValueError = false;
    if (
      this.filterObject.field == '' ||
      this.filterObject.field == null ||
      this.filterObject.field == undefined ||
      this.filterObject.field == 'SELECT'
    ) {
      this.filterFieldError = true;
      return;
    }
    if (
      this.filterObject.value == '' ||
      this.filterObject.value == null ||
      this.filterObject.value == undefined
    ) {
      this.filterValueError = true;
      return;
    }

    let field = this.filterObject.field;
    let value = this.filterObject.value;

    this.tableData.filterPredicate = (data: any, filter: string) => {
      const textToSearch = (data[field] && data[field].toLowerCase()) || '';
      return textToSearch.indexOf(filter) !== -1;
    };
    this.tableData.filter = value.trim().toLowerCase();
  }

  public onClearFilter(): void {
    this.tableData.filter = '';
    this.filterObject.field = 'SELECT';
    this.filterObject.value = '';
    this.filterFieldError = false;
    this.filterValueError = false;
  }
  public onSubmit(): void {
    this.toolbarService.selectedStage = this.selectedRow.ff0009;
    this.toolbarService.setSelectedLifeCycleCode(this.selectedRow.ff0001);
    this.router.navigate([this.Url], {
      queryParams: this.selectedRow,
    });
  }
  public copyData() {
    var dataArray = '';
    let tableData: any;
    tableData = this.dataSource;
    tableData.forEach((row) => {
      dataArray += this.ObjectToArray(row);
    });

    return dataArray;
  }

  public ObjectToArray(obj: any): string {
    let result = Object.keys(obj).map((key: keyof typeof obj) => {
      let value = obj[key];
      return value;
    });
    return result.toString() + '\n';
  }

  public downloadPdf(): void {
    let header: string[] = [
      'S No.',
      'Request No',
      'Life Cycle Code',
      'Unit Code',
      'Department',
      'Module Code',
      'Status',
      'Created By',
      'Created Date',
    ];
    // this.totalRow=this.lifeCycleInfoDataLength;
    var img = new Image();
    img.src = 'assets/logo1.png';
    let doc = new jsPDF('p', 'mm', 'A4');
    let col: any = [];
    col = [header];
    let rows: any = [];

    this.dataSource.forEach(
      (element: {
        'Request No': any;
        'Life Cycle Code': any;
        'Unit Code': any;
        Department: any;
        'Module Code': any;
        Status: any;
        'Created By': any;
        'Created Date': any;
      }) => {
        var temp = [
          element['uc0001'],
          element['ff0001'],
          element['ff0003'],
          element['ff0004'],
          element['ff0005'],
          element['status'],
          element['createdby'],
          element['createdon'],
        ];
        rows.push(temp);
      }
    );
    doc.setFillColor(255, 128, 0);
    doc.rect(5, 24, 200, 8, 'F');
    doc.setFontSize(14);
    doc.text('Quotation reviewer', 66, 30);
    doc.addImage(img, 'gif', 170, 5, 30, 15);
    autoTable(doc, {
      head: col,
      body: rows,
      showHead: 'everyPage',
      startY: 35,
      margin: { right: 5, left: 5 },
      tableWidth: 'auto',
      didDrawPage: (dataArg) => {
        doc.text('', dataArg.settings.margin.left, 20);
      },
    });
    let fileName = 'psi';
    doc.save(fileName + '.pdf');
  }
  public downloadExcel(): void {
    let excelData: any;
    let arrExcel = [];
    excelData = JSON.parse(JSON.stringify(this.dataSource));
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        'Request No': excelData[i].uc0001,
        'Life Cycle Code': excelData[i].ff0001,
        'Unit Code': excelData[i].ff0003,
        Department: excelData[i].ff0004,
        'Module Code': excelData[i].ff0005,
        'request Version': this.onRequestVersion(excelData[i]),
        Status: excelData[i].status,
        'Created By': excelData[i].createdby,
        'Created Date ': excelData[i].createdon,
      });
    }
    exportData(arrExcel, 'role', 'psi', 'excel');
  }

  public downloadTxt(): void {
    let excelData: any;
    let arrExcel = [];
    excelData = JSON.parse(JSON.stringify(this.dataSource));
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        'Request No': excelData[i].uc0001,
        'Life Cycle Code': excelData[i].ff0001,
        'Unit Code': excelData[i].ff0003,
        Department: excelData[i].ff0004,
        'Module Code': excelData[i].ff0005,
        'request Version': this.onRequestVersion(excelData[i]),
        Status: excelData[i].status,
        'Created By': excelData[i].createdby,
        'Created Date ': excelData[i].createdon,
      });
    }
    exportData(arrExcel, 'role', 'psi', 'txt');
  }

  public downloadCsvFile(): void {
    let excelData: any;
    let arrExcel = [];
    excelData = JSON.parse(JSON.stringify(this.dataSource));
    for (var i = 0, len = excelData.length; i < len; i++) {
      arrExcel.push({
        'Request No': excelData[i].uc0001,
        'Life Cycle Code': excelData[i].ff0001,
        'Unit Code': excelData[i].ff0003,
        Department: excelData[i].ff0004,
        'Module Code': excelData[i].ff0005,
        'request Version': this.onRequestVersion(excelData[i]),
        Status: excelData[i].status,
        'Created By': excelData[i].createdby,
        'Created Date ': excelData[i].createdon,
      });
    }
    exportData(arrExcel, 'role', 'psi', 'csv');
  }

  ngOnDestroy(): void {
    if (this.headerDataSubscription) {
      this.headerDataSubscription.unsubscribe();
    }
    if (this.getReviewDataAPICall) {
      this.getReviewDataAPICall.unsubscribe();
    }
  }
}
