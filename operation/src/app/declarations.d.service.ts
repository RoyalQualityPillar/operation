// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DeclarationsDService {

//   constructor() { }
// }


declare module 'rqp_parentui/ShareHostDataService' {
  import { Observable } from 'rxjs';

  export class ShareHostDataService {
    setSelectedRowData(data: any): void;
    getSelectedRowData(): any;
    getSelectedRowData$(): Observable<any>;
  }
}