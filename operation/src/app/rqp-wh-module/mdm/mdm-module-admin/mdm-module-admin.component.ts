import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mdm-module-admin',
  standalone: false,
  templateUrl: './mdm-module-admin.component.html',
  styleUrl: './mdm-module-admin.component.scss'
})
export class MdmModuleAdminComponent {
 constructor(private router: Router) { }
  getMaterialDispensing(): void {
    this.router.navigate(['./rqpoperationui/wh/material-dispensing']);
  }
  public onallStagesRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allstagesrecord']);
  }
    public onallPendingRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allpendingrecords']);
  }
}
