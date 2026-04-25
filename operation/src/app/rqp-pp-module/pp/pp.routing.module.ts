import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EpoInitiatorComponent } from "../epo/epo-initiator/epo-initiator.component";
import { EpoReviewerSaveComponent } from "../epo/epo-reviewer-save/epo-reviewer-save.component";
import { EpoReviewerComponent } from "../epo/epo-reviewer/epo-reviewer.component";
import { EpoUpdateSaveSubmitComponent } from "../epo/epo-update-save-submit/epo-update-save-submit.component";
import { EpoUpdateComponent } from "../epo/epo-update/epo-update.component";
import { EpoHomeComponent } from "../epo/epo-home/epo-home.component";
import { MaModuleAdminComponent } from "../ma/ma-module-admin/ma-module-admin.component";
import { ProductHomePageComponent } from "../ma/master/product-master/product-home-page/product-home-page.component";
import { MasterHomePageComponent } from "../master-home-page/master-home-page.component";
import { MaterialComponent } from "../material/material.component";
import { BomInitiatorComponent } from "../bom/bom-initiator/bom-initiator.component";
import { BomUpdateHomeComponent } from "../bom/bom-update-home/bom-update-home.component";
import { BomUpdateComponent } from "../bom/bom-update/bom-update.component";
import { BomReviewerHomeComponent } from "../bom/bom-reviewer-home/bom-reviewer-home.component";
import { BomReviewerComponent } from "../bom/bom-reviewer/bom-reviewer.component";
import { BomCompletedComponent } from "../bom/bom-completed/bom-completed.component";
import { BomCompletedSaveComponent } from "../bom/bom-completed-save/bom-completed-save.component";
import { BomModuleAdminComponent } from "../bom/bom-module-admin/bom-module-admin.component";
import { EpoModuleAdminComponent } from "../epo/epo-module-admin/epo-module-admin.component";
import { ExecutionProductOrderListComponent } from "../epo/execution-product-order-list/execution-product-order-list.component";
import { EploModuleAdminComponent } from "../eplo/eplo-module-admin/eplo-module-admin.component";
import { PlanningOrderListComponent } from "../eplo/planning-order-list/planning-order-list.component";
import { MaterialIssuanceComponent } from "../mrp/material-issuance/material-issuance.component";

const routes: Routes = [

  { path: 'epo-initiator', component: EpoInitiatorComponent },
  { path: 'epo-update', component: EpoUpdateComponent },
  { path: 'epo-update-save-submit', component: EpoUpdateSaveSubmitComponent },
  { path: 'epo-reviewer', component: EpoReviewerComponent },
  { path: 'epo-reviewer-save', component: EpoReviewerSaveComponent },
  { path: 'epo-home', component: EpoHomeComponent },
  { path: 'ma-module-admin', component: MaModuleAdminComponent },
  { path: 'product-home-page', component: ProductHomePageComponent },
  { path: 'master-home-page', component: MasterHomePageComponent },
  { path: 'material', component: MaterialComponent },
  { path: 'bom-initiator', component: BomInitiatorComponent },
  { path: 'bom-update-home', component: BomUpdateHomeComponent },
  { path: 'bom-update', component: BomUpdateComponent },
  { path: 'bom-reviewer-home', component: BomReviewerHomeComponent },
  { path: 'bom-reviewer', component: BomReviewerComponent },
  { path: 'bom-completed', component: BomCompletedComponent },
  { path: 'bom-completed-save', component: BomCompletedSaveComponent },
  { path: 'bom-module-admin', component: BomModuleAdminComponent },
  { path: 'epo-module-admin', component: EpoModuleAdminComponent },
  { path: 'execution-product-order-list', component: ExecutionProductOrderListComponent },
  { path: 'eplo-module-admin', component: EploModuleAdminComponent },
  { path: 'planning-order-list', component: PlanningOrderListComponent },
  { path: 'material-issuance', component: MaterialIssuanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpRoutingModule { }