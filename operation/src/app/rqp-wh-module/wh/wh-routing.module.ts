import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrnInitiatorComponent } from '../grn/grn-initiator/grn-initiator.component';
import { GrnUpdateHomeComponent } from '../grn/grn-update-home/grn-update-home.component';
import { GrnUpdateComponent } from '../grn/grn-update/grn-update.component';
import { GrnReviewerComponent } from '../grn/grn-reviewer/grn-reviewer.component';
import { GrnReviewerHomeComponent } from '../grn/grn-reviewer-home/grn-reviewer-home.component';
import { GrnMasterHomePageComponent } from '../masters/grn-master-home-page/grn-master-home-page.component';
import { InspectionTypeHomePageComponent } from '../masters/inspection-type-master/inspection-type-home-page/inspection-type-home-page.component';
import { StorageLocationHomePageComponent } from '../masters/storage-location-master/storage-location-home-page/storage-location-home-page.component';
import { QuantityHomePageComponent } from '../masters/quantity-master/quantity-home-page/quantity-home-page.component';
import { QuantityLedgHomePageComponent } from '../masters/quantity-ledger/quantity-ledg-home-page/quantity-ledg-home-page.component';
import { GoodsReceiptListComponent } from '../grn/goods-receipt-list/goods-receipt-list.component';
import { GrnCompletedSaveComponent } from '../grn/grn-completed-save/grn-completed-save.component';
import { GrnCompletedComponent } from '../grn/grn-completed/grn-completed.component';
import { SmModuleAdminComponent } from '../sm/sm-module-admin/sm-module-admin.component';
import { UnderSamplingListHomePageComponent } from '../sm/sm-module-admin/under-sampling-list-home-page/under-sampling-list-home-page.component';
import { UnderTestingListComponent } from '../sm/under-testing-list/under-testing-list.component';
import { QsmModuleAdminComponent } from '../qsm/qsm-module-admin/qsm-module-admin.component';
import { QualityStatusListComponent } from '../qsm/quality-status-list/quality-status-list.component';
import { QuarantineListComponent } from '../qm/quarantine-list/quarantine-list.component';
import { QmModuleAdminComponent } from '../qm/qm-module-admin/qm-module-admin.component';
import { QuarantinePackDisplayComponent } from '../qm/quarantine-list/quarantine-pack-display/quarantine-pack-display.component';
import { MdmModuleAdminComponent } from '../mdm/mdm-module-admin/mdm-module-admin.component';
import { MaterialDispensingComponent } from '../mdm/material-dispensing/material-dispensing.component';
import { MaterialReservedListComponent } from '../mdm/material-reserved-list/material-reserved-list.component';
import { MaterialReservedPackListComponent } from '../mdm/material-reserved-pack-list/material-reserved-pack-list.component';
import { SlcModuleAdminComponent } from '../slc/slc-module-admin/slc-module-admin.component';
import { ApprovedMaterialListComponent } from '../slc/approved-material-list/approved-material-list.component';
import { LocationUpdateComponent } from '../slc/location-update/location-update.component';

const routes: Routes = [
  { path: 'grn-initiator', component: GrnInitiatorComponent },
  { path: 'grn-update-home', component: GrnUpdateHomeComponent },
  { path: 'grn-update', component: GrnUpdateComponent },
  { path: 'grn-reviewer', component: GrnReviewerComponent },
  { path: 'grn-reviewer-home', component: GrnReviewerHomeComponent },
  { path: 'grn-completed', component: GrnCompletedComponent },
  { path: 'grn-completed-save', component: GrnCompletedSaveComponent },
  { path: 'goods-receipt-list', component: GoodsReceiptListComponent },
  { path: 'inspection-type-home-page', component: InspectionTypeHomePageComponent },
  { path: 'grn-master-home-page', component: GrnMasterHomePageComponent },
  { path: 'storage-location-home-page', component: StorageLocationHomePageComponent },
  { path: 'quantity-home-page', component: QuantityHomePageComponent },
  { path: 'quantity-ledg-home-page', component: QuantityLedgHomePageComponent },
  { path: 'sm-module-admin', component: SmModuleAdminComponent },
  { path: 'under-sampling-list-home-page', component: UnderSamplingListHomePageComponent },
  { path: 'under-testing-list', component: UnderTestingListComponent },
  { path: 'qsm-module-admin', component: QsmModuleAdminComponent },
  { path: 'quality-status-list', component: QualityStatusListComponent },
  { path: 'quarantine-list', component: QuarantineListComponent },
  { path: 'qm-module-admin', component: QmModuleAdminComponent },
  { path: 'quarantine-display-list', component: QuarantinePackDisplayComponent },
  { path: 'mdm-module-admin', component: MdmModuleAdminComponent },
  { path: 'material-dispensing', component: MaterialDispensingComponent },
  { path: 'material-reserved-list', component: MaterialReservedListComponent },
  { path: 'material-reserved-pack-list', component: MaterialReservedPackListComponent },
  { path: 'slc-module-admin', component: SlcModuleAdminComponent },
  { path: 'approved-material-list', component: ApprovedMaterialListComponent },
  { path: 'location-update', component: LocationUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhRoutingModule { }
