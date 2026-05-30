import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { LbmsRoutingModule } from "./lbms.routing.module";
import { AreaCreateUpdateComponent } from "../ma/master/area-master/area-create-update/area-create-update.component";
import { AreaHomePageComponent } from "../ma/master/area-master/area-home-page/area-home-page.component";
import { MaModuleAdminComponent } from "../ma/ma-module-admin/ma-module-admin.component";
import { AreaGroupMasterCreateUpdateComponent } from "../ma/master/area-group-master/area-group-master-create-update/area-group-master-create-update.component";
import { AreaGroupMasterHomePageComponent } from "../ma/master/area-group-master/area-group-master-home-page/area-group-master-home-page.component";
import { CleanRoomGradeCreateUpdateComponent } from "../ma/master/clean-room-grade/clean-room-grade-create-update/clean-room-grade-create-update.component";
import { CleanRoomGradeHomePageComponent } from "../ma/master/clean-room-grade/clean-room-grade-home-page/clean-room-grade-home-page.component";
import { CpmCreateUpdateComponent } from "../ma/master/calibraion-perameter-master/cpm-create-update/cpm-create-update.component";
import { CpmHomePageComponent } from "../ma/master/calibraion-perameter-master/cpm-home-page/cpm-home-page.component";
import { SharedModule } from "src/app/common/shared.module";
import { CreateUpdateEquipmentMasterComponent } from "../ma/master/equipment-master/create-update-equipment-master/create-update-equipment-master.component";
import { HomePageEquipmentMasterComponent } from "../ma/master/equipment-master/home-page-equipment-master/home-page-equipment-master.component";
import { CreateUpdateEquipInstMasterComponent } from "../ma/master/equipment-inustument-master/create-update-equip-inst-master/create-update-equip-inst-master.component";
import { HomePageEquipInstMasterComponent } from "../ma/master/equipment-inustument-master/home-page-equip-inst-master/home-page-equip-inst-master.component";
import { IwsModuleAdminComponent } from "../iws/iws-module-admin/iws-module-admin.component";
import { IwsInitiatorComponent } from "../iws/iws-initiator/iws-initiator.component";
import { IwsUpdateComponent } from "../iws/iws-update/iws-update.component";
import { IwsUpdateSaveComponent } from "../iws/iws-update-save/iws-update-save.component";
import { IwsReviewerComponent } from "../iws/iws-reviewer/iws-reviewer.component";
import { IwsReviewerSaveComponent } from "../iws/iws-reviewer-save/iws-reviewer-save.component";
import { IwsCompletedComponent } from "../iws/iws-completed/iws-completed.component";
import { IwsCompletedSaveComponent } from "../iws/iws-completed-save/iws-completed-save.component";
import { InstrumentCatCreateUpdateComponent } from "../ma/master/instrument-cat/instrument-cat-create-update/instrument-cat-create-update.component";
import { InstrumentCatHomePageComponent } from "../ma/master/instrument-cat/instrument-cat-home-page/instrument-cat-home-page.component";
import { IwrInitiatorComponent } from "../iwr/iwr-initiator/iwr-initiator.component";
import { IwrUpdateComponent } from "../iwr/iwr-update/iwr-update.component";
import { IwrUpdateSaveComponent } from "../iwr/iwr-update-save/iwr-update-save.component";
import { IwrReviewerComponent } from "../iwr/iwr-reviewer/iwr-reviewer.component";
import { IwrReviewerSaveComponent } from "../iwr/iwr-reviewer-save/iwr-reviewer-save.component";
import { IwrCompletedComponent } from "../iwr/iwr-completed/iwr-completed.component";
import { IwrCompletedSaveComponent } from "../iwr/iwr-completed-save/iwr-completed-save.component";
import { IwrModuleAdminComponent } from "../iwr/iwr-module-admin/iwr-module-admin.component";
import { CreateUpdateCalibrationSchComponent } from "../ma/master/calibration-schedule/create-update-calibration-sch/create-update-calibration-sch.component";
import { HomePageCalibrationSchComponent } from "../ma/master/calibration-schedule/home-page-calibration-sch/home-page-calibration-sch.component";
import { CreateUpdateCalibrationFreqComponent } from "../ma/master/calibration-frequency/create-update-calibration-freq/create-update-calibration-freq.component";
import { HomePageCalibrationFreqComponent } from "../ma/master/calibration-frequency/home-page-calibration-freq/home-page-calibration-freq.component";
import { PmcHomeComponent } from "../pmc/pmc-home/pmc-home.component";
import { PmcInitiatorComponent } from "../pmc/pmc-initiator/pmc-initiator.component";
import { PmrInitiatorComponent } from "../pmr/pmr-initiator/pmr-initiator.component";






@NgModule({
  declarations: [
    MaModuleAdminComponent,
    AreaCreateUpdateComponent,
    AreaHomePageComponent,
    AreaGroupMasterCreateUpdateComponent,
    AreaGroupMasterHomePageComponent,
    CleanRoomGradeCreateUpdateComponent,
    CleanRoomGradeHomePageComponent,
      CpmCreateUpdateComponent,
        CpmHomePageComponent,
    
    CreateUpdateEquipmentMasterComponent,
    HomePageEquipmentMasterComponent,
    CreateUpdateEquipInstMasterComponent,
    HomePageEquipInstMasterComponent,
    IwsModuleAdminComponent,
    IwsInitiatorComponent,
    IwsUpdateComponent,
    IwsUpdateSaveComponent,
    IwsReviewerComponent,
    IwsReviewerSaveComponent,
    IwsCompletedComponent,
    IwsCompletedSaveComponent,
    InstrumentCatCreateUpdateComponent,
    InstrumentCatHomePageComponent,
    IwrInitiatorComponent,
    IwrUpdateComponent,
    IwrUpdateSaveComponent,
    IwrReviewerComponent,
    IwrReviewerSaveComponent,
    IwrCompletedComponent,
    IwrCompletedSaveComponent, 
    IwrModuleAdminComponent,  
    CreateUpdateCalibrationSchComponent,
    HomePageCalibrationSchComponent,
    CreateUpdateCalibrationFreqComponent,
    HomePageCalibrationFreqComponent,
    PmcHomeComponent,
    PmcInitiatorComponent,
    PmrInitiatorComponent,
    
    

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LbmsRoutingModule
    // CustomDatePipe,

  ],
  providers: [],
})

export class LbmsModule { }