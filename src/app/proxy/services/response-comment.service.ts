import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ResponseCommentDto } from '../dto-models/models';

@Injectable({
  providedIn: 'root',
})
export class ResponseCommentService {
  apiName = 'Default';

  create = (input: ResponseCommentDto) =>
    this.restService.request<any, ResponseCommentDto>({
      method: 'POST',
      url: '/api/app/response-comment',
      body: input,
    },
    { apiName: this.apiName });

  getById = (id: number) =>
    this.restService.request<any, ResponseCommentDto>({
      method: 'GET',
      url: `/api/app/response-comment/${id}/by-id`,
    },
    { apiName: this.apiName });

  getList = () =>
    this.restService.request<any, ResponseCommentDto[]>({
      method: 'GET',
      url: '/api/app/response-comment',
    },
    { apiName: this.apiName });

  update = (input: ResponseCommentDto) =>
    this.restService.request<any, ResponseCommentDto>({
      method: 'PUT',
      url: '/api/app/response-comment',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
