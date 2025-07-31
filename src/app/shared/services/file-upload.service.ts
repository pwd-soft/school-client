import { environment } from './../../../environments/environment';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileDeleteInput } from '../model/upload-response';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = `${environment.apis.default.url}/api`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  redirectUrl: string;

  constructor(
    private http: HttpClient,
  ) {

  }

  fileUpload(formData: any) {
    return this.http.post(`${this.apiUrl}/FileUpload/Upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event)),
      catchError(err => {
        console.log(err.message);
        return of("From catchError");
     })
    );
  }

  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
      case HttpEventType.Response:
        return event.body;
      default:
        return `Upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event: any) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { progress: percentDone, files: [] };
  }

  deleteFromFile(input:FileDeleteInput): Observable<any> {
    const headers = { 'content-type': 'application/json'}
   // const body=JSON.stringify(filePath);
    //console.log(body)
    return this.http.post(`${this.apiUrl}/FileUpload/DeleteFromFile`, input,{'headers':headers})
  }

  deleteFiles(inputs:FileDeleteInput[]): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${this.apiUrl}/FileUpload/DeleteFiles`, inputs,{'headers':headers})
  }

    deleteFromFileByInput(input: FileDeleteInput): Observable<any> {
      const headers = { 'content-type': 'application/json'}
      return this.http.post(`${this.apiUrl}/FileUpload/DeleteFromFile`, input,{'headers':headers})
    }




  public download(fileUrl: string,fileName:string) {
    return this.http.get(`${this.apiUrl}/FileUpload/download?fileUrl=${fileUrl}&fileName=${fileName}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

//   deleteFilesByDeleteInputs = (deleteInputs: FileDeleteInput[]) =>
//     this.restService.request<any, IActionResult>({
//       method: 'POST',
//       url: '/api/FileUpload/DeleteFiles',
//       body: deleteInputs,
//     },
//     { apiName: this.apiName });

//   deleteFromFileByInput = (input: FileDeleteInput) =>
//     this.restService.request<any, IActionResult>({
//       method: 'POST',
//       url: '/api/FileUpload/DeleteFromFile',
//       body: input,
//     },
//     { apiName: this.apiName });
 }
