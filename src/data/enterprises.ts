import type { Enterprise } from "./types";

export const enterprises: Enterprise[] = [
  // ═══════════════════════════════════════
  // 금융 공기업 (BIFC 라인)
  // ═══════════════════════════════════════
  {
    id: "hug",
    name: "주택도시보증공사",
    shortName: "HUG",
    category: "금융",
    location: "부산 남구 BIFC",
    residencyRule: "제한 없음 (전국 단위 채용)",
    examSubjects: ["전산학개론", "데이터베이스", "정보보호론"],
    jobCharacteristics: [
      "보증 심사 시스템 개발/운영",
      "대규모 금융 데이터 처리",
      "차세대 시스템 전환 프로젝트",
    ],
    certBonusNote: "정보처리기사 3%, 정보보안기사 3% (중복 불가)",
    website: "https://www.khug.or.kr",
  },
  {
    id: "camco",
    name: "한국자산관리공사",
    shortName: "캠코",
    category: "금융",
    location: "부산 남구 BIFC",
    residencyRule: "제한 없음 (전국 단위 채용)",
    examSubjects: ["경영학", "경제학", "법학", "회계학"],
    jobCharacteristics: [
      "국유재산 관리 시스템",
      "온비드(공매) 플랫폼 운영",
      "빅데이터 분석 기반 자산 평가",
    ],
    certBonusNote: "직무 관련 자격증 가점 부여",
    website: "https://www.kamco.or.kr",
  },
  {
    id: "ksd",
    name: "한국예탁결제원",
    shortName: "예탁원",
    category: "금융",
    location: "부산 남구 BIFC",
    residencyRule: "제한 없음 (전국 단위 채용)",
    examSubjects: ["전산학개론", "데이터베이스"],
    jobCharacteristics: [
      "증권 예탁/결제 시스템 개발",
      "전자증권 인프라 운영",
      "금융 보안 및 개인정보보호",
    ],
    certBonusNote: "정보처리기사, SQLD 등 가점",
    website: "https://www.ksd.or.kr",
  },
  {
    id: "kibo",
    name: "기술보증기금",
    shortName: "기보",
    category: "금융",
    location: "부산 남구 BIFC",
    residencyRule: "제한 없음 (전국 단위 채용)",
    examSubjects: ["NCS 직업기초능력", "직무수행능력"],
    jobCharacteristics: [
      "기술평가 시스템 개발",
      "보증 심사 자동화 플랫폼",
      "AI 기반 기술 가치 평가",
    ],
    certBonusNote: "정보처리기사 등 국가기술자격 가점",
    website: "https://www.kibo.or.kr",
  },

  // ═══════════════════════════════════════
  // 에너지·SOC 공기업
  // ═══════════════════════════════════════
  {
    id: "bisco",
    name: "부산교통공사",
    shortName: "부교공",
    category: "에너지·SOC",
    location: "부산 동래구",
    residencyRule:
      "당해 연도 1.1 이전부터 부울경 거주 또는 과거 합산 3년 이상",
    examSubjects: ["전산일반"],
    jobCharacteristics: [
      "도시철도 통합관제 시스템",
      "교통카드/정산 시스템 운영",
      "역사 내 CCTV 및 IoT 인프라 관리",
    ],
    certBonusNote: "1인 1종 인정, 최대 3%",
    website: "https://www.humetro.busan.kr",
  },
  {
    id: "kospo",
    name: "한국남부발전",
    shortName: "남부발전",
    category: "에너지·SOC",
    location: "부산 강서구",
    residencyRule: "비수도권 지역인재 30% 의무채용",
    examSubjects: ["전기이론", "전산학개론"],
    jobCharacteristics: [
      "발전소 제어 시스템(DCS/SCADA)",
      "C++ 기반 로우레벨 모션 제어",
      "스마트 그리드 연계 시스템",
    ],
    certBonusNote: "전기기사, 정보처리기사 등 가점",
    website: "https://www.kospo.co.kr",
  },
  {
    id: "kdn",
    name: "한전KDN",
    shortName: "한전KDN",
    category: "에너지·SOC",
    location: "나주 혁신도시 (부울경 거점 有)",
    residencyRule: "비수도권 지역인재 의무채용",
    examSubjects: ["전산학개론", "프로그래밍"],
    jobCharacteristics: [
      "전력거래 시스템 개발",
      "AMI(스마트미터) 인프라",
      "에너지 빅데이터 플랫폼",
    ],
    certBonusNote: "정보처리기사, 정보보안기사 가점",
    website: "https://www.kdn.com",
  },

  // ═══════════════════════════════════════
  // 혁신도시 라인
  // ═══════════════════════════════════════
  {
    id: "comwel",
    name: "근로복지공단",
    shortName: "근복공",
    category: "혁신도시",
    location: "울산 중구",
    residencyRule: "비수도권 지역인재 30% 의무채용",
    examSubjects: ["NCS 직업기초능력", "직무수행능력"],
    jobCharacteristics: [
      "산재보험 통합 관리 시스템",
      "대규모 데이터 처리 및 인프라 보안",
      "전자정부 프레임워크 기반 개발",
    ],
    certBonusNote: "정보처리기사 등 직무 자격증 가점",
    website: "https://www.comwel.or.kr",
  },
  {
    id: "hira",
    name: "건강보험심사평가원",
    shortName: "심평원",
    category: "혁신도시",
    location: "원주 (부울경 인접)",
    residencyRule: "비수도권 지역인재 의무채용",
    examSubjects: ["전산학개론", "데이터베이스", "정보보호론"],
    jobCharacteristics: [
      "건강보험 빅데이터 분석 플랫폼",
      "의료정보 보안 체계 구축",
      "DW/DM 기반 통계 시스템",
    ],
    certBonusNote: "정보처리기사, 정보보안기사 가점",
    website: "https://www.hira.or.kr",
  },
  {
    id: "lh",
    name: "한국토지주택공사",
    shortName: "LH",
    category: "혁신도시",
    location: "진주 혁신도시",
    residencyRule: "비수도권 지역인재 30% 의무채용",
    examSubjects: ["NCS 직업기초능력", "직무수행능력"],
    jobCharacteristics: [
      "스마트시티 플랫폼 개발",
      "GIS 기반 토지/주택 정보 시스템",
      "전사적자원관리(ERP) 운영",
    ],
    certBonusNote: "정보처리기사 등 국가자격 가점",
    website: "https://www.lh.or.kr",
  },
  // 🆕 새 기업을 추가하려면 위 블록을 복사해서 아래에 붙여넣고 값만 수정하세요!
];
