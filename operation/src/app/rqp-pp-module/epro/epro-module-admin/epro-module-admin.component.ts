import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-epro-module-admin',
  standalone: false,
  templateUrl: './epro-module-admin.component.html',
  styleUrl: './epro-module-admin.component.scss'
})
export class EproModuleAdminComponent {
constructor(private router: Router) { }
  ExecutionProcessOrder(): void {
    this.router.navigate(['./rqpoperationui/pp/execution-process-order']);
  }
  public onallStagesRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allstagesrecord']);
  }
    public onallPendingRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allpendingrecords']);
  }
}
