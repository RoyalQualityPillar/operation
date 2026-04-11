import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { SharedModule } from "src/app/common/shared.module";
import { LbmsRoutingModule } from "./lbms.routing.module";
import { AreaCreateUpdateComponent } from "../ma/master/area-master/area-create-update/area-create-update.component";
import { AreaHomePageComponent } from "../ma/master/area-master/area-home-page/area-home-page.component";
import { MaModuleAdminComponent } from "../ma/ma-module-admin/ma-module-admin.component";
import { CleanRoomGradeCreateUpdateComponent } from "../ma/master/clean-room-grade/clean-room-grade-create-update/clean-room-grade-create-update.component";
import { CleanRoomGradeHomePageComponent } from "../ma/master/clean-room-grade/clean-room-grade-home-page/clean-room-grade-home-page.component";

@NgModule({
  declarations: [
    MaModuleAdminComponent,
    AreaCreateUpdateComponent,
    AreaHomePageComponent,
    CleanRoomGradeCreateUpdateComponent,
    CleanRoomGradeHomePageComponent,
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

export class LbmsModule {}