import { Component } from '@angular/core';

@Component({
  selector: 'app-grn-reviewer-home',
  standalone: false,
  templateUrl: './grn-reviewer-home.component.html',
  styleUrl: './grn-reviewer-home.component.scss'
})
export class GrnReviewerHomeComponent {
public reviewerUrl: string = './rqpoperationui/wh/grn-reviewer';
}
