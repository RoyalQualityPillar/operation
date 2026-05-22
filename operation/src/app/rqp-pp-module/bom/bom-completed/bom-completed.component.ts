import { Component } from '@angular/core';

@Component({
  selector: 'app-bom-completed',
  standalone: false,
  templateUrl: './bom-completed.component.html',
  styleUrl: './bom-completed.component.scss'
})
export class BomCompletedComponent {
  public reviewerUrl: string = './rqpoperationui/pp/bom-completed-save';
  public isCompleted: string = 'completed';
}
