import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AreaHomePageComponent } from "../ma/master/area-master/area-home-page/area-home-page.component";
import { MaModuleAdminComponent } from "../ma/ma-module-admin/ma-module-admin.component";

const routes: Routes = [

     { path: 'ma-module-admin', component: MaModuleAdminComponent },
     { path: 'area-home-page', component: AreaHomePageComponent },
]

    @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LbmsRoutingModule { }