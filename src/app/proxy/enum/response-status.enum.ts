import { mapEnumToOptions } from '@abp/ng.core';

export enum ResponseStatus {
  None = 0,
  Accepted = 1,
  Rejected = 2,
  AcceptedByMinistry = 3,
  RejectedByMinistry = 4,
}

export const responseStatusOptions = mapEnumToOptions(ResponseStatus);
