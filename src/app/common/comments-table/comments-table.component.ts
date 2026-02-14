import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, of, Subject, switchMap, takeUntil } from 'rxjs';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';

@Component({
    selector: 'app-comments-table',
    templateUrl: './comments-table.component.html',
    styleUrls: ['./comments-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CommentsTableComponent implements OnChanges, OnDestroy {
  @Input() headerData: any;
  @Input() ff0005Value: number;
  @Input() commentType: any;
  public requestVersion: any;
  reviewCommentsData: any;
  public dataSource: any;
  private destroy$ = new Subject();
  public resviewCommentsDisplayColumn: string[] = [
    'createdby',
    'ff0003',
    'ff0005',
    'createdon',
    'comments',
  ];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes?.['headerData'] && this.headerData) ||
      (changes?.['ff0005Value'] && this.ff0005Value)
    ) {
      this.onReviewData();
    }
  }
  onModuleRequest() {
    let HttpMethod = 'GET';
    let params: any;
    console.log(this.headerData);
    if (this.headerData) {
      let ff0001 = this.headerData.lcnum;
      let uc0001 = this.headerData.requestNo;
      params = { ff0001, uc0001 };
      this.apiService
        .sendRequest(apiEndPoints.getModuleRequestNo, HttpMethod, params)
        .subscribe((data: any) => {
          console.log(data);
          this.requestVersion = data.data[0];
          console.log(this.requestVersion.ff0007);
          this.ff0005Value = this.requestVersion.ff0007;
        });
    }
  }
  onReviewData(): void {
    let HttpMethod = 'GET';
    let params: any;
    if (this.headerData) {
      let FF0001 = this.headerData.requestNo;
      let FF0002 = this.headerData.lcnum;
      let FF0005 = this.ff0005Value;
      let apiURL: any;

      if (this.commentType == 'completedRecord') {
        params = { FF0001, FF0002 };
        apiURL = apiEndPoints.completedCommentsUrl;
      } else {
        params = { FF0001, FF0002, FF0005 };
        apiURL = apiEndPoints.commoncommentsUrl;
      }
      this.apiService
        .sendRequest(apiURL, HttpMethod, params)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.reviewCommentsData = data.data;
          this.dataSource = new MatTableDataSource(this.reviewCommentsData);
        });
    }
  }
  public onRequestVersion(row) {
    return row.ff0005 + '.' + row.ff0006 + '.' + row.ff0007 + '.' + row.ff0008;
  }

  public trackBy = (_index: number, item: any) => {
    return item.Id;
  };

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
