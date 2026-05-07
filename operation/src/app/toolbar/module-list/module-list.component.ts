import { AfterViewInit, Component, OnInit } from '@angular/core';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'src/app/service/theme.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
  standalone: false,
})
export class ModuleListComponent implements OnInit, AfterViewInit {
  public tileData: any;
  public subtileData: any;
  public tileTitle: any;
  public logoUrl: any;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private route: Router,
    private router: ActivatedRoute,
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getLogo();
  }
  ngAfterViewInit() {
    this.onLoadData();
    this.toggleTheme();
    window.scrollTo(0, 0);
  }

  public onLoadData(): void {
    const params = { userId: this.cookieService.get('userId') };
    const HttpMethod = 'GET';

    this.apiService
      .sendRequest(apiEndPoints.moduleListApi, HttpMethod, params)
      .subscribe((response: any) => {
        this.tileData = response.data.infoList;
      });
  }

  public onClickTile(tile: any): void {
    this.route.navigate(['./sub-module-list'], { queryParams: tile });
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
    const cssCode = this.cookieService.get('cssCode');

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
}
