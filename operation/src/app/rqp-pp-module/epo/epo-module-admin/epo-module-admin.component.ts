import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-epo-module-admin',
  standalone: false,
  templateUrl: './epo-module-admin.component.html',
  styleUrl: './epo-module-admin.component.scss'
})
export class EpoModuleAdminComponent {
   constructor(private router: Router) { }
  executionProductOrderList(): void {
    this.router.navigate(['./rqpoperationui/pp/execution-product-order-list']);
  } 
}