import { Component } from '@angular/core';

@Component({
  selector: 'app-pmc-completed',
  standalone: false,
  templateUrl: './pmc-completed.component.html',
  styleUrl: './pmc-completed.component.scss'
})
export class PmcCompletedComponent {
 public reviewerUrl: string = './rqpoperationui/lbms/pmc-completed-save';
  public isCompleted: string = 'completed';
}
