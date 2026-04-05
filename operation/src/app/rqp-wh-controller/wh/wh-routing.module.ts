import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrnInitiatorComponent } from '../grn/grn-initiator/grn-initiator.component';
import { GrnUpdateHomeComponent } from '../grn/grn-update-home/grn-update-home.component';
import { GrnUpdateComponent } from '../grn/grn-update/grn-update.component';
import { GrnReviewerComponent } from '../grn/grn-reviewer/grn-reviewer.component';
import { GrnReviewerHomeComponent } from '../grn/grn-reviewer-home/grn-reviewer-home.component';
import { InspectionTypeHomePageComponent } from '../masters/inspection-type-master/inspection-type-home-page/inspection-type-home-page.component';
import { GrnMasterHomePageComponent } from '../masters/grn-master-home-page/grn-master-home-page.component';
import { StorageLocationHomePageComponent } from '../masters/storage-location-master/storage-location-home-page/storage-location-home-page.component';

const routes: Routes = [
    { path: 'grn-initiator', component: GrnInitiatorComponent },
      { path: 'grn-update-home', component: GrnUpdateHomeComponent },
      { path: 'grn-update', component: GrnUpdateComponent },
      { path: 'grn-reviewer-home', component: GrnReviewerComponent },
      { path: 'grn-reviewer', component: GrnReviewerHomeComponent },
      { path: 'inspection-type-home-page', component: InspectionTypeHomePageComponent },
      { path: 'grn-master-home-page', component: GrnMasterHomePageComponent },
      { path: 'storage-location-home-page', component: StorageLocationHomePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhRoutingModule { }
