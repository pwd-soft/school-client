import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import {
  CardsModule,
  DropdownMenusModule,
  WidgetsModule
} from '../../_metronic/partials';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { ConnectionsComponent } from './connections/connections.component';
import { DocumentsComponent } from './documents/documents.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  declarations: [
    ProfileComponent,
    OverviewComponent,
    ProjectsComponent,
    CampaignsComponent,
    DocumentsComponent,
    ConnectionsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    CardsModule,
  ],
})
export class ProfileModule {}
