import type { EntityDto, FullAuditedEntityDto } from '@abp/ng.core';
import type { AttachmentType } from '../enum/attachment-type.enum';
import type { ObjectionType } from '../enum/objection-type.enum';
import type { DirectorateType } from '../enum/directorate-type.enum';
import type { ObjectionStatus } from '../enum/objection-status.enum';
import type { FileDataInput } from '../input-dtos/models';
import type { ResponseStatus } from '../enum/response-status.enum';

export interface AssociateAndObjectionsDto {
  associate: AssociateDto;
  objections: ObjectionDto[];
}

export interface AssociateDto extends FullAuditedEntityDto<number> {
  objectionId: number;
  name?: string;
  designation?: string;
  post?: string;
  note?: string;
  bcsid?: string;
}

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

export interface Extraproperties {
}

export interface ObjectionDto extends EntityDto<number> {
  officeCode?: string;
  date?: string;
  financialYear?: string;
  objectionType: ObjectionType;
  directorateType: DirectorateType;
  name?: string;
  description?: string;
  response?: string;
  value: number;
  objectionStatus: ObjectionStatus;
  isActive: boolean;
  note?: string;
  associates: AssociateDto[];
  memoNumber?: string;
  memoDate?: string;
  objectionMemoNumber?: string;
  objectionDate?: string;
  answerCount: number;
  comments?: string;
  articleNumber?: string;
  isIncomplete: boolean;
  currentOffice?: string;
  isCentralEntry: boolean;
  responseHistories: ResponseHistoryDto[];
  attachments: AttachmentDto[];
}

export interface ObjectionReportDto {
  orgUnit: OrganizationUnitDto;
  objections: ObjectionDto[];
  yearlyObjections: number;
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

export interface ResponseCommentDto extends FullAuditedEntityDto<number> {
  responseHistoryId: number;
  comment?: string;
  office?: string;
  user?: string;
  postingId: number;
}

export interface ResponseHistoryDto extends FullAuditedEntityDto<number> {
  objectionId: number;
  response?: string;
  recommendation?: string;
  fileDataInput: FileDataInput[];
  user?: string;
  status: ResponseStatus;
  responseComments: ResponseCommentDto[];
  responseStates: ResponseStateDto[];
  attachments: AttachmentDto[];
}

export interface ResponseStateDto extends FullAuditedEntityDto<number> {
  objectionId: number;
  responseHistoryId?: number;
  note?: string;
  isModified: boolean;
  office?: string;
  user?: string;
  postingId: number;
  isLocked: boolean;
}

export interface SummaryDto extends EntityDto<number> {
  officeCode?: string;
  officeName?: string;
  date?: string;
  financialYear?: string;
  referenceNo?: string;
  note: number;
  summaryLines: SummaryLineDto[];
}

export interface SummaryLineDto extends EntityDto<number> {
  summaryId: number;
  type: ObjectionType;
  typeName?: string;
  count: number;
  value: number;
  broadSheet: number;
  nonBroadSheet: number;
  resolved: number;
  note?: string;
}

export interface SummaryReportDto {
  serial: number;
  name?: string;
  previousObjectionNumber: number;
  previousObjectionAmount: number;
  currentObjectionNumber: number;
  currentObjectionAmount: number;
  subTotalObjectionNumber: number;
  subTotalObjectionAmount: number;
  previousBroadsheetNumber: number;
  unsetteledBroadsheetNumber: number;
  currentObjectionSettlementNumber: number;
  currentObjectionSettlementAmount: number;
  nonSfiNumber: number;
  sfiNumber: number;
  draftNumber: number;
  totalObjectionNumber: number;
  totalObjectionAmount: number;
  comments?: string;
}

export interface UpdateRoleDto {
  userName?: string;
  roleName?: string;
  isAdd: boolean;
}

export interface UserInfo {
  tenantId: object;
  userName?: string;
  name?: string;
  surname: object;
  email?: string;
  emailConfirmed: boolean;
  phoneNumber: object;
  phoneNumberConfirmed: boolean;
  id?: string;
  extraProperties: Extraproperties;
}

export interface YearlyObjectionDto extends EntityDto<number> {
  officeCode?: string;
  year: number;
  numberOfObjections: number;
}
