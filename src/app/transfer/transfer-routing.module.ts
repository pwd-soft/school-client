import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferPreparationComponent } from './transfer-preparation/transfer-preparation.component';
import { TransferListComponent } from './transfer-list/transfer-list.component';

const routes: Routes = [
  { path: 'transfer-order',component:TransferPreparationComponent },
  { path: 'transfer-order-edit/:id',component:TransferPreparationComponent },
  { path: 'transfer-list',component:TransferListComponent },
  // { path: 'objection/new',component:CreateObjectionComponent },
  // { path: 'objection/update/:id',component:CreateObjectionComponent },
  // { path: 'objection/view/:id',component:ViewObjectionComponent },
  // { path: 'objection/response/:id',component:ResponseComponent },
  // { path: 'objection/response-approval/:id',component:ResponseApprovalComponent },
  // { path: 'objection/incoming-responses',component:IncomingResponseComponent },
  // { path: 'summary/new', component: RecordSummaryComponent },
  // { path: 'summary/update/:id', component: RecordSummaryComponent },
  // { path: 'summary/view/:code', component: ViewSummaryComponent },
  // { path: 'manageuser', component: ManageUserComponent },
  // { path: 'allsummary', component: AllSummaryComponent   },
  // { path: 'monitor', component: MonitoringDashboardComponent },
  // { path: 'monitor/resolved', component: ResolvedObjectionsComponent },
  // { path: 'monitor/sfi', component: SfiObjectionsComponent },
  // { path: 'monitor/non-sfi', component: NonSfiObjectionsComponent },
  // { path: 'monitor/draft', component: DraftObjectionsComponent },
  // { path: 'yearlyobjections', component: YearlyObjectionsComponent },
  // { path: 'monitor/officers', component: AuditedOfficersComponent },
  // { path: 'monitor/report', component: ReportingComponent},
  // { path: 'monitor/incoming-responses',component:MonitorIncomingResponsesComponent },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
