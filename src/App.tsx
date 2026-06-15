import * as React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { EnterprisePage } from '@/pages/EnterprisePage';
import { CalculatorPage } from '@/pages/CalculatorPage';
import { CsGuidePage } from '@/pages/CsGuidePage';
import { CalendarPage } from '@/pages/CalendarPage';
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { AdminRoute } from '@/components/admin/AdminRoute';
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
    <BrowserRouter>
      <ScrollToTop />
      <TooltipProvider delayDuration={300}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/enterprise" element={<EnterprisePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/cs-guide" element={<CsGuidePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </Layout>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
