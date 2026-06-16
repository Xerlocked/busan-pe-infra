// ═══════════════════════════════════════
// API Client — PIA Admin Dashboard
// ═══════════════════════════════════════

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const PARSE_PDF_URL = import.meta.env.VITE_PARSE_PDF_URL || `${API_BASE_URL}/api/admin/parse-pdf`;

// ═══════════════════════════════════════
// TypeScript Interfaces
// ═══════════════════════════════════════

export interface JobPostingDB {
  NoticeID: string;
  InstitutionName: string;
  Title: string;
  IsIntern: boolean;
  RecruitType: string;
  RegistrationDate: string;
  ClosingDate: string;
  ExamDate?: string;
  Status: '접수중' | '예정' | '마감';
  Headcount?: number;
  Requirements?: {
    Age?: string;
    Residence?: string;
    Certificates?: string[];
  };
  OriginalPDFUrl?: string;
  Notes?: string;
  CreatedAt?: string;
}

export interface ParsedJobData {
  parsedData: Partial<JobPostingDB>;
  rawText: string;
  confidence: number;
}

// ═══════════════════════════════════════
// Token Management
// ═══════════════════════════════════════

const TOKEN_KEY = 'pia_admin_token';

export function getAdminToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAdminToken();
}

// ═══════════════════════════════════════
// Internal Helpers
// ═══════════════════════════════════════

function authHeaders(): Record<string, string> {
  const token = getAdminToken();
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `API 오류: ${response.status}`;
    try {
      const body = await response.json();
      if (body.error) message = body.error;
      else if (body.message) message = body.message;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

// ═══════════════════════════════════════
// Public API — Job Postings
// ═══════════════════════════════════════

export async function fetchJobs(): Promise<JobPostingDB[]> {
  const response = await fetch(`${API_BASE_URL}/api/jobs`);
  return handleResponse<JobPostingDB[]>(response);
}

export async function fetchJob(id: string): Promise<JobPostingDB> {
  const response = await fetch(`${API_BASE_URL}/api/jobs/${encodeURIComponent(id)}`);
  return handleResponse<JobPostingDB>(response);
}

// ═══════════════════════════════════════
// Admin API — Requires Authentication
// ═══════════════════════════════════════

export async function parsePdf(file: File, onProgress?: (status: string, percentage: number) => void): Promise<ParsedJobData> {
  // 1. Get Presigned URL
  onProgress?.('업로드 주소 요청 중...', 10);
  const uploadUrlResponse = await fetch(`${API_BASE_URL}/api/admin/upload-url`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filename: file.name }),
  });
  
  const uploadData = await handleResponse<{uploadUrl: string, s3Key: string}>(uploadUrlResponse);
  
  // 2. Upload directly to S3
  onProgress?.('S3에 파일 업로드 중...', 30);
  const s3Response = await fetch(uploadData.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/pdf',
    },
    body: file,
  });

  if (!s3Response.ok) {
    throw new Error('S3 파일 업로드에 실패했습니다.');
  }

  // 3. Call parse-pdf with S3 Key
  onProgress?.('AI가 문서를 분석 중입니다 (최대 15쪽)...', 60);
  const response = await fetch(`${PARSE_PDF_URL}?upload=true`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ s3Key: uploadData.s3Key }),
  });

  const result = await handleResponse<ParsedJobData>(response);
  onProgress?.('분석 완료!', 100);
  return result;
}

export async function createJob(data: JobPostingDB): Promise<JobPostingDB> {
  const response = await fetch(`${API_BASE_URL}/api/admin/jobs`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse<JobPostingDB>(response);
}

export async function updateJob(id: string, data: Partial<JobPostingDB>): Promise<JobPostingDB> {
  const response = await fetch(`${API_BASE_URL}/api/admin/jobs/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse<JobPostingDB>(response);
}

export async function deleteJob(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/admin/jobs/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  if (!response.ok) {
    let message = `삭제 실패: ${response.status}`;
    try {
      const body = await response.json();
      if (body.message) message = body.message;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }
}
