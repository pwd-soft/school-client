import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SchoolDto } from '../dto-models/models';
import type { SchoolInputDto } from '../input-dtos/models';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  apiName = 'Default';

  getById = (id: string) =>
    this.restService.request<any, SchoolDto>({
      method: 'GET',
      url: `/api/app/school/${id}/by-id`,
    },
    { apiName: this.apiName });

  getListByOfficeByCode = (code: string) =>
    this.restService.request<any, SchoolDto[]>({
      method: 'GET',
      url: '/api/app/school/by-office',
      params: { code },
    },
    { apiName: this.apiName });

  removeBuildingsByIds = (ids: number[]) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/school/buildings',
      params: { ids },
    },
    { apiName: this.apiName });

  update = (input: SchoolInputDto) =>
    this.restService.request<any, SchoolDto>({
      method: 'PUT',
      url: '/api/app/school',
      body: input,
    },
    { apiName: this.apiName });

  some = () =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/school/some',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
