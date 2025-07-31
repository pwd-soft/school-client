import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { FileDataInput, FileDeleteInput, FileInput } from '../input-dtos/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  apiName = 'Default';

  deleteFilesByDeleteInputs = (deleteInputs: FileDeleteInput[]) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/File/DeleteFiles',
      body: deleteInputs,
    },
    { apiName: this.apiName });

  deleteFromFileByInput = (input: FileDeleteInput) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/File/DeleteFromFile',
      body: input,
    },
    { apiName: this.apiName });

  fileDataInputTest = () =>
    this.restService.request<any, FileDataInput>({
      method: 'GET',
      url: '/api/File/FileDataInputTest',
    },
    { apiName: this.apiName });

  fileInputTest = () =>
    this.restService.request<any, FileInput>({
      method: 'GET',
      url: '/api/File/FileInputTest',
    },
    { apiName: this.apiName });

  fileUpload = () =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/File/Upload',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
