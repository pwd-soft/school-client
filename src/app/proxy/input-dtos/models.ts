import type { SummaryReportType } from '../enum/summary-report-type.enum';
import type { SummaryReportSubType } from '../enum/summary-report-sub-type.enum';

export interface FileDataInput {
  id: number;
  fileName?: string;
  originalFileName?: string;
  path?: string;
  fileSize: number;
  isFileUploaded: boolean;
}

export interface FileDeleteInput {
  filePath?: string;
  fileName?: string;
}

export interface FileInput {
  fileName?: string;
  originalFileName?: string;
  path?: string;
  fileSize: number;
  uploadDate?: string;
  isFileUploaded: boolean;
}

export interface SummaryReportInputDto {
  type: SummaryReportType;
  subType: SummaryReportSubType;
  offices: string[];
}
