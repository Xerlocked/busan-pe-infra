import type { Certificate } from "@/data/types";

// ═══════════════════════════════════════
// 결과 타입 정의
// ═══════════════════════════════════════
export interface AppliedCert {
  cert: Certificate;
  bonus: number;
}

export interface ExcludedCert {
  cert: Certificate;
  reason: string;
}

export interface CalculationResult {
  /** 최종 가산점 (%) */
  totalBonus: number;
  /** 실제 적용된 자격증 목록 */
  appliedCerts: AppliedCert[];
  /** 제외된 자격증 목록 + 사유 */
  excludedCerts: ExcludedCert[];
}

// ═══════════════════════════════════════
// 공무원 모드
// 동일 그룹 내 최상위 1개만 적용
// 전체 합산 최대 5%
// ═══════════════════════════════════════
export function calculateCivilServiceBonus(
  selectedCerts: Certificate[],
): CalculationResult {
  const applied: AppliedCert[] = [];
  const excluded: ExcludedCert[] = [];

  // 그룹별로 분류
  const groups = new Map<string, Certificate[]>();
  for (const cert of selectedCerts) {
    const group = groups.get(cert.group) ?? [];
    group.push(cert);
    groups.set(cert.group, group);
  }

  // 각 그룹에서 civilServiceBonus가 가장 높은 1개만 선택
  for (const [groupName, certs] of groups) {
    // 가산점 내림차순 정렬
    const sorted = [...certs].sort(
      (a, b) => b.civilServiceBonus - a.civilServiceBonus,
    );

    const top = sorted[0];

    if (top.civilServiceBonus > 0) {
      applied.push({ cert: top, bonus: top.civilServiceBonus });
    } else {
      excluded.push({
        cert: top,
        reason: `공무원 가산점이 0%이므로 적용 불가`,
      });
    }

    // 나머지는 제외
    for (let i = 1; i < sorted.length; i++) {
      excluded.push({
        cert: sorted[i],
        reason: `${groupName} 그룹 내 상위 자격증(${top.name}) 적용으로 제외`,
      });
    }
  }

  // 합산 (내림차순 정렬하여 가장 큰 것부터 적용)
  applied.sort((a, b) => b.bonus - a.bonus);

  const CAP = 5;
  let totalBonus = 0;
  const finalApplied: AppliedCert[] = [];
  const finalExcluded: ExcludedCert[] = [...excluded];

  for (const item of applied) {
    if (totalBonus + item.bonus <= CAP) {
      totalBonus += item.bonus;
      finalApplied.push(item);
    } else if (totalBonus < CAP) {
      // 부분 적용: 남은 한도만큼만
      const remaining = CAP - totalBonus;
      totalBonus = CAP;
      finalApplied.push({ cert: item.cert, bonus: remaining });
    } else {
      finalExcluded.push({
        cert: item.cert,
        reason: `가산점 상한(${CAP}%) 초과로 적용 불가`,
      });
    }
  }

  return {
    totalBonus,
    appliedCerts: finalApplied,
    excludedCerts: finalExcluded,
  };
}

// ═══════════════════════════════════════
// 공기업 모드
// 1인 1종: 가장 높은 publicCorpBonus 자격증 1개만
// 최대 3%
// ═══════════════════════════════════════
export function calculatePublicCorpBonus(
  selectedCerts: Certificate[],
): CalculationResult {
  const applied: AppliedCert[] = [];
  const excluded: ExcludedCert[] = [];

  if (selectedCerts.length === 0) {
    return { totalBonus: 0, appliedCerts: [], excludedCerts: [] };
  }

  // publicCorpBonus 기준 내림차순 정렬
  const sorted = [...selectedCerts].sort(
    (a, b) => b.publicCorpBonus - a.publicCorpBonus,
  );

  const top = sorted[0];
  const CAP = 3;

  if (top.publicCorpBonus > 0) {
    const bonus = Math.min(top.publicCorpBonus, CAP);
    applied.push({ cert: top, bonus });
  } else {
    excluded.push({
      cert: top,
      reason: "공기업 가산점이 0%이므로 적용 불가",
    });
  }

  // 나머지는 모두 제외
  for (let i = 1; i < sorted.length; i++) {
    if (top.publicCorpBonus > 0) {
      excluded.push({
        cert: sorted[i],
        reason: `1인 1종 규정으로 상위 자격증(${top.name}) 적용, 나머지 제외`,
      });
    } else {
      excluded.push({
        cert: sorted[i],
        reason: "공기업 가산점이 0%이므로 적용 불가",
      });
    }
  }

  const totalBonus = applied.reduce((sum, item) => sum + item.bonus, 0);

  return {
    totalBonus,
    appliedCerts: applied,
    excludedCerts: excluded,
  };
}
