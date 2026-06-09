import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pmr-module-admin',
  standalone: false,
  templateUrl: './pmr-module-admin.component.html',
  styleUrl: './pmr-module-admin.component.scss'
})
export class PmrModuleAdminComponent {
constructor(private router: Router) { }
  PMRCompletedRecordslist(): void {
    this.router.navigate(['./rqpoperationui/lbms/pmr-completed']);
  }
}
