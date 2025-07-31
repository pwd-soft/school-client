import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BuilderComponent } from './builder.component';

@NgModule({
  declarations: [BuilderComponent],
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    NgbTooltipModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuilderComponent,
      },
    ]),
  ],
})
export class BuilderModule {}
