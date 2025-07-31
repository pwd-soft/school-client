import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgPagination } from './components/paginator/ng-pagination/ng-pagination.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
@NgModule({
  declarations: [PaginatorComponent, NgPagination, SortIconComponent],
  imports: [CommonModule, FormsModule, InlineSVGModule],
  exports: [PaginatorComponent, NgPagination, SortIconComponent],
})
export class CRUDTableModule {}
