import { mapEnumToOptions } from '@abp/ng.core';

export enum ObjectionStatus {
  None = 0,
  BroadSheetNotAnswered = 1,
  BroadSheetAnswered = 2,
  RequestedReAnswer = 3,
  ReAnswered = 4,
  Resolved = 5,
  Other = 6,
  RequestedReAnswerFromMinistry = 7,
  RequestedReAnswerFromAGOffice = 8,
}

export const objectionStatusOptions = mapEnumToOptions(ObjectionStatus);
