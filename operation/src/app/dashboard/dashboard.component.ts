import { Component } from '@angular/core';

import { loadRemoteModule } from '@angular-architects/module-federation';
import { MatDialog } from '@angular/material/dialog';
import { RemoteComponentLoaderService } from '../service/remote-component-loader.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(
    public dialog: MatDialog,
    private remoteLoader: RemoteComponentLoaderService
  ) {}


async onSubmitConfirmation() {
  // const remoteModule = await loadRemoteModule({
  //   type: 'module',
  //   remoteEntry: 'http://localhost:4200/remoteEntry.js',
  //   exposedModule: './CommonESignatureComponent',
  // });

  // const component = remoteModule.CommonESignatureComponent;

  // const dialogRef = this.dialog.open(component, {
  //   height: '300px',
  //   width: '600px',
  //   data: {},
  //   disableClose: true,
  // });

  // dialogRef.afterClosed().subscribe((result:any) => {
  //   if (result) {
  //     // Handle the result as needed
  //   }
  // });
    const component = await this.remoteLoader.loadComponentByKey('CommonESignatureComponent');

    this.dialog.open(component, {
      width: '600px',
      height: '300px'
    });
  
}

}
