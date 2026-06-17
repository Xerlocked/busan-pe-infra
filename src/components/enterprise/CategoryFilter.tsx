import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = ["전체", "금융", "에너지·SOC", "혁신도시", "기타"];

  return (
    <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
      <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full min-w-max">
        <TabsList className="h-12 bg-muted/50 p-1">
          {categories.map((cat) => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="px-6 py-2.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md transition-all"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
