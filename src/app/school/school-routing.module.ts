import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolEntryComponent } from './school-entry/school-entry.component';
//import { TransferPreparationComponent } from './transfer-preparation/transfer-preparation.component';
//import { TransferListComponent } from './transfer-list/transfer-list.component';

const routes: Routes = [
  //{ path: 'transfer-order',component:TransferPreparationComponent },
  //{ path: 'transfer-order-edit/:id',component:TransferPreparationComponent },
  //{ path: 'transfer-list',component:TransferListComponent },
  { path: 'entry',component:SchoolEntryComponent },
  { path: 'entry/:id',component:SchoolEntryComponent },
  

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
