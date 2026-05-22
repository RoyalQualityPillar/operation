import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AreaHomePageComponent } from "../ma/master/area-master/area-home-page/area-home-page.component";
import { MaModuleAdminComponent } from "../ma/ma-module-admin/ma-module-admin.component";
import { AreaGroupMasterHomePageComponent } from "../ma/master/area-group-master/area-group-master-home-page/area-group-master-home-page.component";
import { CleanRoomGradeHomePageComponent } from "../ma/master/clean-room-grade/clean-room-grade-home-page/clean-room-grade-home-page.component";
<<<<<<< HEAD
import { CpmHomePageComponent } from "../ma/master/calibraion-perameter-master/cpm-home-page/cpm-home-page.component";
=======
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
>>>>>>> ffc2f30aed923bd2c4ef95fea53878001a01e0f8


const routes: Routes = [

<<<<<<< HEAD
     { path: 'ma-module-admin', component: MaModuleAdminComponent },
     { path: 'area-home-page', component: AreaHomePageComponent }, 
      { path: 'area-group-master-home-page', component: AreaGroupMasterHomePageComponent },
      { path: 'clean-room-grade-home-page', component: CleanRoomGradeHomePageComponent },
       { path: 'cpm-home-page', component: CpmHomePageComponent },
    
=======
  { path: 'ma-module-admin', component: MaModuleAdminComponent },
  { path: 'area-home-page', component: AreaHomePageComponent },
  { path: 'area-group-master-home-page', component: AreaGroupMasterHomePageComponent },
  { path: 'clean-room-grade-home-page', component: CleanRoomGradeHomePageComponent },
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
  { path: 'instrument-cat-home-page', component: InstrumentCatHomePageComponent },
>>>>>>> ffc2f30aed923bd2c4ef95fea53878001a01e0f8
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LbmsRoutingModule { }