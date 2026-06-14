import * as React from "react";
import { MapPin, ExternalLink, ShieldAlert, CheckCircle2 } from "lucide-react";
import { type Enterprise } from "@/data/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function EnterpriseCard({ enterprise }: { enterprise: Enterprise }) {
  const isRestrictiveResidency = enterprise.residencyRule.includes("거주") || enterprise.residencyRule.includes("지역인재");

  return (
    <Card className="flex flex-col h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 group bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={enterprise.category === "금융" ? "default" : enterprise.category === "에너지·SOC" ? "secondary" : "outline"} className="mb-2">
            {enterprise.category}
          </Badge>
          <span className="text-sm font-bold text-muted-foreground">{enterprise.shortName}</span>
        </div>
        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{enterprise.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <MapPin className="w-4 h-4 mr-1 shrink-0" />
          <span className="truncate">{enterprise.location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-4 space-y-4">
        {isRestrictiveResidency ? (
          <Alert variant="default" className="bg-primary/5 border-primary/20 py-2">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <AlertDescription className="text-xs text-primary font-medium ml-2">
              {enterprise.residencyRule}
            </AlertDescription>
          </Alert>
        ) : (
          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1.5 text-green-500" />
            {enterprise.residencyRule}
          </div>
        )}

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">필기 과목</h4>
          <div className="flex flex-wrap gap-1.5">
            {enterprise.examSubjects.map(subject => (
              <Badge key={subject} variant="outline" className="text-xs font-normal border-border bg-background">
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">직무 특징</h4>
          <ul className="text-sm space-y-1">
            {enterprise.jobCharacteristics.map((char, i) => (
              <li key={i} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-foreground/80">{char}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-border flex flex-col items-start gap-4">
        {enterprise.certBonusNote && (
          <div className="text-xs text-muted-foreground w-full bg-muted/30 p-2 rounded">
            <strong className="text-foreground">가산점:</strong> {enterprise.certBonusNote}
          </div>
        )}
        {enterprise.website && (
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-foreground" asChild>
            <a href={enterprise.website} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              채용 홈페이지
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
