import {
  createEnvironmentInjector,
  importProvidersFrom,
  Injectable,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from  '../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RemoteComponentLoaderService {
  private componentMap: Record<string, string> = {
    ChartDashboardComponent: 'ChartDashboardComponent',
    BackgroundColorPipe: 'BackgroundColorPipe',
    TrainingPendingListComponent: 'TrainingPendingListComponent',
    CommonHeaderComponent: 'CommonHeaderComponent',
    CommentsTableComponent: 'CommentsTableComponent',
    CommonActiveAuditTrailComponent: 'CommonActiveAuditTrailComponent',
    CommonAllAuditTrailComponent: 'CommonAllAuditTrailComponent',
    CommonButtonBarComponent: 'CommonButtonBarComponent',
    CommonCommentsComponent: 'CommonCommentsComponent',
    CommonESignatureComponent: 'CommonESignatureComponent',
    CommonFileUploadComponent: 'CommonFileUploadComponent',
    CommonTableFilterComponent: 'CommonTableFilterComponent',
    CommonTitleComponent: 'CommonTitleComponent',
    CustomSnackBarComponent: 'CustomSnackBarComponent',
    LcWeekDataComponent: 'LcWeekDataComponent',
    LccpComponent: 'LccpComponent',
    LovDialogComponent: 'LovDialogComponent',
  };

  async loadComponentByKey(componentKey: string): Promise<any> {
    console.log('Loading component:', componentKey);

    const remoteModule = await loadRemoteModule({
      type: 'module',
     // remoteEntry: 'http://localhost:4200/remoteEntry.js',
        remoteEntry :environment.remoteEntryUrl,
     //remoteEntry: 'http://117.220.199.65:4211/remoteEntry.js',
      // remoteEntry: 'http://localhost:4210/remoteEntry.js',
      //remoteEntry: 'http://117.220.199.65:4210/remoteEntry.js',
     //remoteEntry: environment.remoteEntryUrl,
      exposedModule: './SharedModule',
    });

    const component = remoteModule[componentKey]; // Dynamically access component

    if (!component?.ɵcmp) {
      console.error(
        `Component "${componentKey}" not found. Available keys:`,
        Object.keys(remoteModule)
      );
      throw new Error(`${componentKey} is not a valid Angular component.`);
    }

    return component;
  }
}
