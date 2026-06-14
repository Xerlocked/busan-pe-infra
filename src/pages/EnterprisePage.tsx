import * as React from "react";
import { enterprises } from "@/data/enterprises";
import { EnterpriseCard } from "@/components/enterprise/EnterpriseCard";
import { CategoryFilter } from "@/components/enterprise/CategoryFilter";

export function EnterprisePage() {
  const [activeCategory, setActiveCategory] = React.useState("전체");

  const filteredEnterprises = React.useMemo(() => {
    if (activeCategory === "전체") return enterprises;
    return enterprises.filter(e => e.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          부울경 공기업 가이드
        </h1>
        <p className="text-lg text-muted-foreground">
          BIFC 금융 공기업부터 에너지·SOC, 혁신도시까지.<br />
          전산직 채용의 특징과 준비 전략을 한눈에 파악하세요.
        </p>
      </div>

      <div className="mb-8">
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
        {filteredEnterprises.map((enterprise) => (
          <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
        ))}
      </div>
      
      {filteredEnterprises.length === 0 && (
        <div className="text-center py-20 text-muted-foreground border border-dashed rounded-xl">
          해당 카테고리의 기업 정보가 없습니다.
        </div>
      )}
    </div>
  );
}
