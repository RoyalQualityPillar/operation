import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';

@Component({
  selector: 'app-goods-receipt-list',
  standalone: false,
  templateUrl: './goods-receipt-list.component.html',
  styleUrl: './goods-receipt-list.component.scss'
})
export class GoodsReceiptListComponent implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public tableData: MatTableDataSource<any> = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  public isLoading = false;
  private pageIndex = 0;
  private newList: any;
  private size: any;
  private copiedData: any;
public tableDataLoaded = false;
  private lifeCycleInfoDataLength: any;
  private dataSource: any;
  public goodsReceiptlist:any;
  public addedGoodsListdisplayedColumns:string[] = [
'action',
'poNumber',
'materialCode',
'materialName',
'materialNo',
'poQuantity',
'uom',
'vendorCode',
  ];
  constructor(
    public lifeCycleDataService: LifeCycleDataService,
    private toolbarService: ToolbarService,
 @Inject(MAT_DIALOG_DATA) public data,
 private dialogRef: MatDialogRef<GoodsReceiptListComponent>
  ){
    
  }
  ngOnInit(): void {
    this.goodsReceiptlist = this.data.tableData;
     this.tableData = new MatTableDataSource(this.goodsReceiptlist);
          this.tableData.paginator = this.paginator;
          this.tableData.sort = this.sort;
  }
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const nomRows = this.tableData.data.length;
    return numSelected === nomRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.tableData.data.forEach((row) => this.selection.select(row));
  }
   public pageChanged(event): void {
    if (this.dataSource?.length == GlobalConstants.size && Array.isArray(this.dataSource)) {
      if (
        event.length - (event.pageIndex + 1) * event.pageSize == 0 ||
        event.length < event.pageSize
      ) {
        this.onPaginationCall();
      }
    }
  }
  private onPaginationCall(): void {
    this.pageIndex = this.pageIndex + 1;
    this.size = GlobalConstants.size;
    this.isLoading = true;
    this.lifeCycleDataService
      .getLifeCycleInfo(this.pageIndex, this.size)
      .subscribe((data: any) => {
        this.newList = data.data.content;
        this.dataSource.push(...this.newList);
        this.lifeCycleInfoDataLength = this.dataSource.length;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded = true;
        this.toolbarService.setTableData(this.dataSource);
        this.isLoading = false;
      });
    this.isLoading = false;
  }
  public onSubmit(value:any){
    value = this.selection.selected;
    this.dialogRef.close(value)
  }
}
