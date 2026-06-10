import { Component } from '@angular/core';

@Component({
  selector: 'app-iwr-update',
  standalone: false,
  templateUrl: './iwr-update.component.html',
  styleUrl: './iwr-update.component.scss'
})
export class IwrUpdateComponent {
 public updateSaveUrl = './rqpoperationui/lbms/iwr-update-save';
}
