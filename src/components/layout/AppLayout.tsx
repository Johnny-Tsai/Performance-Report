import { Outlet } from 'react-router-dom';
import { YearSelector } from './YearSelector';
import { useYear } from '../../hooks/useYear';

export function AppLayout() {
  const { isLoading, error } = useYear();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white border border-red-200 text-red-700 px-8 py-6 rounded-xl shadow-lg max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-bold">載入錯誤</h2>
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 年度選擇器（固定在頂部） */}
        <div className="glass-card p-4 mb-6 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">績效報告系統</h1>
          <YearSelector />
        </div>

        {/* 載入狀態 */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600" />
              <span className="text-gray-600">載入年度資料中...</span>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
