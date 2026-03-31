import { Component } from '@angular/core';

@Component({
  selector: 'app-epo-update',
  standalone: false,
  templateUrl: './epo-update.component.html',
  styleUrl: './epo-update.component.scss'
})
export class EpoUpdateComponent {

    public updateSaveUrl:string='/rqpoperationui/pp/epo-update-save-submit';

}
