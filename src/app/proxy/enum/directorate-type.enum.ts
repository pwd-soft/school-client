import { mapEnumToOptions } from '@abp/ng.core';

export enum DirectorateType {
  None = 0,
  Audit = 1,
  Fapad = 2,
}

export const directorateTypeOptions = mapEnumToOptions(DirectorateType);
