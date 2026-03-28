import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EpoInitiatorComponent } from "../epo/epo-initiator/epo-initiator.component";
import { EpoReviewerSaveComponent } from "../epo/epo-reviewer-save/epo-reviewer-save.component";
import { EpoReviewerComponent } from "../epo/epo-reviewer/epo-reviewer.component";
import { EpoUpdateSaveSubmitComponent } from "../epo/epo-update-save-submit/epo-update-save-submit.component";
import { EpoUpdateComponent } from "../epo/epo-update/epo-update.component";

const routes: Routes = [

      { path: 'epo-initiator', component: EpoInitiatorComponent },
      { path: 'epo-update', component: EpoUpdateComponent },
      { path: 'epo-update-save-submit', component: EpoUpdateSaveSubmitComponent },
      { path: 'epo-reviewer', component: EpoReviewerComponent },
      { path: 'epo-reviewer-save', component: EpoReviewerSaveComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpRoutingModule { }