import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iwr-module-admin',
  standalone: false,
  templateUrl: './iwr-module-admin.component.html',
  styleUrl: './iwr-module-admin.component.scss'
})
export class IwrModuleAdminComponent {
constructor(private router: Router) { }
  IWRCompletedRecordslist(): void {
    this.router.navigate(['./rqpoperationui/lbms/iwr-completed']);
  }
}
