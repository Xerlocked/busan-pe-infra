import * as React from "react";
import { Info } from "lucide-react";
import { certificates } from "@/data/certificates";
import { type Certificate } from "@/data/types";
import { calculateCivilServiceBonus, calculatePublicCorpBonus } from "@/lib/calculator";
import { CertCheckbox } from "@/components/calculator/CertCheckbox";
import { ResultPanel } from "@/components/calculator/ResultPanel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Mode = "civilService" | "publicCorp";

export function CalculatorPage() {
  const [mode, setMode] = React.useState<Mode>("civilService");
  const [selectedCertIds, setSelectedCertIds] = React.useState<Set<string>>(new Set());

  // Group certificates by their group category
  const groupedCerts = React.useMemo(() => {
    const groups: Record<string, Certificate[]> = {};
    certificates.forEach(cert => {
      // 해당 모드에서 가산점이 없는 자격증은 제외
      if ((mode === "civilService" && cert.civilServiceBonus === 0) || 
          (mode === "publicCorp" && cert.publicCorpBonus === 0)) {
        return;
      }
      
      if (!groups[cert.group]) {
        groups[cert.group] = [];
      }
      groups[cert.group].push(cert);
    });
    return groups;
  }, [mode]);

  const handleToggleCert = (certId: string, checked: boolean) => {
    setSelectedCertIds(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(certId);
      } else {
        next.delete(certId);
      }
      return next;
    });
  };

  const selectedCerts = React.useMemo(() => 
    certificates.filter(c => selectedCertIds.has(c.id)),
    [selectedCertIds]
  );

  const result = React.useMemo(() => 
    mode === "civilService" 
      ? calculateCivilServiceBonus(selectedCerts)
      : calculatePublicCorpBonus(selectedCerts),
    [mode, selectedCerts]
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          가산점 시뮬레이터
        </h1>
        <p className="text-lg text-muted-foreground">
          복잡한 중복 적용 불가 원칙, 이제 자동으로 계산하세요.<br />
          자격증을 체크하면 최종 가산점을 실시간으로 확인하실 수 있습니다.
        </p>
      </div>

      <Tabs defaultValue="civilService" value={mode} onValueChange={(v) => setMode(v as Mode)} className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="civilService">공무원 모드 (최대 5%)</TabsTrigger>
            <TabsTrigger value="publicCorp">공기업 모드 (최대 3%)</TabsTrigger>
          </TabsList>
        </div>

        <Alert className="mb-8 bg-muted/50 border-border">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle className="text-foreground">적용 기준 안내</AlertTitle>
          <AlertDescription className="text-muted-foreground mt-2">
            {mode === "civilService" 
              ? "공무원 전산직: 자격증 그룹별로 가장 높은 가산점 1개만 인정되며, 모든 가산점의 합은 최대 5%를 초과할 수 없습니다."
              : "부산교통공사 등 공기업: 1인 1종(가장 높은 가산점 1개)만 인정되며, 최대 3%까지만 반영됩니다."
            }
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {Object.entries(groupedCerts).map(([groupName, certs]) => (
              <div key={groupName}>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <span className="w-1.5 h-6 bg-primary rounded mr-2"></span>
                  {groupName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certs.map(cert => {
                    const isChecked = selectedCertIds.has(cert.id);
                    const isExcluded = result.excludedCerts.some(e => e.cert.id === cert.id);
                    const excludeReason = result.excludedCerts.find(e => e.cert.id === cert.id)?.reason;
                    
                    return (
                      <CertCheckbox
                        key={cert.id}
                        cert={cert}
                        checked={isChecked}
                        onChange={(checked) => handleToggleCert(cert.id, checked)}
                        mode={mode}
                        excluded={isExcluded}
                        excludeReason={excludeReason}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <ResultPanel result={result} mode={mode} />
          </div>
        </div>
      </Tabs>
    </div>
  );
}
