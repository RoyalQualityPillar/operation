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
  materialUnderApproverList(): void {
    this.router.navigate(['./rqpoperationui/wh/quality-status-list']);
  }
  sfgUnderApproverList(): void {
    this.router.navigate(['./rqpoperationui/wh/sfg-under-approver-list']);
  }
   fgUnderApproverList(): void {
    this.router.navigate(['./rqpoperationui/wh/fg-under-approver-list']);
  }
   fgRejectList(): void {
    this.router.navigate(['./rqpoperationui/wh/fg-reject-list']);
  }
  sfgRejectList(): void {
    this.router.navigate(['./rqpoperationui/wh/sfg-reject-list']);
  }
 public onallStagesRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allstagesrecord']);
  }
    public onallPendingRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allpendingrecords']);
  }

}