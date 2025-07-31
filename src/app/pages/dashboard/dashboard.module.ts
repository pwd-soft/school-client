import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { DashboardComponent } from './dashboard.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    WidgetsModule,
    NgxSpinnerModule,
  ],
})
export class DashboardModule {}
