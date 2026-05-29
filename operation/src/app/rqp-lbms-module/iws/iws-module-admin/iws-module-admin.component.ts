import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iws-module-admin',
  standalone: false,
  templateUrl: './iws-module-admin.component.html',
  styleUrl: './iws-module-admin.component.scss'
})
export class IwsModuleAdminComponent {
 constructor(private router: Router) { }
  IWSCompletedRecordslist(): void {
    this.router.navigate(['./rqpoperationui/lbms/iws-completed']);
  }
}
