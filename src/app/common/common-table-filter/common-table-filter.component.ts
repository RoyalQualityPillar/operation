import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { exportData } from 'bk-export';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { GlobalConstants } from '../global-constants';
import { CookieService } from 'ngx-cookie-service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import moment from 'moment';

import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../service/api-service/api.service';


@Component({
  selector: 'app-common-table-filter',
  templateUrl: './common-table-filter.component.html',
  styleUrls: ['./common-table-filter.component.scss'],
  standalone: false,
})
export class CommonTableFilterComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  // @Input() tableData: any[] = [];
  @Input() columnConfig: { [key: string]: string } = {}; // Column Configuration
  @Input() filterOptions: string[] = [];
  @Input() tableTitle: string = 'Table Data';
  @Input() apiUrl: string = '';
  @Input() dynamicButtons: { label: string; action: string }[] = [];
  @Output() buttonClick = new EventEmitter<{ action: string; row: any }>();
  @Input() columnClass = '';
  @Input() filterApiUrl = '';
  @Input() HttpMethod = '';
  @Input() downloadFileName = '';
  @Input() params: any = {};
  @Input() getLatestData: boolean;

  isLoading = false;
  isFilterExpanded = false;
  operatorOptions: { key: string, label: string }[] = [
    { key: 'EQUAL', label: 'Equal' },
    // { key: 'NOT_EQUAL', label: 'Not Equal' },
    { key: 'CONTAINS', label: 'Contains' },
    // { key: 'NOT_CONTAINS', label: 'Not Contains' }
  ];
  filterObject = {
    field: 'SELECT',
    //operator: 'EQUAL',
    value: '',
    condition: 'EQUAL',
    DateFieldvalue1: '', // For start date
    DateFieldvalue2: '', // For end date
  };
  displayedColumns: string[] = [];
  filteredColumns: string[] = [];
  pageIndex = 0;
  size: any;
  newList: any;
  dataSource: any;
  currentDataTableLength: any;
  constructor(
    public cookieService: CookieService,
    public apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getLatestData'] && this.getLatestData) {
      this.apiService
        .sendRequest(this.apiUrl, this.HttpMethod, this.params)
        .subscribe((data) => {
          this.dataSource = data.data.content;

          console.log(this.dataSource);
          if (this.dataSource) {
            this.currentDataTableLength = data.data.content.length;
            this.lifeCycleInfoDataLength = this.dataSource.length;
            this.tableData = new MatTableDataSource(this.dataSource);
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
          }  else {
          // ✅ No data case
          this.dataSource = [];
          this.currentDataTableLength = 0;
       // }
          }
          window.scrollTo(0, 0);
          this.isLoading = false;
        });
    }
  }
  ngOnInit() {
    // Initialize columns and filter them
    this.displayedColumns = Object.keys(this.columnConfig);
    this.filteredColumns = this.displayedColumns.filter((c) => c !== 'action');
  }
  ngAfterViewInit() {
    this.onSearch();
  }
  lifeCycleInfoDataLength: any;
  tableData: any;
  onSearch() {
    console.log(this.params);
    let pageIndex = this.pageIndex;
    let size = GlobalConstants.size;
    this.isLoading = true;
    this.apiService
      .sendRequest(this.apiUrl, this.HttpMethod, this.params)
      .subscribe((data) => {
        this.dataSource = data.data.content;
        if (this.dataSource) {
          this.currentDataTableLength = this.dataSource.length;
          this.lifeCycleInfoDataLength = this.dataSource.length;
          this.tableData = new MatTableDataSource(this.dataSource);
          this.tableData.paginator = this.paginator;
          this.tableData.sort = this.sort;
        }
        window.scrollTo(0, 0);
        this.isLoading = false;
      });
  }
  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tableData.filter = filterValue;
  }

  applyFilterByColumn() {
    // Custom filter by column logic
    if (this.filterApiUrl == '' || this.filterApiUrl == undefined) {
      this.filterWithoutApiCall();
    } else {
      this.filterWithApiCall();
    }
  }
  currentAllLCApiResLength: any;
  allLifeCycleInfoDataLength: any;
  copiedData: any;
  tableDataLoaded: boolean = false;
  filterWithApiCall() {
    // Reset any previous error states
    this.filterFieldError = false;
    this.filterValueError = false;

    // Validate the filter object
    if (
      this.filterObject.field === '' ||
      this.filterObject.field === null ||
      this.filterObject.field === undefined ||
      this.filterObject.field === 'SELECT'
    ) {
      this.filterFieldError = true;
      return;
    }

    if (this.filterObject.field !== 'createdon' && this.filterObject.field !== 'createdDate') {
      if (
        this.filterObject.value === '' ||
        this.filterObject.value === null ||
        this.filterObject.value === undefined
      ) {
        this.filterValueError = true;
        return;
      }
    } else {
      if (!this.filterObject.DateFieldvalue1) {
        this.filterValueError = true;
        return;
      }
    }

    // Prepare the request body
    let filetrDataBody = {
      field: this.filterObject.field,
      value1: this.filterObject.value,
      value2: '',
      condition: this.filterObject.condition || 'equals', // Default condition
      unitcode: this.cookieService.get('buCode')
    };

    // If filtering by date, format date values
    if (this.filterObject.field === 'createdon' || this.filterObject.field === 'createdDate') {
      filetrDataBody.value1 = moment(this.filterObject.DateFieldvalue1).format(
        'DD-MM-YYYY HH:mm:ss.SSS'
      );
      filetrDataBody.value2 = moment(this.filterObject.DateFieldvalue2)
        .add(1, 'days')
        .format('DD-MM-YYYY HH:mm:ss.SSS');
      filetrDataBody.condition = 'between'; // For date range, condition is between
    }
    if (this.filterObject.field === 'status') {
      const statusValue = this.changeStatusByDescription(this.filterObject.value)
      filetrDataBody.value1 = statusValue;
    }

    // Start the loading spinner
    this.isLoading = true;

    // let apiMethord:string = 'POST'
    // Make the API call

    this.apiService
      .sendRequest(this.filterApiUrl, this.HttpMethod, '', filetrDataBody)
      .subscribe({
        next: (data) => {
          let responseData: any[] = [];
          responseData = data.data;
          if (responseData) {
            this.dataSource = responseData;
            this.currentDataTableLength = responseData.length;
            console.log(this.currentDataTableLength);
            this.currentAllLCApiResLength = responseData.length;
            this.allLifeCycleInfoDataLength = this.dataSource.length;
            this.copiedData = JSON.stringify(this.dataSource);

            // Update the table with new filtered data
            this.tableData = new MatTableDataSource(this.dataSource);
            // this.tableData.paginator = this.paginator.toArray()[0];
            // this.tableData.sort = this.sort.toArray()[0];
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;

            // Stop loading spinner
            this.isLoading = false;
            this.tableDataLoaded = true;
          } else {
            // If no data, stop loading spinner and show error dialog
            this.isLoading = false;
            this.dialog.open(MessageDialogComponent, {
              width: '400px',
              data: {
                message: data.errorInfo.message,
                heading: 'Error Information',
              },
            });
          }
        },
        error: (err) => {
          // Handle any errors from the API call
          this.isLoading = false;
          console.error('Filter API Call Error:', err);
          this.dialog.open(MessageDialogComponent, {
            width: '400px',
            data: {
              message: 'An error occurred while fetching data.',
              heading: 'Error Information',
            },
          });
        },
        // complete: () => {
        //   this.apiService
        //     .sendRequest(this.apiUrl, this.HttpMethod, this.params)
        //     .subscribe((data) => {
        //       this.dataSource = data.data.content;

        //       console.log(this.dataSource);
        //       if (this.dataSource) {
        //         this.currentDataTableLength = data.data.content.length;
        //         this.lifeCycleInfoDataLength = this.dataSource.length;
        //         this.tableData = new MatTableDataSource(this.dataSource);
        //         this.tableData.paginator = this.paginator;
        //         this.tableData.sort = this.sort;
        //       }
        //       window.scrollTo(0, 0);
        //       this.isLoading = false;
        //     });
        // },
      });
    // this.apiService
    //   .sendRequest(this.filterApiUrl, this.HttpMethod, '', filetrDataBody)
    //   .subscribe(
    //     (data: any) => {
    //       // If data is returned, update the table data
    //     },

    //     (error) => {}
    //   );
  }

  filterWithoutApiCall() {
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

  onClearFilter() {
    this.tableData.filter = '';
    this.filterObject.field = 'SELECT';
    this.filterObject.value = '';
    this.filterFieldError = false;
    this.filterValueError = false;
    // this.filterObject = { field: 'SELECT', value: '' };
    
    this.onSearch();
  }
  get filteredFilterOptions(): string[] {
    return this.filterOptions.filter((option) => option !== 'action');
  }



  downloadPdf() {
    let fileName: any;
    const header: string[] = Object.values(this.columnConfig);
    if (this.downloadFileName) {
      fileName = this.downloadFileName;
    } else {
      fileName = 'RQP';
    }
    const doc = new jsPDF('p', 'mm', 'A4');

    const rows: any[] = this.dataSource.map((item: any) => {
      return Object.keys(this.columnConfig).map((key) => item[key] || '');
    });
    const img = new Image();
    img.src = 'assets/logo1.png';
    doc.setFillColor(255, 128, 0);
    doc.rect(5, 24, 200, 8, 'F');
    doc.setFontSize(14);
    doc.text(`${this.tableTitle} (${this.dataSource.length})`, 66, 30);
    doc.addImage(img, 'PNG', 170, 5, 30, 15);

    autoTable(doc, {
      head: [header],
      body: rows,
      showHead: 'everyPage',
      startY: 35,
      margin: { right: 5, left: 5 },
      tableWidth: 'auto',
      didDrawPage: (dataArg) => {
        doc.text('', dataArg.settings.margin.left, 20);
      },
    });

    doc.save(`${fileName}.pdf`);
  }

  pageChanged(event: any) {
    // console.log(this.dataSource.length)
    // console.log(event.length)//50
    // console.log(event.pageIndex)//4
    // console.log(event.pageSize)//10
    // console.log(this.currentDataTableLength)
    if (this.currentDataTableLength == GlobalConstants.size) {
      if (
        event.length - (event.pageIndex + 1) * event.pageSize == 0 ||
        event.length < event.pageSize
      ) {
        console.log('inside ');
        this.onPaginationCall();
      }
    }
  }

  onPaginationCall() {
    this.isLoading = true;
    this.pageIndex = this.pageIndex + 1;
    const pageIndex = this.pageIndex;

    if (this.params.hasOwnProperty('pageIndex')) {
      console.log('inside pageindex');
      this.params.pageIndex = pageIndex;
    }
    this.apiService
      .sendRequest(this.apiUrl, this.HttpMethod, this.params)
      .subscribe((data: any) => {
        this.currentDataTableLength = data.data.content.length;
        this.dataSource = [...this.dataSource, ...data.data.content];
        //this.dataSource.data = this.tableData;
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.isLoading = false;
      });
  }

  selectedRow: any;
  setSelectedID(row: any) {
    this.selectedRow = row;
  }
  fileName: any;
  download(type: 'txt' | 'excel' | 'csv') {
    if (this.downloadFileName) {
      this.fileName = this.downloadFileName;
    } else {
      this.fileName = 'RQP';
    }
    let excelData: any = this.dataSource;
    let arrExcel = [];
    for (let i = 0; i < excelData.length; i++) {
      let rowObject: any = {};
      for (let key in this.columnConfig) {
        if (this.columnConfig.hasOwnProperty(key)) {
          rowObject[this.columnConfig[key]] = this.formatValue(
            key,
            excelData[i][key]
          );
        }
      }

      arrExcel.push(rowObject);
    }
    if (this.exportFunctions[type]) {
      this.exportFunctions[type](arrExcel);
    } else {
      console.error('Unsupported export type:', type);
    }
  }

  exportFunctions = {
    txt: (data: any[]) => exportData(data, 'lifeCycle', this.fileName, 'txt'),
    excel: (data: any[]) =>
      exportData(data, 'lifeCycle', this.fileName, 'excel'),
    csv: (data: any[]) => exportData(data, 'lifeCycle', this.fileName, 'csv'),
  };

  formatValue(key: string, value: any): any {
    return value !== undefined ? value : null;
  }

  filterFieldError = false;
  filterValueError = false;
  handleButtonClick(action: string) {
    this.buttonClick.emit({ action, row: this.selectedRow });
  }
  changeStatusByCode(statusCode: number | null | undefined): string {
    if (statusCode === null || statusCode === undefined) {
      return '';
    }
    switch (statusCode) {
      case 1000:
        return 'INITIATED';
      case 1001:
        return 'ACTIVE';
      case 1002:
        return 'INACTIVE';
      case 1003:
        return 'DISABLE';
      case 1004:
        return 'LOCKED';
      case 1005:
        return 'UNLOCKED';
      default:
        return '';
    }
  }
  changeStatusByDescription(statusDesc: string | null | undefined): any {
    if (statusDesc == 'ACTIVE') {
      return 1001
    } else if (statusDesc == 'LOCKED') {
      return 1004
    }
    else if (statusDesc == 'INACTIVE') {
      return 1002
    }
    else if (statusDesc == 'INITIATED') {
      return 1000
    } else if (statusDesc == 'UNLOCKED') {
      return 1005
    } else if (statusDesc == 'DISABLE') {
      return 1006
    } else {
      return 0
    }
  }
  // Function to check if the column is a date column
  isDateColumn(column: string | null | undefined): boolean {
    if (!column) {
      return false;
    }
    return (
      column.toLowerCase().includes('date') ||
      column.toLowerCase().includes('createdon') ||
      column.toLowerCase().includes('createdDate')
    );
  }
  convertToDate(dateString: string): Date | null {
    if (!dateString) {
      return null; // Return null if the string is empty or undefined
    }

    // Manually parse the date string
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    // Construct a Date object
    return new Date(year, month - 1, day, hours, minutes, seconds); // month is zero-indexed
  }
}
