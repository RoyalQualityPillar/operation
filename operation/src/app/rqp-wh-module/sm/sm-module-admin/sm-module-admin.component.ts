import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sm-module-admin',
  standalone: false,
  templateUrl: './sm-module-admin.component.html',
  styleUrl: './sm-module-admin.component.scss'
})
export class SmModuleAdminComponent {
   constructor(private router: Router) { }
  UnderSamplinglist(): void {
    this.router.navigate(['./rqpoperationui/wh/under-sampling-list-home-page']);
  }
}
