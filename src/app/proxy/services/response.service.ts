import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ResponseHistoryDto, ResponseStateDto } from '../dto-models/models';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  apiName = 'Default';

  create = (input: ResponseHistoryDto) =>
    this.restService.request<any, ResponseHistoryDto>({
      method: 'POST',
      url: '/api/app/response',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/response/${id}`,
    },
    { apiName: this.apiName });

  getById = (id: number) =>
    this.restService.request<any, ResponseHistoryDto>({
      method: 'GET',
      url: `/api/app/response/${id}/by-id`,
    },
    { apiName: this.apiName });

  getList = () =>
    this.restService.request<any, ResponseHistoryDto[]>({
      method: 'GET',
      url: '/api/app/response',
    },
    { apiName: this.apiName });

  getListByObjectionId = (objectionId: number) =>
    this.restService.request<any, ResponseHistoryDto[]>({
      method: 'GET',
      url: `/api/app/response/by-objection-id/${objectionId}`,
    },
    { apiName: this.apiName });

  update = (input: ResponseHistoryDto) =>
    this.restService.request<any, ResponseHistoryDto>({
      method: 'PUT',
      url: '/api/app/response',
      body: input,
    },
    { apiName: this.apiName });

  updateResponseState = (responseStateDto: ResponseStateDto) =>
    this.restService.request<any, ResponseStateDto>({
      method: 'PUT',
      url: '/api/app/response/response-state',
      body: responseStateDto,
    },
    { apiName: this.apiName });

  updateResponseStatusByInput = (input: ResponseHistoryDto) =>
    this.restService.request<any, ResponseHistoryDto>({
      method: 'PUT',
      url: '/api/app/response/response-status',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
