import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mrp-module-admin',
  standalone: false,
  templateUrl: './mrp-module-admin.component.html',
  styleUrl: './mrp-module-admin.component.scss'
})
export class MrpModuleAdminComponent {
 constructor(private router: Router) { }
  MaterialRequirementPlanning(): void {
    this.router.navigate(['./rqpoperationui/pp/material-requ-planning']);
  }
}
