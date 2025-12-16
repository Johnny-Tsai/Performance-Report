import { useNavigate } from 'react-router-dom';
import { AIPerformanceSection } from '../components/AIPerformanceSection';
import { useYear } from '../hooks/useYear';

export function AIPerformancePage() {
  const navigate = useNavigate();
  const { currentYear } = useYear();

  const handleBack = () => {
    navigate(`/${currentYear}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-md transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回績效報告
        </button>
      </div>
      <AIPerformanceSection />
    </>
  );
}
