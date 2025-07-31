import type { ObjectionType } from './enum/objection-type.enum';
import type { DirectorateType } from './enum/directorate-type.enum';
import type { ObjectionStatus } from './enum/objection-status.enum';

export interface AssociateFilter {
  name?: string;
  bcsid?: string;
}

export interface FilterModel {
  offset: number;
  limit: number;
  pageNo: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: string;
  isDesc: boolean;
}

export interface ObjectionFilterModel extends FilterModel {
  officeCode?: string;
  financialYear?: string;
  objectionType?: ObjectionType;
  directorateType?: DirectorateType;
  objectionStatus?: ObjectionStatus;
}

export interface ReportFilterModel extends FilterModel {
  directorateType: DirectorateType;
  objectionType: ObjectionType;
  objectionStatus: ObjectionStatus;
  offices: string[];
  financialYear: number;
}
