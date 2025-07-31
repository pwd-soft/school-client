import { Injectable } from '@angular/core';
import { IdToken } from '../model/project-model';
import { OrganizationUnitDto, PostingDto } from '../../proxy/dto-models';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {

  public static readonly Admin = "admin";
  public static readonly OfficeAdmin = "AuditOfficeAdmin";
  public static readonly AuditAdmin = "AuditAdmin";

  roles: string[] = [];
  token: IdToken;
  posting: PostingDto;
  valid: boolean = false;
  offices: OrganizationUnitDto[] = [];
  constructor() {
    this.refresh();
  }

  refresh() {
    this.token = JSON.parse(localStorage.getItem("id_token_claims_obj")) as IdToken;
    this.roles = this.token.role;
    this.posting = JSON.parse(localStorage.getItem("posting")) as PostingDto;
    this.offices = JSON.parse(localStorage.getItem("offices")) as OrganizationUnitDto[];
  }

  isAdmin() {
    if (this.roles.includes(PreparationService.Admin))
      return true;
    return false;
  }

  isOfficeAdmin() {
    if (this.roles.includes(PreparationService.OfficeAdmin))
      return true;
    return false;
  }

  isAuditAdmin() {
    if (this.roles.includes(PreparationService.AuditAdmin))
      return true;
    return false;
  }

  isValid() {
    return localStorage.getItem("valid") === "true" ? true : false;
  }

  getUserName() {
    return this.token.preferred_username
  }

  getUserId() {
    return this.token.sub
  }

}
