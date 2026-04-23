import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhRoutingModule } from './wh-routing.module';
import { GrnInitiatorComponent } from '../grn/grn-initiator/grn-initiator.component';
import { GrnUpdateHomeComponent } from '../grn/grn-update-home/grn-update-home.component';
import { GrnUpdateComponent } from '../grn/grn-update/grn-update.component';
import { GrnReviewerComponent } from '../grn/grn-reviewer/grn-reviewer.component';
import { GrnReviewerHomeComponent } from '../grn/grn-reviewer-home/grn-reviewer-home.component';
import { GoodsReceiptListComponent } from '../grn/goods-receipt-list/goods-receipt-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { SharedModule } from 'src/app/common/shared.module';
import { GrnMasterHomePageComponent } from '../masters/grn-master-home-page/grn-master-home-page.component';
import { InspectionTypeCreateUpdateComponent } from '../masters/inspection-type-master/inspection-type-create-update/inspection-type-create-update.component';
import { InspectionTypeHomePageComponent } from '../masters/inspection-type-master/inspection-type-home-page/inspection-type-home-page.component';
import { StorageLocationCreateUpdateComponent } from '../masters/storage-location-master/storage-location-create-update/storage-location-create-update.component';
import { StorageLocationHomePageComponent } from '../masters/storage-location-master/storage-location-home-page/storage-location-home-page.component';
import { QuantityCreateUpdateComponent } from '../masters/quantity-master/quantity-create-update/quantity-create-update.component';
import { QuantityHomePageComponent } from '../masters/quantity-master/quantity-home-page/quantity-home-page.component';
import { QuantityLedgCreateUpdateComponent } from '../masters/quantity-ledger/quantity-ledg-create-update/quantity-ledg-create-update.component';
import { QuantityLedgHomePageComponent } from '../masters/quantity-ledger/quantity-ledg-home-page/quantity-ledg-home-page.component';
import { GrnCompletedComponent } from '../grn/grn-completed/grn-completed.component';
import { GrnCompletedSaveComponent } from '../grn/grn-completed-save/grn-completed-save.component';
import { SmModuleAdminComponent } from '../sm/sm-module-admin/sm-module-admin.component';
import { UnderSamplingListHomePageComponent } from '../sm/sm-module-admin/under-sampling-list-home-page/under-sampling-list-home-page.component';
import { UnderTestingListComponent } from '../sm/under-testing-list/under-testing-list.component';
import { QsmModuleAdminComponent } from '../qsm/qsm-module-admin/qsm-module-admin.component';
import { QualityStatusListComponent } from '../qsm/quality-status-list/quality-status-list.component';
import { QmModuleAdminComponent } from '../qm/qm-module-admin/qm-module-admin.component';
import { QuarantineListComponent } from '../qm/quarantine-list/quarantine-list.component';


@NgModule({
  declarations: [
    GrnInitiatorComponent,
    GrnUpdateHomeComponent,
    GrnUpdateComponent,
    GrnReviewerComponent,
    GrnReviewerHomeComponent,
    GoodsReceiptListComponent,
    InspectionTypeCreateUpdateComponent,
    InspectionTypeHomePageComponent,
    GrnMasterHomePageComponent,
    StorageLocationCreateUpdateComponent,
    StorageLocationHomePageComponent,
    QuantityCreateUpdateComponent,
    QuantityHomePageComponent,
    QuantityLedgCreateUpdateComponent,
    QuantityLedgHomePageComponent,
    GrnCompletedComponent,
    GrnCompletedSaveComponent,
    SmModuleAdminComponent,
    UnderSamplingListHomePageComponent,
    UnderTestingListComponent,
    QsmModuleAdminComponent,
    QualityStatusListComponent,
       QmModuleAdminComponent,
    QuarantineListComponent,

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    WhRoutingModule
  ]
})
export class WhModule { }
