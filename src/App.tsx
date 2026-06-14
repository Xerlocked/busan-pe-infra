import * as React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { EnterprisePage } from '@/pages/EnterprisePage';
import { CalculatorPage } from '@/pages/CalculatorPage';
import { CsGuidePage } from '@/pages/CsGuidePage';
import { CalendarPage } from '@/pages/CalendarPage';
import { TooltipProvider } from '@/components/ui/tooltip';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <TooltipProvider delayDuration={300}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/enterprise" element={<EnterprisePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/cs-guide" element={<CsGuidePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </Layout>
      </TooltipProvider>
    </HashRouter>
  );
}

export default App;
