import { ToasterService } from '@abp/ng.theme.shared';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AttachmentDto } from 'src/app/proxy/dto-models';
import { AttachmentType } from 'src/app/proxy/enum';
import { FileDataInput } from 'src/app/proxy/input-dtos';
import { FileDeleteInput, UploadResponse } from 'src/app/shared/model/upload-response';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class  UploadDocumentComponent implements OnInit {

  // @Input() employeeId: number;
  // @Input() nId: string;

  @Input('attachments')
  set setUploadArray(attachmentList: AttachmentDto[]){
    if(attachmentList.length > 0)
      {
        this.upload.files = attachmentList;
      }
  }

  @Output() attachmentItemEvent = new EventEmitter<UploadResponse>();

  subs = new SubSink();
  cacheSVG = true;
  formGroup: FormGroup;
  isActive: boolean;

  formData:FormData;
  // attachments: AttachmentDto[] = [];
  fileUrl: string;
  originalFileName: string;
  progress: number;
  private apiUrl = `${environment.apis.default.url}/api`;
  upload: UploadResponse = new UploadResponse();
  imageUri: string = '';


  constructor(private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private spinnerService: NgxSpinnerService,
    // private fileService: FileService,
    // private documentService:DocumentService,
    private http: HttpClient) { }

    ngOnInit(): void {
      this.initializeForm();
    //   this.upload.files.push({
    //     "id": 0,
    //     "fileSize": 362967,
    //     "fileName": "56b5654e866e4ac1ba80c66b8e7be614_418968133_712821404387208_265003456904834794_n.jpg",
    //     "originalFileName": "418968133_712821404387208_265003456904834794_n.jpg",
    //     "path": "Temp_Uploads\\56b5654e866e4ac1ba80c66b8e7be614_418968133_712821404387208_265003456904834794_n.jpg",
    //     "isFileUploaded": true
    // });
    }

    initializeForm() {

      this.formGroup = this.fb.group({
        documentType: [''],
      });

    }

    onDragOver(event: any) {
      event.preventDefault();
      event.stopPropagation();
      this.isActive = true;
      //console.log('Drag over');
    }

    onDragLeave(event: any) {
      event.preventDefault();
      event.stopPropagation();
      this.isActive = false;
      //console.log('Drag leave');
    }

    onDrop(event: any) {
      event.preventDefault();
      event.stopPropagation();
      let droppedFiles = event.dataTransfer.files;
      if (droppedFiles.length > 0) {
        this.onDroppedFile(droppedFiles)
      }
      this.isActive = false;
    }

    onDroppedFile(droppedFiles: any) {
      this.formData = new FormData();
      // this.formData.append('directoryName', this.nId);
      for (let item of droppedFiles) {
        if (!this.validateFile(item.name)) {
          this.toasterService.warn(item.name + ' file format is not supported');
        }
        else if (item['size'] > 15000000) {
          this.toasterService.warn(item.name + " size shoud not be larger than 15MB")

        } else {
          let fileToUpload = item;
          this.formData.append('userfiles', fileToUpload);
          console.log(this.formData)
        }
      }
    }

    onUpload(){
      this.spinnerService.show();
      this.http.post(`${this.apiUrl}/File/Upload`, this.formData).subscribe(
        (result: UploadResponse) => {
          this.spinnerService.hide();
          for (let file of result['files']) {
            let attachmentData: AttachmentDto = {
              id: 0,
              // employeeId: this.employeeId,
              fileSize: file.fileSize,
              fileName: file.fileName,
              originalFileName: file.originalFileName,
              path: file.path,
              isFileUploaded: file.isFileUploaded,
              objectionId: 0,
              attachmentType: AttachmentType.None
            };
            this.upload.files.push(attachmentData);
            this.formData = undefined;
            this.outputItemEvent();
          }
          this.cdRef.detectChanges();
        },
        (error) => {
          this.spinnerService.hide();
          console.log(error);
        }
      )
    }

    outputItemEvent() {
      this.attachmentItemEvent.emit(this.upload);
    }

    onSelectedFile(event: any) {
      if (event.target.files.length > 0) {
        console.log(event.target.files);
        this.onDroppedFile(event.target.files);
      }
    }

    formatBytes(bytes, decimals) {
      if (bytes === 0) {
        return '0 Bytes';
      }
      const k = 1024;
      const dm = decimals <= 0 ? 0 : decimals || 2;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    validateFile(name: String) {
      var ext = name.substring(name.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'png' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'doc'
        || ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'xls' || ext.toLowerCase() == 'xlsx' || ext.toLowerCase() == 'csv' || ext.toLowerCase() == 'dwg'
        || ext.toLowerCase() == 'zip' || ext.toLowerCase() == 'rar' || ext.toLowerCase() == '7zip' || ext.toLowerCase() == 'psd') {
        return true;
      }
      else {
        return false;
      }
    }

    deleteFromFile(filePath: string, fileName: string) {
      let fileDeleteInput = new FileDeleteInput();
      fileDeleteInput.filePath = filePath;
      fileDeleteInput.fileName = fileName;

      this.http.post(`${this.apiUrl}/File/DeleteFromFile`, fileDeleteInput).subscribe(
        (result) => {
          console.log(result);
          const objectIndex = this.upload.files.findIndex((obj) => obj['fileName'] === fileName);

          if (objectIndex > -1) {
            this.upload.files.splice(objectIndex, 1);
            if (this.upload.files.length == 0)
              this.upload.files = [];
          }
          this.cdRef.detectChanges();
        }
      );
    }


    // remove(fileName: string, filePath: string) {

    //   let fileDeleteInput = new FileDeleteInput();
    //   fileDeleteInput.fileName = fileName;
    //   fileDeleteInput.filePath = filePath;
    //   this.fileService.deleteFromFileByInput(fileDeleteInput).subscribe(
    //     (result) => {

    //       // let attachmentDataInput: AttachmentDataDeleteInput = { employeeId: this.employeeId, documentName: fileName }
    //       // this.subs.sink = this.documentService.deleteAttachmentData(attachmentDataInput).subscribe(
    //       //   (response: boolean) => {
    //       //     const objectIndex = this.attachments.findIndex(
    //       //       (obj) => obj['fileName'] === fileName
    //       //     );
    //       //     if (objectIndex > -1) {
    //       //       this.attachments.splice(objectIndex, 1);
    //       //       if (this.attachments.length == 0)
    //       //         this.attachments = [];
    //       //     }

    //       //     this.cdRef.detectChanges();
    //       //   },
    //       //   (error) => {
    //       //     this.toasterService.error('Error while removing');
    //       //   }
    //       // );
    //     }
    //   )
    // }


    // download = (fileUrl, originalFileName) => {
    //   this.fileUrl = fileUrl;
    //   this.originalFileName = originalFileName;
    //   this.fileService.download(fileUrl,originalFileName).subscribe((event) => {
    //     if (event.type === HttpEventType.UploadProgress)
    //       this.progress = Math.round((100 * event.loaded) / event.total);
    //     else if (event.type === HttpEventType.Response) {
    //       //this.message = 'Download success.';
    //       this.downloadFile(event);
    //     }
    //   });
    // }

    // private downloadFile = (data: HttpResponse<Blob>) => {
    //   const downloadedFile = new Blob([data.body], { type: data.body.type });
    //   const a = document.createElement('a');
    //   a.setAttribute('style', 'display:none;');
    //   document.body.appendChild(a);
    //   a.download = this.originalFileName;
    //   a.href = URL.createObjectURL(downloadedFile);
    //   a.target = '_blank';
    //   a.click();
    //   document.body.removeChild(a);
    // }

}
