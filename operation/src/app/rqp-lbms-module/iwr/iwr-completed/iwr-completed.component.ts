import { Component } from '@angular/core';

@Component({
  selector: 'app-iwr-completed',
  standalone: false,
  templateUrl: './iwr-completed.component.html',
  styleUrl: './iwr-completed.component.scss'
})
export class IwrCompletedComponent {
 public reviewerUrl: string = './rqpoperationui/lbms/iwr-completed-save';
  public isCompleted: string = 'completed';
}
