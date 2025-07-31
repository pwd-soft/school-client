import { mapEnumToOptions } from '@abp/ng.core';

export enum SummaryReportType {
  PWD = 1,
  Combined = 2,
  Detailed = 3,
  Officewise = 4,
}

export const summaryReportTypeOptions = mapEnumToOptions(SummaryReportType);
