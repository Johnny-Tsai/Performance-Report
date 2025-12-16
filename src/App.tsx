import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { YearProvider } from './context/YearContext';
import { AppLayout } from './components/layout/AppLayout';
import { MainPage } from './pages/MainPage';
import { HighlightProjectsPage } from './pages/HighlightProjectsPage';
import { StandardizationPage } from './pages/StandardizationPage';
import { AIPerformancePage } from './pages/AIPerformancePage';

function AppRoutes() {
  return (
    <Routes>
      {/* 根路徑重導向至最新年度 */}
      <Route path="/" element={<Navigate to="/2025" replace />} />

      {/* 年度路由 */}
      <Route path="/:year" element={<AppLayout />}>
        <Route index element={<MainPage />} />
        <Route path="highlight-projects" element={<HighlightProjectsPage />} />
        <Route path="standardization" element={<StandardizationPage />} />
        <Route path="ai-performance" element={<AIPerformancePage />} />
      </Route>

      {/* 404 處理 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter basename="/Performance-Report">
      <YearProvider>
        <AppRoutes />
      </YearProvider>
    </BrowserRouter>
  );
}

export default App;
