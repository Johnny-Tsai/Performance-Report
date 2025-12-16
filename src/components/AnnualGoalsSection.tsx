import { AnnualGoals } from '../types/performance';

type PageType = 'main' | 'highlight-projects' | 'standardization' | 'ai-performance';

interface AnnualGoalsSectionProps {
  annualGoals: AnnualGoals;
  onNavigate?: (page: PageType) => void;
}

export function AnnualGoalsSection({ annualGoals, onNavigate }: AnnualGoalsSectionProps) {
  const { workGoals, coreCompetencies } = annualGoals;

  const handleLinkClick = (linkTo?: string) => {
    if (linkTo && onNavigate) {
      onNavigate(linkTo as PageType);
    }
  };

  return (
    <section className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <h2 className="section-title">🎯 2025 年度績效目標</h2>

      {/* 工作目標 (KPI) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">工作目標</span>
        </h3>
        <div className="space-y-8">
          {workGoals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-xl p-6 border border-gray-200 transition-all"
            >
              {/* 目標標題 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {goal.id}
                    </span>
                    <h4 className="text-xl font-bold text-gray-800">{goal.name}</h4>
                  </div>
                  <p className="text-gray-600 font-medium">{goal.target}</p>
                </div>
                <span className="bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-full ml-4">
                  {goal.weight}%
                </span>
              </div>

              {/* 詳細說明 */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{goal.description}</p>
              </div>

              {/* 衡量標準 */}
              <div className="mb-4">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-blue-500">📋</span> 衡量標準
                </h5>
                <ul className="space-y-2">
                  {goal.metrics.map((metric, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="text-blue-400 font-semibold mt-0.5">{idx + 1}.</span>
                      <span className="leading-relaxed">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 完成情況 */}
              <div className={goal.linkTo ? 'mb-4' : ''}>
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-green-500">✅</span> 完成情況
                </h5>
                <ul className="space-y-2">
                  {goal.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="text-gray-400 mt-1">•</span>
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 查看詳情按鈕 */}
              {goal.linkTo && (
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => handleLinkClick(goal.linkTo)}
                    className="group inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    {goal.linkTo === 'standardization' && '📐 查看流程標準化詳細內容'}
                    {goal.linkTo === 'highlight-projects' && '🏆 查看年度重點亮點專案'}
                    {goal.linkTo === 'ai-performance' && '🤖 查看AI效能提升實踐報告'}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 核心職能 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">核心職能</span>
        </h3>
        
        <div className="space-y-6">
          {coreCompetencies.map((competency) => (
            <div 
              key={competency.id} 
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              {/* 標題列 */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {competency.id}
                  </span>
                  <h4 className="font-semibold text-lg">{competency.name}</h4>
                </div>
                <span className="bg-white/20 px-4 py-1 rounded-full font-semibold">
                  {competency.weight}%
                </span>
              </div>

              {/* 內容區 */}
              <div className="p-6">
                {/* 關鍵行為 */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-3">📋 關鍵行為</p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {competency.behaviors.map((behavior, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-0.5">•</span>
                        <span>{behavior}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 績效回饋 - 整合在關鍵行為下方 */}
                {competency.feedback && competency.feedback.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-600 mb-3">📝 績效回饋（著重於洞察與表達）</p>
                    <div className="space-y-3">
                      {competency.feedback.map((item, idx) => (
                        <div key={idx} className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                          <p className="text-sm font-semibold text-indigo-900 mb-1.5">
                            {item.behavior}
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
