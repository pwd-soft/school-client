import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AssociateAndObjectionsDto } from '../dto-models/models';
import type { AssociateFilter } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  apiName = 'Default';

  searchAssociatesByAssociateFilter = (associateFilter: AssociateFilter) =>
    this.restService.request<any, AssociateAndObjectionsDto[]>({
      method: 'POST',
      url: '/api/app/associate/search-associates',
      body: associateFilter,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
