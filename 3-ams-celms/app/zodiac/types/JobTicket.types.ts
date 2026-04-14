export type JobStatus =
  | "PENDING"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "CANCELLED";

export interface JobTicket {
  id: string;
  clientName: string;
  serviceId: string;
  dimensions?: { w: number; h: number };
  quantity: number;
  totalEstimate: number;
  assignedStaffId?: string;
  status: JobStatus;
  startTime?: number; // Timestamp for timer
  endTime?: number;
}

export interface JobFileVersion {
  versionId: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string; // Staff or Client ID
  timestamp: number;
  changeLog: string; // e.g., "Updated logo to high-res"
  status: "DRAFT" | "PENDING_APPROVAL" | "PRINT_READY"; // Feature 1.5.1
}

export interface JobFilesContainer {
  jobId: string;
  currentActiveVersionId: string;
  versions: JobFileVersion[];
}
