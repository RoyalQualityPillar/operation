import { Component } from '@angular/core';

@Component({
  selector: 'app-pmr-reviewer',
  standalone: false,
  templateUrl: './pmr-reviewer.component.html',
  styleUrl: './pmr-reviewer.component.scss'
})
export class PmrReviewerComponent {
public updateSaveUrl = '/rqpoperationui/lbms/pmr-reviewer-save';

}
