import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-epo-home',
  standalone: false,
  templateUrl: './epo-home.component.html',
  styleUrl: './epo-home.component.scss'
})
export class EpoHomeComponent {

   constructor(private router: Router) {}
  onAllPaAssignmentDashBord() {
    this.router.navigate(['./rqpadminui/sd/do-pa-dash-bord']);
  }
  public allDeliveryOrder() {
    this.router.navigate(['./rqpadminui/sd/do-completed']);
  }
  public LwAssignmentDashBord() {
    this.router.navigate(['./rqpadminui/sd/do-lw-dash-bord']);
  }
  public completedRecords() {
    this.router.navigate(['./rqpadminui/sd/dq-completed-records-dashboard']);
  }
  public allInProcessdeliveryorderQuotations() {
    this.router.navigate(['./rqpadminui/sd/dq-in-process-quo']);
  }
   public SDODashboard() {
    this.router.navigate(['./rqpadminui/sd/sdo-dashboard']);
  }
}


