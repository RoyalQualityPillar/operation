import { NgModule } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BkTableModule } from 'bk-angular-table';
//import { MatDialogModule } from '@angular/material/dialog';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LovDialogComponent } from './common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from './common/message-dialog/message-dialog.component';
import { PmsListComponent } from './rqp-dms-module/dms/pms-list/pms-list.component';
import { FgExecutionProcessOrderComponent } from './rqp-pp-module/epro/fg-execution-process-order/fg-execution-process-order.component';
import { SfgExecutionProcessOrderComponent } from './rqp-pp-module/epro/sfg-execution-process-order/sfg-execution-process-order.component';
import { SfgUnderApproverListComponent } from './rqp-wh-module/qsm/sfg-under-approver-list/sfg-under-approver-list.component';
import { FgUnderApproverListComponent } from './rqp-wh-module/qsm/fg-under-approver-list/fg-under-approver-list.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    //CustomSnackBarComponent,
    LovDialogComponent,
    MessageDialogComponent,
    PmsListComponent,
    



  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
    BkTableModule,
    //  SharedModule

    //MatDialogModule,

  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
