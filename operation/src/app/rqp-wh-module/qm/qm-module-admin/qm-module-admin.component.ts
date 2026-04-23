import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qm-module-admin',
  standalone: false,
  templateUrl: './qm-module-admin.component.html',
  styleUrl: './qm-module-admin.component.scss'
})
export class QmModuleAdminComponent {
 constructor(private router: Router) { }
  quarantineListData(): void {
    this.router.navigate(['./rqpoperationui/wh/quarantine-list']);
  }
}
