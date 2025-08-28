import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SchoolDto } from '../dto-models/models';
import type { SchoolInputDto } from '../input-dtos/models';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  apiName = 'Default';

  create = (input: SchoolInputDto) =>
    this.restService.request<any, SchoolDto>({
      method: 'POST',
      url: '/api/app/school',
      body: input,
    },
    { apiName: this.apiName });

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

  constructor(private restService: RestService) {}
}
