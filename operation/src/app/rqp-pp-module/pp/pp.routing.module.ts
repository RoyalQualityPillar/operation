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
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpRoutingModule { }