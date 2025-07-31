import { mapEnumToOptions } from '@abp/ng.core';

export enum SummaryReportSubType {
  Zonewise = 1,
  Circlewise = 2,
}

export const summaryReportSubTypeOptions = mapEnumToOptions(SummaryReportSubType);
