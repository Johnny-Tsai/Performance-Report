import { WorkStats } from '../types/performance';

interface WorkStatsSectionProps {
  stats: WorkStats;
}

export function WorkStatsSection({ stats }: WorkStatsSectionProps) {
  const statItems = [
    { label: '總 Commits', value: stats.commits, icon: '📝', color: 'from-blue-500 to-blue-600' },
    { label: '新功能模組', value: `${stats.modules}+`, icon: '🚀', color: 'from-green-500 to-green-600' },
    { label: '功能增強', value: `${stats.enhancements}+`, icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
    { label: '報表開發', value: `${stats.reports}+`, icon: '📊', color: 'from-purple-500 to-purple-600' },
    { label: 'Bug 修復', value: `${stats.bugFixes}+`, icon: '🔧', color: 'from-red-500 to-red-600' },
    { label: '技術重構', value: `${stats.refactors}+`, icon: '🏗️', color: 'from-indigo-500 to-indigo-600' },
  ];

  return (
    <section className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
      <h2 className="section-title">📊 年度工作統計</h2>
      <p className="text-gray-600 mb-6 text-sm">統計期間：2025/01/01 - 2025/12/01</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-200`}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-sm opacity-90">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
