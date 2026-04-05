import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhRoutingModule } from './wh-routing.module';
import { GrnInitiatorComponent } from '../grn/grn-initiator/grn-initiator.component';
import { GrnUpdateHomeComponent } from '../grn/grn-update-home/grn-update-home.component';
import { GrnUpdateComponent } from '../grn/grn-update/grn-update.component';
import { GrnReviewerComponent } from '../grn/grn-reviewer/grn-reviewer.component';
import { GrnReviewerHomeComponent } from '../grn/grn-reviewer-home/grn-reviewer-home.component';


@NgModule({
  declarations: [
     GrnInitiatorComponent,
    GrnUpdateHomeComponent,
    GrnUpdateComponent,
    GrnReviewerComponent,
    GrnReviewerHomeComponent,
  ],
  imports: [
    CommonModule,
    WhRoutingModule
  ]
})
export class WhModule { }
