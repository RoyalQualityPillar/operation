import { Component } from '@angular/core';

@Component({
  selector: 'app-pmr-completed',
  standalone: false,
  templateUrl: './pmr-completed.component.html',
  styleUrl: './pmr-completed.component.scss'
})
export class PmrCompletedComponent {
 public reviewerUrl: string = './rqpoperationui/lbms/pmr-completed-save';
  public isCompleted: string = 'completed';
}
