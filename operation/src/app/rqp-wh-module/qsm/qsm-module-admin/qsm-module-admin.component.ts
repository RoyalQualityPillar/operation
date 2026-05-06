import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qsm-module-admin',
  standalone: false,
  templateUrl: './qsm-module-admin.component.html',
  styleUrl: './qsm-module-admin.component.scss'
})
export class QsmModuleAdminComponent {
   constructor(private router: Router) { }
  qualityStatusList(): void {
    this.router.navigate(['./rqpoperationui/wh/quality-status-list']);
  }
 public onallStagesRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allstagesrecord']);
  }
    public onallPendingRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allpendingrecords']);
  }

}