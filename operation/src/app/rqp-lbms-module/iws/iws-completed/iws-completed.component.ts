import { Component } from '@angular/core';

@Component({
  selector: 'app-iws-completed',
  standalone: false,
  templateUrl: './iws-completed.component.html',
  styleUrl: './iws-completed.component.scss'
})
export class IwsCompletedComponent {
 public reviewerUrl: string = './rqpoperationui/lbms/iws-completed-save';
  public isCompleted: string = 'completed';
}
