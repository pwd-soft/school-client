import type { EntityDto } from '@abp/ng.core';
import type { AttachmentType } from '../enum/attachment-type.enum';

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

export interface BuildingDto extends EntityDto<number> {
  buildingNumber: number;
  constructionYear: number;
  projectName?: string;
  foundationFloors: number;
  currentFloors: number;
  usableRooms: number;
  unusableRooms: number;
  isRisky: boolean;
  isAbandoned: boolean;
  isDamagedDeclared: boolean;
  isUnderConstruction: boolean;
  expandedOrRepairedLast5Years: boolean;
  buildingType?: string;
  comments?: string;
  lengthFeet: number;
  widthFeet: number;
  isProposed: boolean;
  schoolId: number;
  school: SchoolDto;
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

export interface SchoolDto extends EntityDto<number> {
  officeCode?: string;
  sdOfficeCode?: string;
  division?: string;
  district?: string;
  thana?: string;
  sequence?: string;
  name?: string;
  emis?: string;
  headMaster?: string;
  mobile?: string;
  isSaved: boolean;
  totalLandDecimals: number;
  undisputedLandDecimals: number;
  hasLandComplications: boolean;
  complicatedLandDecimals: number;
  landRecordedInGovtName: boolean;
  boundaryDetermined: boolean;
  boundaryWallNeededFeet: number;
  totalTeacherPosts: number;
  workingTeachers: number;
  shiftType?: string;
  isRiverErosionProne: boolean;
  distanceFromRiverMeters: number;
  additionalRoomsMethod?: string;
  spaceAvailableForNewBuilding: boolean;
  needsTemporaryRoomsDuringConstruction: boolean;
  additionalClassroomsRequired: number;
  recommendation?: string;
  soilFillingCubicFeet: number;
  fieldLengthFeet: number;
  fieldWidthFeet: number;
  fieldHeightFeet: number;
  northBoundaryFeet: number;
  southBoundaryFeet: number;
  eastBoundaryFeet: number;
  westBoundaryFeet: number;
  specialComments?: string;
  buildings: BuildingDto[];
  studentCounts: StudentCountDto[];
}

export interface StudentCountDto extends EntityDto<number> {
  classLevel?: string;
  studentNumber: number;
  schoolId: number;
  school: SchoolDto;
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
