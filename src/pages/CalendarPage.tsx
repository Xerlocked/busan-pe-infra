import * as React from "react";
import { jobPostings } from "@/data/jobPostings";
import { enterprises } from "@/data/enterprises";
import { Timeline } from "@/components/calendar/Timeline";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";

export function CalendarPage() {
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<string>>(new Set(["접수중", "예정"]));
  const [selectedCategories, setSelectedCategories] = React.useState<Set<string>>(new Set(["금융", "에너지·SOC", "혁신도시"]));

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const filteredPostings = React.useMemo(() => {
    return jobPostings.filter(posting => {
      // 1. 상태 필터 적용
      if (!selectedStatuses.has(posting.status)) return false;
      
      // 2. 카테고리 필터 적용
      const enterprise = enterprises.find(e => e.id === posting.enterpriseId);
      if (enterprise && !selectedCategories.has(enterprise.category)) return false;

      return true;
    });
  }, [selectedStatuses, selectedCategories]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          채용 캘린더
        </h1>
        <p className="text-lg text-muted-foreground">
          부울경 전산직 하반기 채용 일정.<br />
          원하는 기업과 상태를 필터링하여 일정을 관리하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar / Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-24 bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6 font-bold text-foreground pb-4 border-b border-border/50">
                <Filter className="w-4 h-4" />
                필터 옵션
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground">진행 상태</h3>
                  <div className="space-y-3">
                    {["접수중", "예정", "마감"].map(status => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`status-${status}`} 
                          checked={selectedStatuses.has(status)}
                          onCheckedChange={() => toggleStatus(status)}
                        />
                        <Label htmlFor={`status-${status}`} className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {status}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground">기업 구분</h3>
                  <div className="space-y-3">
                    {["금융", "에너지·SOC", "혁신도시"].map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`cat-${category}`} 
                          checked={selectedCategories.has(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={`cat-${category}`} className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content / Timeline */}
        <div className="lg:col-span-3">
          <Timeline postings={filteredPostings} enterprises={enterprises} />
        </div>
      </div>
    </div>
  );
}
