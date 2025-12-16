import { useYear } from '../../hooks/useYear';

export function YearSelector() {
  const { currentYear, availableYears, switchYear, isLoading } = useYear();

  if (availableYears.length <= 1) {
    // 只有一個年度時，顯示為標籤而非下拉選單
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">績效年度：</span>
        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
          {currentYear}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-600">績效年度：</label>
      <select
        value={currentYear}
        onChange={(e) => switchYear(parseInt(e.target.value, 10))}
        disabled={isLoading}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-gray-800 font-medium cursor-pointer"
      >
        {availableYears.map((config) => (
          <option key={config.year} value={config.year}>
            {config.displayName}
            {config.isActive && ' (當前)'}
          </option>
        ))}
      </select>

      {/* 快速切換按鈕 */}
      <div className="flex gap-1">
        {availableYears.slice(-3).map((config) => (
          <button
            key={config.year}
            onClick={() => switchYear(config.year)}
            disabled={isLoading}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${
                currentYear === config.year
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {config.year}
          </button>
        ))}
      </div>
    </div>
  );
}
