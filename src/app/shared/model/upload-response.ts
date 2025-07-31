import { AttachmentDto } from "src/app/proxy/dto-models";


export class UploadResponse {
    progress: number;
    files: AttachmentDto[] = [];
}

export class FileDeleteInput{
    filePath:string;
    fileName:string;
}
