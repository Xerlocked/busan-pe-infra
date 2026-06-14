import * as React from "react";
import { Building2, Briefcase, Award, BookOpen } from "lucide-react";
import { enterprises } from "@/data/enterprises";
import { jobPostings } from "@/data/jobPostings";
import { certificates } from "@/data/certificates";
import { csSubjects } from "@/data/csSubjects";

export function QuickStats() {
  const stats = [
    { label: "수록 기업", value: enterprises.length, icon: Building2 },
    { label: "채용 공고", value: jobPostings.length, icon: Briefcase },
    { label: "자격증 DB", value: certificates.length, icon: Award },
    { label: "CS 과목 가이드", value: csSubjects?.length || 5, icon: BookOpen },
  ];

  return (
    <section className="py-12 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col items-center justify-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
