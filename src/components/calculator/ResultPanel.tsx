import * as React from "react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// CalculateResult type inline to avoid importing from lib if it's not exported properly yet
interface CalculationResult {
  totalBonus: number;
  appliedCerts: { cert: any; bonus: number }[];
  excludedCerts: { cert: any; reason: string }[];
}

interface ResultPanelProps {
  result: CalculationResult;
  mode: "civilService" | "publicCorp";
}

export function ResultPanel({ result, mode }: ResultPanelProps) {
  const maxBonus = mode === "civilService" ? 5 : 3;
  const progressPercentage = Math.min((result.totalBonus / maxBonus) * 100, 100);

  return (
    <Card className="sticky top-24 border-primary/20 bg-card/50 backdrop-blur-xl shadow-2xl">
      <CardHeader className="bg-muted/30 border-b pb-6">
        <CardTitle className="text-center text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
          예상 최종 가산점
        </CardTitle>
        <div className="text-center">
          <span className="text-6xl font-extrabold bg-gradient-to-br from-primary to-blue-400 bg-clip-text text-transparent">
            {result.totalBonus.toFixed(1)}
          </span>
          <span className="text-2xl font-bold text-muted-foreground ml-1">%</span>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>최대 {maxBonus}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {result.appliedCerts.length === 0 && result.excludedCerts.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            보유하신 자격증을 왼쪽에서 선택해주세요.
          </div>
        ) : (
          <>
            {result.appliedCerts.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  적용된 자격증 ({result.appliedCerts.length})
                </h4>
                <ul className="space-y-2">
                  {result.appliedCerts.map((item) => (
                    <li key={item.cert.id} className="flex justify-between text-sm items-center bg-green-500/5 p-2 rounded border border-green-500/10">
                      <span className="text-foreground/90 font-medium">{item.cert.name}</span>
                      <span className="font-bold text-green-500">+{item.bonus}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.excludedCerts.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center">
                  <XCircle className="w-4 h-4 mr-2 text-destructive" />
                  제외된 자격증 ({result.excludedCerts.length})
                </h4>
                <ul className="space-y-2">
                  {result.excludedCerts.map((item) => (
                    <li key={item.cert.id} className="text-sm bg-destructive/5 p-2 rounded border border-destructive/10">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-foreground/80 line-through decoration-destructive/50">{item.cert.name}</span>
                        <span className="text-destructive font-medium text-xs">적용 불가</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-2 border-l-2 border-destructive/30">{item.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {result.totalBonus >= maxBonus && (
          <Alert className="bg-primary/10 border-primary/30 mt-4">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary text-sm font-bold">최대 상한선 도달</AlertTitle>
            <AlertDescription className="text-xs text-primary/80">
              해당 모드의 가산점 상한선({maxBonus}%)에 도달했습니다. 추가 자격증을 취득해도 더 이상 가산점이 오르지 않습니다.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
