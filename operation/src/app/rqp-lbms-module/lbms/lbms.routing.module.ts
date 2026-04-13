import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AreaHomePageComponent } from "../ma/master/area-master/area-home-page/area-home-page.component";
import { MaModuleAdminComponent } from "../ma/ma-module-admin/ma-module-admin.component";
import { AreaGroupMasterHomePageComponent } from "../ma/master/area-group-master/area-group-master-home-page/area-group-master-home-page.component";
import { CleanRoomGradeHomePageComponent } from "../ma/master/clean-room-grade/clean-room-grade-home-page/clean-room-grade-home-page.component";


const routes: Routes = [

     { path: 'ma-module-admin', component: MaModuleAdminComponent },
     { path: 'area-home-page', component: AreaHomePageComponent }, 
      { path: 'area-group-master-home-page', component: AreaGroupMasterHomePageComponent },
      { path: 'clean-room-grade-home-page', component: CleanRoomGradeHomePageComponent },
]

    @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LbmsRoutingModule { }