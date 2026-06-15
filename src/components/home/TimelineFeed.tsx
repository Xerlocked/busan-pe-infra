import * as React from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { fetchJobs, JobPostingDB } from "@/lib/api";
import { enterprises } from "@/data/enterprises";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TimelineFeed() {
  const [jobPostings, setJobPostings] = React.useState<JobPostingDB[]>([]);

  React.useEffect(() => {
    fetchJobs().then(setJobPostings).catch(console.error);
  }, []);

  const recentPostings = [...jobPostings]
    .sort((a, b) => new Date(b.RegistrationDate).getTime() - new Date(a.RegistrationDate).getTime())
    .slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "접수중": return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "예정": return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "마감": return "bg-muted text-muted-foreground";
      default: return "";
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-foreground">최근 채용 공고</h2>
            <p className="text-muted-foreground">부울경 공기업 전산직 채용 소식을 확인하세요.</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link to="/calendar">
              전체 보기 <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="relative border-l border-border pl-6 space-y-8 ml-3 md:ml-0 md:pl-8">
          {recentPostings.map((posting) => {
            const enterprise = enterprises.find(e => e.name === posting.InstitutionName || e.shortName === posting.InstitutionName);
            return (
              <div key={posting.NoticeID} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[31px] md:-left-[39px] top-4 w-4 h-4 rounded-full border-2 border-background bg-primary ring-2 ring-primary/20" />
                
                <Card className="hover:border-primary/50 transition-colors group">
                  <CardContent className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {enterprise?.shortName || posting.InstitutionName || "공기업"}
                        </span>
                        <Badge variant="outline" className={cn("border-0", getStatusColor(posting.Status))}>
                          {posting.Status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
                        {posting.Title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {posting.RegistrationDate} ~ {posting.ClosingDate}
                      </div>
                    </div>
                    {posting.OriginalPDFUrl && (
                      <Button variant="secondary" size="sm" asChild className="w-full md:w-auto shrink-0">
                        <a href={posting.OriginalPDFUrl} target="_blank" rel="noreferrer">
                          공고 보기
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 sm:hidden">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/calendar">전체 채용 일정 보기</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
