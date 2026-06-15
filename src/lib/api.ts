// ═══════════════════════════════════════
// API Client — PIA Admin Dashboard
// ═══════════════════════════════════════

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

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
      if (body.message) message = body.message;
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

export async function parsePdf(file: File): Promise<ParsedJobData> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/admin/parse-pdf`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  return handleResponse<ParsedJobData>(response);
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
