import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pmc-module-admin',
  standalone: false,
  templateUrl: './pmc-module-admin.component.html',
  styleUrl: './pmc-module-admin.component.scss'
})
export class PmcModuleAdminComponent {
constructor(private router: Router) { }
  PMCCompletedRecordslist(): void {
    this.router.navigate(['./rqpoperationui/lbms/pmc-completed']);
  }
}
