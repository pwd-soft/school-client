import { CoreModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSpinnerModule } from "ngx-spinner";
import { NumberDirective } from '../shared/directives/numbers-only.directives';
import { NumericDirective } from '../shared/directives/numeric.directive';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { DataLoadingEmptyComponent } from './components/data-loading-empty/data-loading-empty.component';
import { DataLoadingComponent } from './components/data-loading/data-loading.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PermissionNotificationComponent } from './components/permission-notification/permission-notification.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';

@NgModule({
  declarations: [
    NumberDirective,
    NumericDirective,
    DataLoadingComponent,
    DataLoadingEmptyComponent,
    ConfirmModalComponent,
    AlertModalComponent,
    PaginationComponent,
    PrintLayoutComponent,
    PermissionNotificationComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    NgbModule,
    InlineSVGModule,
    NgxSpinnerModule
  ],
  exports: [
    CoreModule,
    NumberDirective,
    NumericDirective,
    DataLoadingComponent,
    DataLoadingEmptyComponent,
    ConfirmModalComponent,
    AlertModalComponent,
    PaginationComponent,
    PermissionNotificationComponent
  ],
  providers: []
})
export class SharedModule { }
