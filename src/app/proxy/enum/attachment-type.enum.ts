import { mapEnumToOptions } from '@abp/ng.core';

export enum AttachmentType {
  None = 0,
  Objection = 1,
  Response = 2,
  ResponseRejected = 3,
}

export const attachmentTypeOptions = mapEnumToOptions(AttachmentType);
