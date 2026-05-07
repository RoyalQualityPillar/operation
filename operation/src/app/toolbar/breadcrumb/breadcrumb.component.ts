import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Routes } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbService } from 'src/app/service/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: false,
})
export class BreadcrumbComponent {
  name: string;
  menu: any[] = [];
  breadCrumbList: any[] = [];
  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    this.menu = this.breadcrumbService.getMenu();
    this.breadcrumbInitialize(this.menu, router.url);
    this.listenRouting();
  }

  public listenRouting(): void {
    this.router.events.subscribe((router: any) => {
      const navigation = this.router.getCurrentNavigation();
      const breadcrumbStr = navigation?.extras?.state?.['breadcrumbStr'];
      const routerUrl: string = router.urlAfterRedirects;
      this.breadcrumbInitialize(this.menu, routerUrl, breadcrumbStr);
    });
  }

  public breadcrumbInitialize(
    target: any[],
    routerUrl: string,
    breadcrumbStr?: string
  ): void {
    let routerList: Array<string>;

    if (routerUrl && typeof routerUrl === 'string') {
      this.breadCrumbList.length = 0;
      routerList = BreadcrumbComponent.getRouteStrings(
        routerUrl,
        breadcrumbStr
      );
      routerList.forEach((router, index) => {
        const currentTarget = target?.find((page) =>
          page?.path?.slice(1).includes(router)
        ) as any;

        if (currentTarget && currentTarget.name) {
          this.breadCrumbList.push({
            name: currentTarget.name,
            path:
              index === 0
                ? currentTarget.path
                : `${
                    this.breadCrumbList[index - 1].path
                  }/${currentTarget.path.slice(1)}`,
          });

          if (index + 1 !== routerList.length) {
            target = currentTarget.children;
          }
        }
      });
    }
  }

  private static getRouteStrings(url: string, breadcrumbStr: string): string[] {
    if (breadcrumbStr) {
      return breadcrumbStr.slice(1).split('/');
    } else {
      return url.slice(1).split('/');
    }
  }
}
