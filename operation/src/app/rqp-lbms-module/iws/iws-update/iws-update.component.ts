import { Component } from '@angular/core';

@Component({
  selector: 'app-iws-update',
  standalone: false,
  templateUrl: './iws-update.component.html',
  styleUrl: './iws-update.component.scss'
})
export class IwsUpdateComponent {
public updateSaveUrl = '/rqpoperationui/lbms/iws-update-save';
}
