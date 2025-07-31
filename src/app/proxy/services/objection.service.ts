import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ObjectionDto } from '../dto-models/models';
import type { ObjectionFilterModel } from '../models';
import type { GenericListDto } from '../pwd/attendance-swagger/dto-models/models';

@Injectable({
  providedIn: 'root',
})
export class ObjectionService {
  apiName = 'Default';

  create = (objectionInput: ObjectionDto) =>
    this.restService.request<any, ObjectionDto>({
      method: 'POST',
      url: '/api/app/objection',
      body: objectionInput,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/objection/${id}`,
    },
    { apiName: this.apiName });

  getById = (id: number) =>
    this.restService.request<any, ObjectionDto>({
      method: 'GET',
      url: `/api/app/objection/${id}/by-id`,
    },
    { apiName: this.apiName });

  getIncomingResponseList = (officeCode: string) =>
    this.restService.request<any, ObjectionDto[]>({
      method: 'GET',
      url: '/api/app/objection/incoming-response-list',
      params: { officeCode },
    },
    { apiName: this.apiName });

  getList = () =>
    this.restService.request<any, ObjectionDto[]>({
      method: 'GET',
      url: '/api/app/objection',
    },
    { apiName: this.apiName });

  getListByOfficeCode = (officeCode: string) =>
    this.restService.request<any, ObjectionDto[]>({
      method: 'GET',
      url: '/api/app/objection/by-office-code',
      params: { officeCode },
    },
    { apiName: this.apiName });

  searchObjectionsByFilterCriteria = (filterCriteria: ObjectionFilterModel) =>
    this.restService.request<any, ObjectionDto[]>({
      method: 'POST',
      url: '/api/app/objection/search-objections',
      body: filterCriteria,
    },
    { apiName: this.apiName });

  searchObjectionsWithPagingByFilterCriteria = (filterCriteria: ObjectionFilterModel) =>
    this.restService.request<any, GenericListDto<ObjectionDto>>({
      method: 'POST',
      url: '/api/app/objection/search-objections-with-paging',
      body: filterCriteria,
    },
    { apiName: this.apiName });

  update = (objectionInput: ObjectionDto) =>
    this.restService.request<any, ObjectionDto>({
      method: 'PUT',
      url: '/api/app/objection',
      body: objectionInput,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
