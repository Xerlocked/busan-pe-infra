import * as React from "react";
import { type JobPosting, type Enterprise } from "@/data/types";
import { ScheduleCard } from "./ScheduleCard";

interface TimelineProps {
  postings: JobPosting[];
  enterprises: Enterprise[];
}

export function Timeline({ postings, enterprises }: TimelineProps) {
  // Group postings by month
  const groupedPostings = React.useMemo(() => {
    const groups: Record<string, JobPosting[]> = {};
    
    postings.forEach(posting => {
      // Extract YYYY-MM
      const monthKey = posting.applicationStart.substring(0, 7);
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(posting);
    });

    // Sort groups chronologically
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [postings]);

  if (postings.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-xl">
        선택한 조건에 맞는 채용 일정이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {groupedPostings.map(([monthKey, monthPostings]) => {
        // Format YYYY-MM to "YYYY년 M월"
        const [year, month] = monthKey.split('-');
        const formattedMonth = `${year}년 ${parseInt(month)}월`;

        return (
          <div key={monthKey} className="relative">
            <div className="sticky top-16 z-10 bg-background/95 backdrop-blur py-2 mb-6 border-b border-border">
              <h2 className="text-xl font-bold flex items-center">
                {formattedMonth}
                <span className="ml-3 text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {monthPostings.length}건
                </span>
              </h2>
            </div>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {monthPostings.map((posting) => {
                const enterprise = enterprises.find(e => e.id === posting.enterpriseId);
                return (
                  <div key={posting.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Marker */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted text-muted-foreground group-[.is-active]:bg-primary group-[.is-active]:text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-current" />
                    </div>
                    
                    {/* Card Container */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-md hover:border-primary/50">
                      <ScheduleCard posting={posting} enterprise={enterprise} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
