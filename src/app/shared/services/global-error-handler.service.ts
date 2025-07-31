import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor() {}

  handleError(error: Error | HttpErrorResponse) {
    // need to implement custom logic heress
    console.log(error);
  }
}
