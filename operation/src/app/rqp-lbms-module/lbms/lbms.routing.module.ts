import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AreaHomePageComponent } from "../ma/master/area-master/area-home-page/area-home-page.component";
import { MaModuleAdminComponent } from "../ma/ma-module-admin/ma-module-admin.component";
import { AreaGroupMasterHomePageComponent } from "../ma/master/area-group-master/area-group-master-home-page/area-group-master-home-page.component";
import { CleanRoomGradeHomePageComponent } from "../ma/master/clean-room-grade/clean-room-grade-home-page/clean-room-grade-home-page.component";
import { CpmHomePageComponent } from "../ma/master/calibraion-perameter-master/cpm-home-page/cpm-home-page.component";
import { HomePageEquipmentMasterComponent } from "../ma/master/equipment-master/home-page-equipment-master/home-page-equipment-master.component";
import { HomePageEquipInstMasterComponent } from "../ma/master/equipment-inustument-master/home-page-equip-inst-master/home-page-equip-inst-master.component";
import { IwsModuleAdminComponent } from "../iws/iws-module-admin/iws-module-admin.component";
import { IwsInitiatorComponent } from "../iws/iws-initiator/iws-initiator.component";
import { IwsUpdateComponent } from "../iws/iws-update/iws-update.component";
import { IwsUpdateSaveComponent } from "../iws/iws-update-save/iws-update-save.component";
import { IwsReviewerComponent } from "../iws/iws-reviewer/iws-reviewer.component";
import { IwsReviewerSaveComponent } from "../iws/iws-reviewer-save/iws-reviewer-save.component";
import { IwsCompletedComponent } from "../iws/iws-completed/iws-completed.component";
import { IwsCompletedSaveComponent } from "../iws/iws-completed-save/iws-completed-save.component";
import { InstrumentCatHomePageComponent } from "../ma/master/instrument-cat/instrument-cat-home-page/instrument-cat-home-page.component";
import { IwrModuleAdminComponent } from "../iwr/iwr-module-admin/iwr-module-admin.component";
import { IwrInitiatorComponent } from "../iwr/iwr-initiator/iwr-initiator.component";
import { IwrUpdateComponent } from "../iwr/iwr-update/iwr-update.component";
import { IwrUpdateSaveComponent } from "../iwr/iwr-update-save/iwr-update-save.component";
import { IwrReviewerComponent } from "../iwr/iwr-reviewer/iwr-reviewer.component";
import { IwrReviewerSaveComponent } from "../iwr/iwr-reviewer-save/iwr-reviewer-save.component";
import { IwrCompletedComponent } from "../iwr/iwr-completed/iwr-completed.component";
import { IwrCompletedSaveComponent } from "../iwr/iwr-completed-save/iwr-completed-save.component";
import { HomePageCalibrationSchComponent } from "../ma/master/calibration-schedule/home-page-calibration-sch/home-page-calibration-sch.component";
import { HomePageCalibrationFreqComponent } from "../ma/master/calibration-frequency/home-page-calibration-freq/home-page-calibration-freq.component";
import { PmcInitiatorComponent } from "../pmc/pmc-initiator/pmc-initiator.component";
import { PmrInitiatorComponent } from "../pmr/pmr-initiator/pmr-initiator.component";
import { PmcUpdateComponent } from "../pmc/pmc-update/pmc-update.component";
import { PmcUpdateSaveComponent } from "../pmc/pmc-update-save/pmc-update-save.component";
import { PmcReviewerComponent } from "../pmc/pmc-reviewer/pmc-reviewer.component";
import { PmcReviewerSaveComponent } from "../pmc/pmc-reviewer-save/pmc-reviewer-save.component";
import { PmcCompletedComponent } from "../pmc/pmc-completed/pmc-completed.component";
import { PmcCompletedSaveComponent } from "../pmc/pmc-completed-save/pmc-completed-save.component";
import { PmcModuleAdminComponent } from "../pmc/pmc-module-admin/pmc-module-admin.component";




const routes: Routes = [
  { path: 'ma-module-admin', component: MaModuleAdminComponent },
  { path: 'area-home-page', component: AreaHomePageComponent },
  { path: 'area-group-master-home-page', component: AreaGroupMasterHomePageComponent },
  { path: 'clean-room-grade-home-page', component: CleanRoomGradeHomePageComponent },
  { path: 'cpm-home-page', component: CpmHomePageComponent },
  { path: 'home-page-equipment-master', component: HomePageEquipmentMasterComponent },
  { path: 'home-page-equip-inst-master', component: HomePageEquipInstMasterComponent },

  { path: 'iws-module-admin', component: IwsModuleAdminComponent },
  { path: 'iws-initiator', component: IwsInitiatorComponent },
  { path: 'iws-update', component: IwsUpdateComponent },
  { path: 'iws-update-save', component: IwsUpdateSaveComponent },
  { path: 'iws-reviewer', component: IwsReviewerComponent },
  { path: 'iws-reviewer-save', component: IwsReviewerSaveComponent },
  { path: 'iws-completed', component: IwsCompletedComponent },
  { path: 'iws-completed-save', component: IwsCompletedSaveComponent },
  { path: 'iwr-module-admin', component: IwrModuleAdminComponent },
  { path: 'iwr-initiator', component: IwrInitiatorComponent },
  { path: 'iwr-update', component: IwrUpdateComponent },
  { path: 'iwr-update-save', component: IwrUpdateSaveComponent },
  { path: 'iwr-reviewer', component: IwrReviewerComponent },
  { path: 'iwr-reviewer-save', component: IwrReviewerSaveComponent },
  { path: 'iwr-completed', component: IwrCompletedComponent },
  { path: 'iwr-completed-save', component: IwrCompletedSaveComponent },
  { path: 'instrument-cat-home-page', component: InstrumentCatHomePageComponent },
  { path: 'home-page-calibration-sch', component: HomePageCalibrationSchComponent },
  { path: 'home-page-calibration-freq', component: HomePageCalibrationFreqComponent },
  { path: 'pmc-initiator', component: PmcInitiatorComponent },
  { path: 'pmc-update', component: PmcUpdateComponent },
  { path: 'pmc-update-save', component: PmcUpdateSaveComponent },
  { path: 'pmc-reviewer', component: PmcReviewerComponent },
  { path: 'pmc-reviewer-save', component: PmcReviewerSaveComponent },
  { path: 'pmc-completed', component: PmcCompletedComponent },
  { path: 'pmc-completed-save', component: PmcCompletedSaveComponent },
  { path: 'pmc-module-admin', component: PmcModuleAdminComponent },
  { path: 'pmr-initiator', component: PmrInitiatorComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LbmsRoutingModule { }