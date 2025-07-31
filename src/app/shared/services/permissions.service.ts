import { isNullOrUndefined } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { Common } from '../common/common';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private localStorageService: LocalStorageService) {}

  hasPermission(permissionName: string): boolean {
    const keys = this.localStorageService.getByItem(Common.PermissionCacheKey);
    let grantedPermission = keys.find((x) => x === permissionName);
    return !isNullOrUndefined(grantedPermission) ? true : false;
  }
}
