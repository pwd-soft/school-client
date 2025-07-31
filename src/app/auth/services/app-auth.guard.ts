import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot
} from '@angular/router';
import { AppAuthService } from './app-auth.service';

@Injectable({ providedIn: 'root' })
export class AppAuthGuard implements CanActivate {
  constructor(private appAuthService: AppAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.appAuthService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.appAuthService.logout();
    return false;
  }
}
