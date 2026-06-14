import * as React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              부울경 전산직 패스
            </h3>
            <p className="text-sm text-muted-foreground">
              게임 개발자에서 공기업 전산직까지, <br />
              부울경 IT 취업의 모든 것을 담았습니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">주요 메뉴</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/enterprise" className="hover:text-primary transition-colors">공기업 가이드</Link></li>
              <li><Link to="/calculator" className="hover:text-primary transition-colors">가산점 시뮬레이터</Link></li>
              <li><Link to="/cs-guide" className="hover:text-primary transition-colors">전산학 꿀팁</Link></li>
              <li><Link to="/calendar" className="hover:text-primary transition-colors">채용 캘린더</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">프로젝트 정보</h4>
            <p className="text-sm text-muted-foreground mb-2">
              본 웹사이트는 프로토타입이며, 제공되는 정보는 참고용입니다. 
              정확한 채용 정보는 각 기관의 공식 홈페이지를 확인하시기 바랍니다.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Made with ❤️ by 부울경 전산직 패스</p>
          <p className="mt-2">© 2026 BuGyeong-IT Pass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
