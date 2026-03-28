import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('../rqp-admin-module/admin/admin.module').then((m) => m.AdminModule),
  // },
  {
    path: 'pp',
    loadChildren: () =>
      import('./rqp-pp-module/pp/pp.module').then((m) => m.PpModule),
  },
  

 

];
@NgModule({
  imports: [RouterModule.forChild(routes)], // ✅ correct for MFE remotes
  exports: [RouterModule],
})
export class AppRoutingModule {}
