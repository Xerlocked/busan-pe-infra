import * as React from "react";
import { Info } from "lucide-react";
import { type Certificate } from "@/data/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CertCheckboxProps {
  cert: Certificate;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  excluded?: boolean;
  excludeReason?: string;
  mode: "civilService" | "publicCorp";
}

export function CertCheckbox({ 
  cert, 
  checked, 
  onChange, 
  disabled, 
  excluded, 
  excludeReason,
  mode
}: CertCheckboxProps) {
  const bonus = mode === "civilService" ? cert.civilServiceBonus : cert.publicCorpBonus;
  
  if (bonus === 0) return null; // 해당 모드에서 가산점이 없는 자격증은 표시하지 않음

  return (
    <div 
      className={cn(
        "flex items-start space-x-3 p-4 rounded-lg border transition-all duration-200",
        checked ? "bg-primary/5 border-primary/30" : "bg-card border-border hover:border-border/80",
        disabled && !checked ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        excluded && checked ? "bg-destructive/5 border-destructive/30" : ""
      )}
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
    >
      <Checkbox 
        id={cert.id} 
        checked={checked} 
        onCheckedChange={(c) => onChange(c as boolean)}
        disabled={disabled}
        className={cn("mt-1", excluded && checked ? "data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground border-destructive/50" : "")}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="grid gap-1.5 leading-none flex-1">
        <Label 
          htmlFor={cert.id} 
          className={cn(
            "font-medium flex items-center cursor-pointer",
            excluded && checked ? "text-destructive line-through opacity-70" : "text-foreground"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {cert.name}
          {excluded && checked && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 ml-2 text-destructive inline-block cursor-help no-underline" />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">{excludeReason}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </Label>
        <p className="text-sm text-muted-foreground">
          가산점 {bonus}%
        </p>
      </div>
    </div>
  );
}
