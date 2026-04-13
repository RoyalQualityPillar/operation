import { Component } from '@angular/core';

@Component({
  selector: 'app-grn-completed',
  standalone: false,
  templateUrl: './grn-completed.component.html',
  styleUrl: './grn-completed.component.scss'
})
export class GrnCompletedComponent {
  public reviewerUrl: string = './rqpoperationui/wh/grn-completed-save';
  public isCompleted: string = 'completed';
}
