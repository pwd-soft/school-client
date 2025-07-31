import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ChangePass, ColleagueDto, OrganizationUnitDto, PostingConsumeDto, PostingDto, UpdateRoleDto, UserInfo } from '../dto-models/models';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  apiName = 'Default';

  getOffices = () =>
    this.restService.request<any, OrganizationUnitDto[]>({
      method: 'GET',
      url: '/api/app/approval/offices',
    },
    { apiName: this.apiName });

  getPostingByIdById = (id: number) =>
    this.restService.request<any, PostingDto>({
      method: 'GET',
      url: `/api/app/approval/${id}/posting-by-id`,
    },
    { apiName: this.apiName });

  getPostingByUserName = (userName: string) =>
    this.restService.request<any, PostingDto>({
      method: 'GET',
      url: '/api/app/approval/posting',
      params: { userName },
    },
    { apiName: this.apiName });

  getPostingListByIdByIds = (ids: number[]) =>
    this.restService.request<any, PostingDto[]>({
      method: 'GET',
      url: '/api/app/approval/posting-list-by-id',
      params: { ids },
    },
    { apiName: this.apiName });

  getUserByRoleByRoleName = (roleName: string) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: '/api/app/approval/user-by-role',
      params: { roleName },
    },
    { apiName: this.apiName });

  getUserInfoByIdByUserId = (userId: string) =>
    this.restService.request<any, UserInfo>({
      method: 'GET',
      url: `/api/app/approval/user-info-by-id/${userId}`,
    },
    { apiName: this.apiName });

  getUserInfoByUserName = (userName: string) =>
    this.restService.request<any, UserInfo>({
      method: 'GET',
      url: '/api/app/approval/user-info',
      params: { userName },
    },
    { apiName: this.apiName });

  latestOffice = () =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/app/approval/latest-office',
    },
    { apiName: this.apiName });

  officePostingsByUserName = (userName: string) =>
    this.restService.request<any, PostingConsumeDto[]>({
      method: 'GET',
      url: '/api/app/approval/office-postings',
      params: { userName },
    },
    { apiName: this.apiName });

  officeUsersByUserName = (userName: string) =>
    this.restService.request<any, ColleagueDto[]>({
      method: 'GET',
      url: '/api/app/approval/office-users',
      params: { userName },
    },
    { apiName: this.apiName });

  updatePasswordByInput = (input: ChangePass) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/approval/update-password',
      body: input,
    },
    { apiName: this.apiName });

  updatePostingByUserName = (userName: string) =>
    this.restService.request<any, PostingDto>({
      method: 'PUT',
      url: '/api/app/approval/posting',
      params: { userName },
    },
    { apiName: this.apiName });

  updateUserRoleByUpdateRole = (updateRole: UpdateRoleDto) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/approval/user-role',
      body: updateRole,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
