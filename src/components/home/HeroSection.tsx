import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-background to-background z-0"></div>
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] z-0"></div>
      <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px] z-0"></div>

      <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          2026년 부울경 전산직 채용 가이드
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          게임 개발자에서 <br className="md:hidden" />
          <span className="bg-gradient-to-r from-blue-400 via-primary to-indigo-400 bg-clip-text text-transparent">
            공기업 전산직
          </span>
          까지
        </h1>

        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          부울경 IT 취업의 모든 것. <br className="md:hidden" />
          파편화된 채용 정보와 복잡한 가산점 계산을 한 번에 해결하세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto gap-2 group">
            <Link to="/calculator">
              <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              가산점 시뮬레이터
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto gap-2 group border-primary/30 hover:bg-primary/10">
            <Link to="/enterprise">
              기업 가이드 보기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
