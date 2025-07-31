import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
} from '../../_metronic/kt/components';
import { PreparationService } from 'src/app/shared/services/preparation.service';
import { AppAuthService } from 'src/app/auth';
import { Common } from 'src/app/shared/common/common';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  showDashboardButton: boolean = true;
  @HostBinding('class') class = 'd-flex flex-column flex-root';
  constructor(private router: Router,
    private prep: PreparationService,
    private authService: AppAuthService,
    private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    if(!this.prep.isOfficeAdmin() && !this.prep.isValid())
      this.showDashboardButton = false;
  }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
    setTimeout(() => {
      ToggleComponent.bootstrap();
      ScrollTopComponent.bootstrap();
      DrawerComponent.bootstrap();
      StickyComponent.bootstrap();
      MenuComponent.bootstrap();
      ScrollComponent.bootstrap();
    }, 200);
  }

  logout() {
    this.authService.logout();
    this.localStorageService.remove(Common.PermissionCacheKey);
    // document.location.reload();
    this.router.navigateByUrl('~/auth/login');
  }

}
