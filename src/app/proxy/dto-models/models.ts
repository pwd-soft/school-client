import type { EntityDto } from '@abp/ng.core';
import type { AttachmentType } from '../enum/attachment-type.enum';
import type { CadreType } from '../enum/cadre-type.enum';

export interface AttachmentDto extends EntityDto<number> {
  objectionId: number;
  responseId?: number;
  fileName?: string;
  originalFileName?: string;
  attachmentType: AttachmentType;
  path?: string;
  fileSize: number;
  isFileUploaded: boolean;
}

export interface ChangePass {
  userName?: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface ColleagueDto {
  id?: string;
  userName?: string;
  name?: string;
  surName?: string;
  roleNames: string[];
}

export interface OrderDetailDto extends EntityDto<number> {
  orderId: number;
  sequence: number;
  employeeId?: string;
  employeeNameBn?: string;
  postFromId: number;
  postFromNameBn?: string;
  postFromPostBn?: string;
  postFromOfficeBn?: string;
  postToId: number;
  postToPostBn?: string;
  postToOfficeBn?: string;
}

export interface OrderDto extends EntityDto<number> {
  designation?: string;
  memoNo?: string;
  executeDate?: string;
  cadreType: CadreType;
  orderDetails: OrderDetailDto[];
}

export interface OrgRoleConsumeDto {
  roleId?: string;
  organizationUnitId?: string;
}

export interface OrganizationUnitDto {
  id?: string;
  parentId?: string;
  userId?: string;
  code?: string;
  parentCode?: string;
  displayName?: string;
  civilEm?: string;
  displayNameBn?: string;
  layer?: string;
  type?: string;
  roles: OrgRoleConsumeDto[];
  roleNames: string[];
  sequence: number;
}

export interface PostingConsumeDto {
  id?: string;
  orgUniId?: string;
  postingId: number;
  employeeId: number;
  name?: string;
  nameBn?: string;
  post?: string;
  designation?: string;
  designationBn?: string;
  office?: string;
  officeBn?: string;
  userName?: string;
}

export interface PostingDto extends EntityDto<number> {
  postingId: number;
  employeeId: number;
  name?: string;
  nameBn?: string;
  post?: string;
  designation?: string;
  designationBn?: string;
  office?: string;
  officeBn?: string;
  orgUniId?: string;
  userId?: string;
  userName?: string;
}

export interface UpdateRoleDto {
  userName?: string;
  roleName?: string;
  isAdd: boolean;
}

export interface UserInfoDto {
  tenantId: object;
  userName?: string;
  name?: string;
  surname: object;
  email?: string;
  emailConfirmed: boolean;
  phoneNumber: object;
  phoneNumberConfirmed: boolean;
  id?: string;
}
