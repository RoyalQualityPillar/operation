import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { PpRoutingModule } from "./pp.routing.module";
import { SharedModule } from "src/app/common/shared.module";
import { EpoInitiatorComponent } from "../epo/epo-initiator/epo-initiator.component";
import { EpoReviewerSaveComponent } from "../epo/epo-reviewer-save/epo-reviewer-save.component";
import { EpoReviewerComponent } from "../epo/epo-reviewer/epo-reviewer.component";
import { EpoUpdateSaveSubmitComponent } from "../epo/epo-update-save-submit/epo-update-save-submit.component";
import { EpoUpdateComponent } from "../epo/epo-update/epo-update.component";
import { EpoHomeComponent } from "../epo/epo-home/epo-home.component";
import { StockListEpoComponent } from "../pp-common/stock-list-epo/stock-list-epo.component";
import { MaModuleAdminComponent } from "../ma/ma-module-admin/ma-module-admin.component";
import { ProductCreateUpdateComponent } from "../ma/master/product-master/product-create-update/product-create-update.component";
import { ProductHomePageComponent } from "../ma/master/product-master/product-home-page/product-home-page.component";
import { AddNewRecordComponent } from "../pp-common/add-new-record/add-new-record.component";
import { MasterHomePageComponent } from "../master-home-page/master-home-page.component";
import { MaterialComponent } from "../material/material.component";
import { BomInitiatorComponent } from "../bom/bom-initiator/bom-initiator.component";
import { BomUpdateComponent } from "../bom/bom-update/bom-update.component";
import { BomUpdateHomeComponent } from "../bom/bom-update-home/bom-update-home.component";
import { BomReviewerHomeComponent } from "../bom/bom-reviewer-home/bom-reviewer-home.component";
import { BomReviewerComponent } from "../bom/bom-reviewer/bom-reviewer.component";
import { BomCompletedComponent } from "../bom/bom-completed/bom-completed.component";
import { BomCompletedSaveComponent } from "../bom/bom-completed-save/bom-completed-save.component";
import { BomModuleAdminComponent } from "../bom/bom-module-admin/bom-module-admin.component";

@NgModule({
  declarations: [
    EpoInitiatorComponent,
    EpoUpdateComponent,
    EpoUpdateSaveSubmitComponent,
    EpoReviewerComponent,
    EpoReviewerSaveComponent,
    EpoHomeComponent,
    StockListEpoComponent,
    MaModuleAdminComponent,
    ProductCreateUpdateComponent,
    ProductHomePageComponent,
    AddNewRecordComponent,
    MaterialComponent,
    MasterHomePageComponent,
    BomInitiatorComponent,
    BomUpdateComponent,
    BomUpdateHomeComponent,
    BomReviewerHomeComponent,
    BomReviewerComponent,
    BomCompletedComponent,
    BomCompletedSaveComponent,
    BomModuleAdminComponent,


  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PpRoutingModule
    // CustomDatePipe,

  ],
  providers: [],
})

export class PpModule { }
