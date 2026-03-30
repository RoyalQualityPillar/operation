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

export class PpModule {}
