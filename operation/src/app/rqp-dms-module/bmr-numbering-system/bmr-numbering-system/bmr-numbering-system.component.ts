import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/service/api-service/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { CommonActiveAuditTrailComponent } from 'src/app/common/common-active-audit-trail/common-active-audit-trail.component';
import { CommonAllAuditTrailComponent } from 'src/app/common/common-all-audit-trail/common-all-audit-trail.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DmproductService } from '../../dmproduct-master/dmproduct.service';
import { DmsService } from '../../dms.service';
import { DmproductCreateUpdateComponent } from '../../dmproduct-master/dmproduct-create-update/dmproduct-create-update.component';
import { DmsAddNewRecordComponent } from '../../dms-add-new-record/dms-add-new-record.component';

@Component({
  selector: 'app-bmr-numbering-system',
  templateUrl: './bmr-numbering-system.component.html',
  styleUrl: './bmr-numbering-system.component.scss',
  standalone: false,
})
export class BmrNumberingSystemComponent implements OnInit, AfterViewInit {
  @ViewChild('tableWrapper', { static: true }) tableWrapper: ElementRef;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public psmList: any[] = [];
  isLoading = false;
  filterObject: any;
  activeUserFilterObject: any;
  tableData: MatTableDataSource<any>;
  size: any;
  dataSource: any;
  pageIndex: any;
  tableDataLoaded = false;
  currentApiResLength: any;
  allRoleDataLength: any;
  copiedData: any;
  selectedTab = 0;
  filterFieldError = false;
  filterValueError = false;
  activeUsertableData: MatTableDataSource<any>;
  isFilterExpanded = false;
  allDmproductTableDataUrl: any;
  activeDmproductTableDataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public toolbarService: ToolbarService,
    public lifeCycleDataService: LifeCycleDataService,
    public cookieService: CookieService,
    public dialog: MatDialog,
    private apiService: ApiService,
    public dmproductService: DmproductService,
    private dmsService: DmsService
  ) { }

  ngOnInit(): void {
    this.allDmproductTableDataUrl = apiEndPoints.allDmproductTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.dmproductUserProfileFilterData;
    this.activeDmproductTableDataUrl = apiEndPoints.activeDmproductTabledata;
    this.params = { pageIndex, size, unitCode };

    this.dmsService.bmrInput(unitCode).subscribe(({ data }) => {
      console.log(data);
      this.psmList = data.pmsList;
    });
  }

  ngAfterViewInit() { }

  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  tabChanged(tabChangeEvent: any) { }
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(DmsAddNewRecordComponent, {
      minWidth: '80%',
      height: '500px',
      data: {
        tableData: this.selectedRow,
        type: 'Registration',
        psmList: this.psmList,
      },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  selectedRow: any;
  setSelectedID(row: any) {
    this.selectedRow = row;
  }
  selectedAllRow: any;
  setSelectedAllID(row: any) {
    this.selectedAllRow = row;
  }
  onActiveSelectRow() {
    if (this.selectedRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
    } else {
      const dialogRef = this.dialog.open(DmproductCreateUpdateComponent, {
        minWidth: '80%',
        data: { tableData: this.selectedRow, type: 'Modification' },
      });
      dialogRef.afterClosed().subscribe((result) => { });
    }
  }
  onChangeStatus(data: any) {
    return changeStatusByCode(data);
  }
  onActiveSelectAuditTrailRow() {
    let tableData = [
      { labelName: 'Version', value: this.selectedRow.version },
      {
        labelName: 'Status',
        value: this.onChangeStatus(this.selectedRow.status),
      },
      { labelName: 'Product No', value: this.selectedRow.uc0001 },
      { labelName: 'Product Name', value: this.selectedRow.ff0001 },
      { labelName: 'Product Code', value: this.selectedRow.ff0002 },
      { labelName: 'Market', value: this.selectedRow.ff0003 },
      { labelName: 'Shelf Life', value: this.selectedRow.ff0004 },
      { labelName: 'Shelf Life in Months', value: this.selectedRow.ff0005 },
      { labelName: 'Batch Size', value: this.selectedRow.ff0006 },
      { labelName: 'UOM', value: this.selectedRow.ff0007 },
      { labelName: 'Product Type', value: this.selectedRow.ff0008 },
      { labelName: 'Dosage Form', value: this.selectedRow.ff0009 },
      { labelName: 'Input Code', value: this.selectedRow.ff0010 },
      { labelName: 'Category', value: this.selectedRow.uc0002 },
      { labelName: 'Createdon', value: this.selectedRow.createdon },
      { labelName: 'Createdby', value: this.selectedRow.createdby },
      { labelName: 'Comments', value: this.selectedRow.comments },
    ];
    if (this.selectedRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
    } else {
      const dialogRef = this.dialog.open(CommonActiveAuditTrailComponent, {
        minWidth: '80%',
        data: { tableData: tableData, pageTitle: 'Dmproduct' },
      });
      dialogRef.afterClosed().subscribe((result) => { });
    }
  }
  UC0001: any;
  UC0002: any;
  onSearchAllAuditTrail() {
    this.selectedAllRow = this.selectedRow;
    console.log(this.selectedAllRow);
    if (this.selectedAllRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
    } else {
      this.isLoading = true;

      let UC0001 = this.selectedAllRow.uc0001;
      const params = { UC0001 };
      this.apiService
        .sendRequest(apiEndPoints.dmproductAllAuditTrail, 'GET', params)
        .subscribe((data: any) => {
          let newFormatData = this.structureResponse(data.data);
          this.isLoading = false;
        });
    }
  }
  formatedData: any;
  structureResponse(apiResponse: any) {
    const rows = apiResponse.map((item) => {
      return {
        fields: [
          { labelName: 'Version', value: item.version },
          {
            labelName: 'Status',
            value: this.onChangeStatus(item.status),
          },
          { labelName: 'Product No', value: this.selectedRow.uc0001 },
          { labelName: 'Product Name', value: this.selectedRow.ff0001 },
          { labelName: 'Product Code', value: this.selectedRow.ff0002 },
          { labelName: 'Market', value: this.selectedRow.ff0003 },
          { labelName: 'Shelf Life', value: this.selectedRow.ff0004 },
          { labelName: 'Shelf Life in Months', value: this.selectedRow.ff0005 },
          { labelName: 'Batch Size', value: this.selectedRow.ff0006 },
          { labelName: 'UOM', value: this.selectedRow.ff0007 },
          { labelName: 'Product Type', value: this.selectedRow.ff0008 },
          { labelName: 'Dosage Form', value: this.selectedRow.ff0009 },
          { labelName: 'Input Code', value: this.selectedRow.ff0010 },

          { labelName: 'Createdon', value: item.createdon },
          { labelName: 'Createdby', value: item.createdby },
          { labelName: 'Comments', value: item.comments },
        ],
      };
    });
    const dialogRef = this.dialog.open(CommonAllAuditTrailComponent, {
      minWidth: '80%',
      data: { tableData: rows, pageTitle: 'Role' },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  columnConfig = {
    action: 'Action',
    ff0001: 'Product Name',
    uc0001: 'Product No',
    ff0002: 'Product Code',
    ff0003: 'Market',
    ff0004: 'Shelf Life',
    ff0005: 'Shelf Life in Months',
    ff0006: 'Batch Size',
    ff0007: 'UOM',
    ff0008: 'Product Type',
    ff0009: 'Dosage Form',
    ff0010: 'Input Type',
    status: 'Status',
    version: 'Version',
    createdon: 'Createdon',
    createdby: 'Createdby',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All Business Unit Type';
  allButtonConfig = [
    { label: ' Audit Trail', action: 'Audit_Trail', color: 'primary' },
    // { label: 'Save', action: 'save', color: 'accent' }
    // Add more button configurations as needed
  ];

  activeButtonConfig = [
    { label: ' Audit Trail', action: 'Audit_Trail', color: 'primary' },
    { label: 'Update', action: 'Update', color: 'accent' },
    // Add more button configurations as needed
  ];
  // selectedRow:any;
  handleButtonAction(event: { action: string; row: any }) {
    const { action, row } = event;
    this.selectedRow = row; // Set the selected row
    console.log(action);
    switch (action) {
      case 'Audit_Trail':
        this.onSearchAllAuditTrail();
        break;
      // case 'save':
      //   this.handleSave(row);
      //   break;
    }
  }
  activeHandleButtonAction(event: { action: string; row: any }) {
    const { action, row } = event;
    this.selectedRow = row; // Set the selected row
    console.log(action);
    switch (action) {
      case 'Audit_Trail':
        this.onActiveSelectAuditTrailRow();
        break;
      case 'Update':
        this.onActiveSelectRow();
        break;
    }
  }

  handleSubmit(row: any) {
    console.log(row);
    console.log('submitBtn');
  }
}
