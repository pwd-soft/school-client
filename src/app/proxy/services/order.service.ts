import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { OrderDetailDto, OrderDto } from '../dto-models/models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiName = 'Default';

  create = (input: OrderDto) =>
    this.restService.request<any, OrderDto>({
      method: 'POST',
      url: '/api/app/order',
      body: input,
    },
    { apiName: this.apiName });

  getById = (id: number) =>
    this.restService.request<any, OrderDto>({
      method: 'GET',
      url: `/api/app/order/${id}/by-id`,
    },
    { apiName: this.apiName });

  insertMany = (input: OrderDetailDto[]) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/order/many',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
