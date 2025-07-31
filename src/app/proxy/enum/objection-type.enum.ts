import { mapEnumToOptions } from '@abp/ng.core';

export enum ObjectionType {
  None = 0,
  NonSFI = 1,
  SFI = 2,
  Draft = 3,
}

export const objectionTypeOptions = mapEnumToOptions(ObjectionType);
