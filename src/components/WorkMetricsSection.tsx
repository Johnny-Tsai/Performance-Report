import { useState } from 'react';

interface MetricItem {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface WorkMetricsSectionProps {
  metrics: MetricItem[];
}

export function WorkMetricsSection({ metrics }: WorkMetricsSectionProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return 'from-emerald-500 to-green-600';
    if (percentage >= 70) return 'from-amber-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">📈</span>;
      case 'down':
        return <span className="text-red-500">📉</span>;
      default:
        return <span className="text-gray-500">➡️</span>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50';
      case 'down': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <section className="glass-card p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">📊 日常工作量化指標</h2>
        <div className="text-sm text-gray-500">
          最後更新：{new Date().toLocaleDateString('zh-TW')}
        </div>
      </div>

      {/* 概覽卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => {
          const percentage = getProgressPercentage(metric.current, metric.target);
          const isSelected = selectedMetric === metric.id;
          
          return (
            <div
              key={metric.id}
              className={`bg-white rounded-xl p-4 border transition-all cursor-pointer hover:shadow-md ${
                isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200'
              }`}
              onClick={() => setSelectedMetric(isSelected ? null : metric.id)}
            >
              {/* 指標標題 */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 text-sm">{metric.name}</h3>
                {getTrendIcon(metric.trend)}
              </div>

              {/* 數值顯示 */}
              <div className="flex items-end gap-1 mb-2">
                <span className="text-2xl font-bold text-gray-800">
                  {metric.current}
                </span>
                <span className="text-sm text-gray-500">/ {metric.target}</span>
                <span className="text-xs text-gray-400 ml-1">{metric.unit}</span>
              </div>

              {/* 進度條 */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`bg-gradient-to-r ${getProgressColor(metric.current, metric.target)} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* 完成率 */}
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${getTrendColor(metric.trend)}`}>
                  {percentage.toFixed(0)}%
                </span>
                <span className="text-xs text-gray-500">
                  {percentage >= 90 ? '✅ 達標' : percentage >= 70 ? '⚠️ 接近' : '❌ 待改善'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 詳細說明區 */}
      {selectedMetric && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          {(() => {
            const metric = metrics.find(m => m.id === selectedMetric);
            if (!metric) return null;

            return (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-bold text-gray-800">{metric.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${getTrendColor(metric.trend)}`}>
                    {metric.trend === 'up' ? '表現良好' : metric.trend === 'down' ? '需要關注' : '持平'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">目前數值</div>
                    <div className="text-xl font-bold text-blue-600">
                      {metric.current} {metric.unit}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">目標數值</div>
                    <div className="text-xl font-bold text-green-600">
                      {metric.target} {metric.unit}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">達成率</div>
                    <div className="text-xl font-bold text-purple-600">
                      {getProgressPercentage(metric.current, metric.target).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">指標說明</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{metric.description}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 操作提示 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          💡 點擊各項指標卡片查看詳細資訊
        </p>
      </div>
    </section>
  );
}