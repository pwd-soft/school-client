import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ObjectionReportDto } from '../dto-models/models';
import type { ReportFilterModel } from '../models';
import type { GenericListDto } from '../pwd/attendance-swagger/dto-models/models';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  apiName = 'Default';

  detailedReportByReportFilter = (reportFilter: ReportFilterModel) =>
    this.restService.request<any, GenericListDto<ObjectionReportDto>>({
      method: 'POST',
      url: '/api/app/report/detailed-report',
      body: reportFilter,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
