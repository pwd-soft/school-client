import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { YearlyObjectionDto } from '../dto-models/models';

@Injectable({
  providedIn: 'root',
})
export class YearlyObjectionService {
  apiName = 'Default';

  getById = (id: number) =>
    this.restService.request<any, YearlyObjectionDto>({
      method: 'GET',
      url: `/api/app/yearly-objection/${id}/by-id`,
    },
    { apiName: this.apiName });

  getListByOfficeCode = (officeCode: string) =>
    this.restService.request<any, YearlyObjectionDto[]>({
      method: 'GET',
      url: '/api/app/yearly-objection/by-office-code',
      params: { officeCode },
    },
    { apiName: this.apiName });

  update = (input: YearlyObjectionDto) =>
    this.restService.request<any, YearlyObjectionDto>({
      method: 'PUT',
      url: '/api/app/yearly-objection',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
