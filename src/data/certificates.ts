import type { Certificate } from "./types";

export const certificates: Certificate[] = [
  // ═══════════════════════════════════════
  // IT 자격증
  // ═══════════════════════════════════════
  {
    id: "engineer-info",
    name: "정보처리기사",
    group: "IT자격증",
    civilServiceBonus: 5,
    publicCorpBonus: 3,
  },
  {
    id: "engineer-sec",
    name: "정보보안기사",
    group: "IT자격증",
    civilServiceBonus: 5,
    publicCorpBonus: 3,
  },
  {
    id: "comutil-1",
    name: "컴퓨터활용능력 1급",
    group: "IT자격증",
    civilServiceBonus: 3,
    publicCorpBonus: 1.5,
  },
  {
    id: "comutil-2",
    name: "컴퓨터활용능력 2급",
    group: "IT자격증",
    civilServiceBonus: 1,
    publicCorpBonus: 0.5,
  },
  {
    id: "sqld",
    name: "SQLD",
    group: "IT자격증",
    civilServiceBonus: 0,
    publicCorpBonus: 1,
  },
  {
    id: "linux-master-1",
    name: "리눅스마스터 1급",
    group: "IT자격증",
    civilServiceBonus: 3,
    publicCorpBonus: 1.5,
  },
  {
    id: "network-admin-2",
    name: "네트워크관리사 2급",
    group: "IT자격증",
    civilServiceBonus: 0,
    publicCorpBonus: 1,
  },

  // ═══════════════════════════════════════
  // 한국사
  // ═══════════════════════════════════════
  {
    id: "history-1",
    name: "한국사능력검정 1급",
    group: "한국사",
    civilServiceBonus: 5,
    publicCorpBonus: 0,
  },
  {
    id: "history-2",
    name: "한국사능력검정 2급",
    group: "한국사",
    civilServiceBonus: 3,
    publicCorpBonus: 0,
  },

  // ═══════════════════════════════════════
  // 어학
  // ═══════════════════════════════════════
  {
    id: "toeic-900",
    name: "TOEIC 900점 이상",
    group: "어학",
    civilServiceBonus: 0,
    publicCorpBonus: 2,
  },
  {
    id: "toeic-800",
    name: "TOEIC 800~899점",
    group: "어학",
    civilServiceBonus: 0,
    publicCorpBonus: 1,
  },
  // 🆕 새 자격증을 추가하려면 위 블록을 복사해서 아래에 붙여넣고 값만 수정하세요!
];
