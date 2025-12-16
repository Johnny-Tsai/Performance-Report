import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { AnnualGoalsSection } from '../components/AnnualGoalsSection';
import { WorklistSection } from '../components/WorklistSection';
import { useYear } from '../hooks/useYear';

export function MainPage() {
  const navigate = useNavigate();
  const { yearData, currentYear } = useYear();

  if (!yearData) {
    return null;
  }

  const { performanceData } = yearData;

  const handleNavigate = (page: string) => {
    if (page === 'ai-performance') {
      navigate(`/${currentYear}/ai-performance`);
    } else if (page === 'highlight-projects') {
      navigate(`/${currentYear}/highlight-projects`);
    } else if (page === 'standardization') {
      navigate(`/${currentYear}/standardization`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Header with Personal Info */}
      <Header
        personalInfo={performanceData.personalInfo}
        summary={performanceData.summary}
      />

      {/* Annual Goals Section */}
      {performanceData.annualGoals && (
        <AnnualGoalsSection
          annualGoals={performanceData.annualGoals}
          onNavigate={handleNavigate}
        />
      )}

      {/* Worklist Section */}
      <WorklistSection />

      {/* Footer */}
      <footer className="glass-card p-6 text-center text-gray-600">
        <p className="mb-2">
          報告產生日期：{new Date().toLocaleDateString('zh-TW')}
        </p>
        <p className="text-sm text-gray-500">
          此績效報告由系統自動產生，供主管審閱使用
        </p>
      </footer>
    </>
  );
}
