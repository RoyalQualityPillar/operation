import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bom-module-admin',
  standalone: false,
  templateUrl: './bom-module-admin.component.html',
  styleUrl: './bom-module-admin.component.scss'
})
export class BomModuleAdminComponent {
   constructor(private router: Router) { }
  bomCompletedRecords(): void {
    this.router.navigate(['./rqpoperationui/pp/bom-completed']);
  }
}
