import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AttachmentDto } from '../dto-models/models';
import type { AttachmentType } from '../enum/attachment-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  apiName = 'Default';

  create = (input: AttachmentDto) =>
    this.restService.request<any, AttachmentDto>({
      method: 'POST',
      url: '/api/app/attachment',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/attachment/${id}`,
    },
    { apiName: this.apiName });

  getById = (id: number) =>
    this.restService.request<any, AttachmentDto>({
      method: 'GET',
      url: `/api/app/attachment/${id}/by-id`,
    },
    { apiName: this.apiName });

  getListByObjectionId = (id: number, type: AttachmentType) =>
    this.restService.request<any, AttachmentDto[]>({
      method: 'GET',
      url: `/api/app/attachment/${id}/by-objection-id`,
      params: { type },
    },
    { apiName: this.apiName });

  getListResponseId = (id: number, type: AttachmentType) =>
    this.restService.request<any, AttachmentDto[]>({
      method: 'GET',
      url: `/api/app/attachment/${id}/response-id`,
      params: { type },
    },
    { apiName: this.apiName });

  insertBulk = (newAttachments: AttachmentDto[]) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/attachment/bulk',
      body: newAttachments,
    },
    { apiName: this.apiName });

  update = (input: AttachmentDto) =>
    this.restService.request<any, AttachmentDto>({
      method: 'PUT',
      url: '/api/app/attachment',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
