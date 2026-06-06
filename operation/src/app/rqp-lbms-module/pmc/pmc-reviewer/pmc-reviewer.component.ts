import { Component } from '@angular/core';

@Component({
  selector: 'app-pmc-reviewer',
  standalone: false,
  templateUrl: './pmc-reviewer.component.html',
  styleUrl: './pmc-reviewer.component.scss'
})
export class PmcReviewerComponent {
public updateSaveUrl = '/rqpoperationui/lbms/pmc-reviewer-save';
}
