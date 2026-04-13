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


  onAreaMaster() {
    this.router.navigate(['./rqpoperationui/lbms/area-home-page']);
  }
  onCleanRoomGrade() {
    this.router.navigate(['./rqpoperationui/lbms/clean-room-grade-home-page']);
  }

     onAreaGroupMaster() {
    this.router.navigate(['./rqpoperationui/lbms/area-group-master-home-page']);
  }
}