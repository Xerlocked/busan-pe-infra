import * as React from "react";
import { Calendar, Users, MapPin } from "lucide-react";
import { type JobPosting, type Enterprise } from "@/data/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScheduleCardProps {
  posting: JobPosting;
  enterprise?: Enterprise;
}

export function ScheduleCard({ posting, enterprise }: ScheduleCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "접수중": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "예정": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "마감": return "bg-muted text-muted-foreground border-border";
      default: return "";
    }
  };

  return (
    <Card className="hover:border-primary/50 transition-colors group bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="border-border bg-background">
                {enterprise?.category || "공기업"}
              </Badge>
              <Badge variant="outline" className={cn(getStatusColor(posting.status))}>
                {posting.status}
              </Badge>
              {posting.recruitType && (
                <Badge variant="secondary" className="bg-muted">
                  {posting.recruitType}
                </Badge>
              )}
            </div>
            
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {posting.title}
            </h3>
            <p className="text-sm font-medium text-foreground/80 mt-1">
              {enterprise?.name}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-foreground/50" />
                <span className={posting.status === "접수중" ? "font-bold text-foreground" : ""}>
                  {posting.applicationStart} ~ {posting.applicationEnd}
                </span>
              </div>
              {posting.examDate && (
                <div className="flex items-center">
                  <span className="w-4 h-4 flex items-center justify-center mr-2 text-xs font-bold bg-muted rounded-sm text-foreground/50">필</span>
                  {posting.examDate}
                </div>
              )}
              {posting.headcount !== undefined && (
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-foreground/50" />
                  {posting.headcount}명 채용
                </div>
              )}
              {enterprise?.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-foreground/50" />
                  {enterprise.location.split(' ')[0]} {/* 부산, 울산 등 주요 지역만 표시 */}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0 w-full md:w-32">
            {posting.url ? (
              <Button size="sm" asChild className="w-full">
                <a href={posting.url} target="_blank" rel="noreferrer">상세보기</a>
              </Button>
            ) : (
              <Button size="sm" variant="outline" disabled className="w-full">
                링크 없음
              </Button>
            )}
          </div>
        </div>
        
        {posting.notes && (
          <div className="mt-4 pt-3 border-t border-border/50 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground/70 mr-1">참고:</span> {posting.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
