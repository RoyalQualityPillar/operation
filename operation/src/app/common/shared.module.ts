import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BkTableModule } from 'bk-angular-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

// ✅ Components & Pipes
import { CommonHeaderComponent } from './common-header/common-header.component';
import { CommonCommentsComponent } from './common-comments/common-comments.component';
import { CommonTitleComponent } from './common-title/common-title.component';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';
import { CustomDatePipe } from '../pipe/custom-date.pipe';
import { ReviewerTemplateComponent } from './reviewer-template/reviewer-template.component';
import { CommentsTableComponent } from './comments-table/comments-table.component';
import { CommonButtonBarComponent } from './common-button-bar/common-button-bar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LccpComponent } from './lccp/lccp.component';
import { CommonAllAuditTrailComponent } from './common-all-audit-trail/common-all-audit-trail.component';
import { CommonActiveAuditTrailComponent } from './common-active-audit-trail/common-active-audit-trail.component';
import { CommonTableFilterComponent } from './common-table-filter/common-table-filter.component';
import { LcWeekDataComponent } from './lc-week-data/lc-week-data.component';
//import { CustomDatePipe } from '../pipe/custom-date.pipe'; // ✅ Pipe must be declared, not imported

@NgModule({
  declarations: [
    CommonHeaderComponent,
    CommonCommentsComponent,
    LccpComponent,
    CommonTitleComponent,
    ReviewerTemplateComponent,
    CommentsTableComponent,
    CommonButtonBarComponent,
    CustomSnackBarComponent,
    CustomDatePipe, // ✅ Declared properly
    CommonTableFilterComponent,
    CommonActiveAuditTrailComponent,
    CommonAllAuditTrailComponent,
    LcWeekDataComponent

  ],
  exports: [
    CommonHeaderComponent,
    CommonCommentsComponent,
    LccpComponent,
    CommonTitleComponent,
    CustomSnackBarComponent,
    ReviewerTemplateComponent,
    CommentsTableComponent,
    CommonButtonBarComponent,
    CustomDatePipe, // ✅ Exported to use in other modules
    CommonTableFilterComponent,
    NgApexchartsModule,
       CommonActiveAuditTrailComponent,
    CommonAllAuditTrailComponent,
    LcWeekDataComponent


  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    BkTableModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class SharedModule {}
