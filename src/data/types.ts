// ═══════════════════════════════════════
// 1. 공기업 데이터 타입
// ═══════════════════════════════════════
export type EnterpriseCategory = "금융" | "에너지·SOC" | "혁신도시" | "기타";

export interface Enterprise {
  id: string;
  name: string;
  shortName: string;
  category: EnterpriseCategory;
  location: string;
  residencyRule: string;
  examSubjects: string[];
  jobCharacteristics: string[];
  certBonusNote?: string;
  website?: string;
  ministry?: string; // 주무부처
  orgType?: string;  // 기관유형
}

// ═══════════════════════════════════════
// 2. 채용 공고 데이터 타입
// ═══════════════════════════════════════
export type PostingStatus = "접수중" | "예정" | "마감";

export interface JobPosting {
  id: string;
  enterpriseId: string;
  title: string;
  recruitType: "신입" | "경력" | "무관";
  applicationStart: string;
  applicationEnd: string;
  examDate?: string;
  status: PostingStatus;
  headcount?: number;
  url?: string;
  notes?: string;
}

// ═══════════════════════════════════════
// 3. 자격증 & 가산점 데이터 타입
// ═══════════════════════════════════════
export type CertGroup = "IT자격증" | "어학" | "한국사" | "기타";

export interface Certificate {
  id: string;
  name: string;
  group: CertGroup;
  civilServiceBonus: number;
  publicCorpBonus: number;
}

// ═══════════════════════════════════════
// 4. 채용 일정 타입
// ═══════════════════════════════════════
export interface RecruitSchedule {
  id: string;
  enterpriseId: string;
  year: number;
  half: "상반기" | "하반기";
  estimatedMonth: number;
  confirmed: boolean;
  notes?: string;
}

// ═══════════════════════════════════════
// 5. CS 과목 가이드 타입
// ═══════════════════════════════════════
export interface CsSubject {
  id: string;
  name: string;
  icon: string;
  importance: number; // 1-100
  difficulty: number; // 1-100
  description: string;
  keyTopics: string[];
  studyTips: string[];
  cppConnection?: string;
}
