import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-title',
  templateUrl: './common-title.component.html',
  styleUrls: ['./common-title.component.scss'],
  standalone: false,
})
export class CommonTitleComponent {
  @Input() title: string;
}
