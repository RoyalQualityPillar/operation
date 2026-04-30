import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ma-module-admin',
  standalone: false,
  templateUrl: './ma-module-admin.component.html',
  styleUrl: './ma-module-admin.component.scss'
})
export class MaModuleAdminComponent {

constructor(private router: Router, private cookieService: CookieService) { }


  onProductMaster() {
    this.router.navigate(['./rqpoperationui/pp/product-home-page']);
  }
   public onallStagesRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allstagesrecord']);
  }
   onColumnPerformanceTestRegestration() {
    this.router.navigate(['./rqpoperationui/pp/home-page-column-perfm-test-reg']);
  }
}
