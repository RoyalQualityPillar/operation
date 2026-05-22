import { Component, OnInit } from '@angular/core';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sub-module-list',
  templateUrl: './sub-module-list.component.html',
  styleUrls: ['./sub-module-list.component.scss'],
  standalone: false,
})
export class SubModuleListComponent implements OnInit {
  public subtileData: any;
  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((data: any) => {
      this.onLoadData(data);
    });
  }

  public onLoadData(tile: any): void {
    const params = {
      userId: this.cookieService.get('userId'),
      moduleCode: tile.idName,
      unitCode: this.cookieService.get('buCode'),
    };
    const HttpMethod = 'GET';

    this.apiService
      .sendRequest(apiEndPoints.subModuleListApi, HttpMethod, params)
      .subscribe((response: any) => {
        this.subtileData = response.data.infoList;
      });
  }

  public onClickTile(tile: any): void {
    this.route.navigate(['./data-table'], { queryParams: tile });
  }
}
