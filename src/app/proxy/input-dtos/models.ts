import type { EntityDto } from '@abp/ng.core';

export interface BuildingInputDto {
  id: number;
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
  school: SchoolInputDto;
}

export interface FileDataInput {
  id: number;
  fileName?: string;
  originalFileName?: string;
  path?: string;
  fileSize: number;
  isFileUploaded: boolean;
}

export interface FileDeleteInput {
  filePath?: string;
  fileName?: string;
}

export interface FileInput {
  fileName?: string;
  originalFileName?: string;
  path?: string;
  fileSize: number;
  uploadDate?: string;
  isFileUploaded: boolean;
}

export interface SchoolInputDto {
  id: number;
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
  student: StudentInputDto;
  buildings: BuildingInputDto[];
  studentCounts: StudentCountInputDto[];
}

export interface StudentCountInputDto {
  id: number;
  classLevel?: string;
  studentNumber: number;
  schoolId: number;
  school: SchoolInputDto;
}

export interface StudentInputDto extends EntityDto<number> {
  schoolId: number;
  prePrimary4Plus: number;
  prePrimary5Plus: number;
  class1: number;
  class2: number;
  class3: number;
  class4: number;
  class5: number;
  specialComment?: string;
}
