import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrnInitiatorComponent } from '../grn/grn-initiator/grn-initiator.component';
import { GrnUpdateHomeComponent } from '../grn/grn-update-home/grn-update-home.component';
import { GrnUpdateComponent } from '../grn/grn-update/grn-update.component';
import { GrnReviewerComponent } from '../grn/grn-reviewer/grn-reviewer.component';
import { GrnReviewerHomeComponent } from '../grn/grn-reviewer-home/grn-reviewer-home.component';
import { GoodsReceiptListComponent } from '../grn/goods-receipt-list/goods-receipt-list.component';

const routes: Routes = [
    { path: 'grn-initiator', component: GrnInitiatorComponent },
      { path: 'grn-update-home', component: GrnUpdateHomeComponent },
      { path: 'grn-update', component: GrnUpdateComponent },
      { path: 'grn-reviewer-home', component: GrnReviewerComponent },
      { path: 'grn-reviewer', component: GrnReviewerHomeComponent },
     { path: 'goods-receipt-list', component: GoodsReceiptListComponent },
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhRoutingModule { }
