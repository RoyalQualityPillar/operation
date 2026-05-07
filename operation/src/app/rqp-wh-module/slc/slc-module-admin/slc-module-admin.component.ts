import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slc-module-admin',
  standalone: false,
  templateUrl: './slc-module-admin.component.html',
  styleUrl: './slc-module-admin.component.scss'
})
export class SlcModuleAdminComponent {
 constructor(private router: Router) { }
  approvedMaterialList(): void {
    this.router.navigate(['./rqpoperationui/wh/approved-material-list']);
  }
  public onallStagesRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allstagesrecord']);
  }
    public onallPendingRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allpendingrecords']);
  }
}
