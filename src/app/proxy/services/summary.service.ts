import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SummaryDto, SummaryReportDto } from '../dto-models/models';
import type { SummaryReportInputDto } from '../input-dtos/models';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  apiName = 'Default';

  allOfficeSummary = () =>
    this.restService.request<any, SummaryDto[]>({
      method: 'POST',
      url: '/api/app/summary/all-office-summary',
    },
    { apiName: this.apiName });

  create = (SummaryInput: SummaryDto) =>
    this.restService.request<any, SummaryDto>({
      method: 'POST',
      url: '/api/app/summary',
      body: SummaryInput,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/summary/${id}`,
    },
    { apiName: this.apiName });

  generateSummaryReportBySummaryReportCriteria = (summaryReportCriteria: SummaryReportInputDto) =>
    this.restService.request<any, SummaryReportDto[]>({
      method: 'POST',
      url: '/api/app/summary/generate-summary-report',
      body: summaryReportCriteria,
    },
    { apiName: this.apiName });

  getByOfficeByOfficeCode = (officeCode: string) =>
    this.restService.request<any, SummaryDto>({
      method: 'GET',
      url: '/api/app/summary/by-office',
      params: { officeCode },
    },
    { apiName: this.apiName });

  getList = () =>
    this.restService.request<any, SummaryDto[]>({
      method: 'GET',
      url: '/api/app/summary',
    },
    { apiName: this.apiName });

  update = (SummaryInput: SummaryDto) =>
    this.restService.request<any, SummaryDto>({
      method: 'PUT',
      url: '/api/app/summary',
      body: SummaryInput,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
