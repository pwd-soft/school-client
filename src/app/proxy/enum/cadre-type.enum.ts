import { mapEnumToOptions } from '@abp/ng.core';

export enum CadreType {
  None = 0,
  Cadre = 1,
  NonCadre = 2,
}

export const cadreTypeOptions = mapEnumToOptions(CadreType);
