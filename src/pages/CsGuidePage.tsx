import * as React from "react";
import { csSubjects } from "@/data/csSubjects";
import { SubjectAccordion } from "@/components/cs-guide/SubjectAccordion";
import { Accordion } from "@/components/ui/accordion";
import { Code2 } from "lucide-react";

export function CsGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          전산학 필기 꿀팁
        </h1>
        <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          실무 개발자 시점에서 풀어낸 전공 필기 가이드
        </p>
        <p className="text-muted-foreground mt-4 text-sm">
          게임 엔진, 로우레벨 C++을 다루던 경험을 십분 활용하세요.<br />
          단순 암기가 아닌 원리 이해 중심의 학습 전략을 제안합니다.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={csSubjects[0]?.id}>
          {csSubjects.map((subject) => (
            <SubjectAccordion key={subject.id} subject={subject} />
          ))}
        </Accordion>
      </div>
    </div>
  );
}
