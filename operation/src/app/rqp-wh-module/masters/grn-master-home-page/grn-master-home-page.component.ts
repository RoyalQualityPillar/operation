import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-grn-master-home-page',
  standalone: false,
  templateUrl: './grn-master-home-page.component.html',
  styleUrl: './grn-master-home-page.component.scss'
})
export class GrnMasterHomePageComponent {

  constructor(private router: Router, private cookieService: CookieService) { }


  onInspectionType() {
    this.router.navigate(['./rqpoperationui/wh/inspection-type-home-page']);
  }
  onStorage() {
    this.router.navigate(['./rqpoperationui/wh/storage-location-home-page']);
  }
  onQuantity() {
    this.router.navigate(['./rqpoperationui/wh/quantity-home-page']);
  }
  onQuantityLed() {
    this.router.navigate(['./rqpoperationui/wh/quantity-ledg-home-page']);
  }
  onGRNCompletedRecords() {
    this.router.navigate(['./rqpoperationui/wh/grn-completed']);
  }
}
