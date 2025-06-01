export interface CvStatusResponse {
  success: boolean;
  exists: boolean;
  data?: CvFileData;
  message?: string;
}

export interface CvFileData {
  size: number;
  lastModified: string;
  sizeFormatted: string;
}

export interface ApiError {
  success: boolean;
  error: string;
  details?: string;
}

export interface DownloadOptions {
  filename: string;
  showConfirmation?: boolean;
  showProgress?: boolean;
}
