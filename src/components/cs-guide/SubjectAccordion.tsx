import * as React from "react";
import { type CsSubject } from "@/data/types";
import { Code2, Target, Lightbulb } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function SubjectAccordion({ subject }: { subject: CsSubject }) {
  return (
    <AccordionItem value={subject.id} className="border border-border/50 bg-card/30 backdrop-blur-sm rounded-xl px-2 md:px-6 mb-4 data-[state=open]:border-primary/50 data-[state=open]:bg-card/50 transition-all">
      <AccordionTrigger className="hover:no-underline py-4 md:py-6 group">
        <div className="flex items-center text-left w-full">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mr-4 shrink-0 group-hover:scale-110 transition-transform">
            {subject.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground truncate group-hover:text-primary transition-colors">{subject.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1 mt-1 hidden sm:block">{subject.description}</p>
          </div>
          <div className="hidden lg:flex items-center space-x-6 mr-8 shrink-0">
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground font-medium mb-1">중요도</span>
              <div className="flex items-center w-24">
                <Progress value={subject.importance} className="h-1.5 [&>div]:bg-blue-500" />
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground font-medium mb-1">난이도</span>
              <div className="flex items-center w-24">
                <Progress value={subject.difficulty} className="h-1.5 [&>div]:bg-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      
      <AccordionContent className="pb-6 pt-2">
        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            <div className="sm:hidden space-y-4 mb-6">
              <div className="bg-muted/30 p-3 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">중요도</span>
                  <span className="text-xs font-bold text-blue-500">{subject.importance}%</span>
                </div>
                <Progress value={subject.importance} className="h-1.5 [&>div]:bg-blue-500" />
                <div className="flex justify-between items-center mt-3 mb-2">
                  <span className="text-sm font-medium">난이도</span>
                  <span className="text-xs font-bold text-orange-500">{subject.difficulty}%</span>
                </div>
                <Progress value={subject.difficulty} className="h-1.5 [&>div]:bg-orange-500" />
              </div>
              <p className="text-sm text-foreground/80">{subject.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground flex items-center mb-3">
                <Target className="w-4 h-4 mr-2 text-primary" />
                핵심 키워드
              </h4>
              <div className="flex flex-wrap gap-2">
                {subject.keyTopics.map((topic, i) => (
                  <Badge key={i} variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 border-primary/20">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {subject.cppConnection && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="text-sm font-bold text-primary flex items-center mb-2">
                  <Code2 className="w-4 h-4 mr-2" />
                  C++ 개발자 시점 연계 포인트
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {subject.cppConnection}
                </p>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground flex items-center mb-3">
              <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
              학습 전략
            </h4>
            <ul className="space-y-3">
              {subject.studyTips.map((tip, i) => (
                <li key={i} className="flex text-sm text-muted-foreground">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold mr-2 text-foreground">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
