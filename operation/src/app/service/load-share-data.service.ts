// import { Injectable } from '@angular/core';
// import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
// import * as _ from 'lodash';

// @Injectable({
//   providedIn: 'root',
// })
// export class ShareHostDataService {

//     _selectedRowInterfaceData:any;
// constructor(){
//   console.log("Remote ShareHostDataService instantiated");
//   fromEvent<CustomEvent>(window, 'selectedRowInterfaceDataChange').subscribe((event) => {
//     console.log('Remote received:', event.detail);
//     this._selectedRowInterfaceData = event.detail;
//   });

//   // Ask host to send data
//   window.dispatchEvent(new CustomEvent('onRELoad'));
//     // fromEvent(window, 'onRELoad').subscribe((event: any) => {
//     //     window.addEventListener('selectedRowInterfaceDataChange', this.selectedRowInterfaceData.bind(this));
//     // });
//     // fromEvent(window, 'selectedRowInterfaceDataChange').subscribe((event: any) => {
//     //   console.log('Host set7:', this._selectedRowInterfaceData);
//     //     if (!_.isEqual(event.detail, this._selectedRowInterfaceData)) {
//     //       this._selectedRowInterfaceData = event.detail;
//     //     }
//     //   });
//     }
//     set selectedRowInterfaceData(data: any) {
//       console.log('Host set4:', data);
//         if (!_.isEqual(this._selectedRowInterfaceData, data)) {
//           this._selectedRowInterfaceData = data;
//           let deliverytoCanvasEditEmitter = new CustomEvent('selectedRowInterfaceDataChange', { detail: data });
//           dispatchEvent(deliverytoCanvasEditEmitter);
//         }
//       }
//   get selectedRowInterfaceData():any {
//     console.log('Host set6:', this._selectedRowInterfaceData);
//     return this._selectedRowInterfaceData
//   }

// }
import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareHostDataService {
  lcNumber: any;
  uc0001(arg0: string, uc0001: any) {
    throw new Error('Method not implemented.');
  }
  private _selectedRowInterfaceData: any;
  private _currentStage: any;
  private _selectedStage: any;
  private _currentSelectedMenu: any;

  constructor() {
    console.log('[Remote] ShareHostDataService instantiated');
    /********************************************************************************************** */
    // Listen for data being sent from the host
    fromEvent<CustomEvent>(window, 'selectedRowInterfaceDataChange').subscribe(
      (event) => {
        const data = event.detail;
        console.log('[Remote] Received selectedRowInterfaceDataChange:', data);
        this._selectedRowInterfaceData = data;
      }
    );

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
    fromEvent<CustomEvent>(window, 'currentSelectedMenuChange').subscribe(
      (event) => {
        const data = event.detail;
        console.log('[Remote] Received currentSelectedMenuChange:', data);
        this._currentSelectedMenu = data;
      }
    );
    /**************************************************************************************************** */
    // Ask host for the current data when remote starts
    window.dispatchEvent(new CustomEvent('onRELoad'));
  }
  /*************************************************************************************************** */
  // Getter for use in remote
  get selectedRowInterfaceData(): any {
    console.log(
      '[Remote] Getting selectedRowInterfaceData:',
      this._selectedRowInterfaceData
    );
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
    console.log(
      '[Remote] Getting currentSelectedMenu:',
      this._currentSelectedMenu
    );
    return this._currentSelectedMenu;
  }
}
