import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eplo-module-admin',
  standalone: false,
  templateUrl: './eplo-module-admin.component.html',
  styleUrl: './eplo-module-admin.component.scss'
})
export class EploModuleAdminComponent {
 constructor(private router: Router) { }
  planningOrderListData(): void {
    this.router.navigate(['./rqpoperationui/pp/planning-order-list']);
  }
   public onallStagesRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allstagesrecord']);
  }
   public onallPendingRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allpendingrecords']);
  }
}
