// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoadShareDataService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareHostDataService {
  private _selectedRowInterfaceData: any;
  private _currentStage: any;
  private _selectedStage: any;
  private _currentSelectedMenu: any;

  constructor() {
    console.log('[Remote] ShareHostDataService instantiated');
/********************************************************************************************** */
    // Listen for data being sent from the host
    fromEvent<CustomEvent>(window, 'selectedRowInterfaceDataChange').subscribe((event) => {
      const data = event.detail;
      console.log('[Remote] Received selectedRowInterfaceDataChange:', data);
      this._selectedRowInterfaceData = data;
    });

    fromEvent<CustomEvent>(window, 'currentStageChange').subscribe((event) => {
      const data = event.detail;
      console.log('[Remote] Received currentStageChange:', data);
      this._currentStage = data;
    });
    fromEvent<CustomEvent>(window, 'selectedStageChange').subscribe((event) => {
      const data = event.detail;
      console.log('[Remote] Received selectedStage:', data);
      this._selectedStage = data;
    });
    fromEvent<CustomEvent>(window, 'currentSelectedMenuChange').subscribe((event) => {
      const data = event.detail;
      console.log('[Remote] Received currentSelectedMenuChange:', data);
      this._currentSelectedMenu = data;
    });
/**************************************************************************************************** */
    // Ask host for the current data when remote starts
    window.dispatchEvent(new CustomEvent('onRELoad'));
  }
/*************************************************************************************************** */
  // Getter for use in remote
  get selectedRowInterfaceData(): any {
    console.log('[Remote] Getting selectedRowInterfaceData:', this._selectedRowInterfaceData);
    return this._selectedRowInterfaceData;
  }
  get currentStage(): any {
    console.log('[Remote] Getting currentStage:', this._currentStage);
    return this._currentStage;
  }
  get selectedStage(): any {
    console.log('[Remote] Getting selectedStage:', this._selectedStage);
    return this._selectedStage;
  }
  get currentSelectedMenu(): any {
    console.log('[Remote] Getting currentSelectedMenu:', this._currentSelectedMenu);
    return this._currentSelectedMenu;
  }
}

