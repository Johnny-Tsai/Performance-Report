import { useState } from 'react';
import { HighlightProject } from '../types/performance';

interface HighlightProjectsSectionProps {
  projects: HighlightProject[];
}

export function HighlightProjectsSection({ projects }: HighlightProjectsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderStars = (count: number) => {
    return '⭐'.repeat(count);
  };

  const getStarColor = (stars: number) => {
    switch (stars) {
      case 3: return 'from-amber-400 to-orange-500';
      case 2: return 'from-blue-400 to-blue-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <section id="highlight-projects" className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
      <h2 className="section-title">🏆 年度重點亮點專案</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        2025 年度共完成 <span className="font-semibold text-blue-600 dark:text-blue-400">{projects.length}</span> 個重點專案，
        涵蓋品質管理(QM)、內控預警(SEC)、團膳報表(GM)、分級看板(PM)、花卉系統(FMB)、倉儲單據(WM)、理貨標籤(TM)、客服系統(CSS) 等多個產品線
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`border rounded-xl overflow-hidden transition-all duration-300 ${
              expandedId === project.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
            }`}
          >
            {/* 專案卡片標題 */}
            <div
              className={`bg-gradient-to-r ${getStarColor(project.stars)} p-4 cursor-pointer`}
              onClick={() => toggleExpand(project.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{project.code}</span>
                    {project.name}
                  </div>
                  <div className="text-white/90 text-sm mt-1">{renderStars(project.stars)}</div>
                </div>
                <div className="text-white/80 text-right text-sm">
                  <div>{project.period}</div>
                  <div className="font-semibold">{project.commits}+ commits</div>
                </div>
              </div>
              <p className="text-white/90 text-sm mt-2">{project.description}</p>
              <div className="flex justify-end mt-2">
                <span className="text-white/80 text-xs">
                  {expandedId === project.id ? '▲ 收合' : '▼ 展開詳細'}
                </span>
              </div>
            </div>

            {/* 展開的詳細內容 */}
            {expandedId === project.id && (
              <div className="p-4 bg-white">
                {/* 功能 */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-blue-500">📦</span> 功能 ({project.modules.length})
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-2 text-left font-medium text-gray-600 whitespace-nowrap">代碼</th>
                          <th className="px-3 py-2 text-left font-medium text-gray-600 whitespace-nowrap">名稱</th>
                          <th className="px-3 py-2 text-left font-medium text-gray-600">說明</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {project.modules.map((module, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-mono text-xs text-gray-600 whitespace-nowrap">{module.code}</td>
                            <td className="px-3 py-2 text-gray-800 whitespace-nowrap">{module.name}</td>
                            <td className="px-3 py-2 text-gray-600">{module.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 技術亮點 (含截圖) */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-purple-500">🔧</span> 技術亮點
                  </h4>

                  {/* 技術標籤 */}
                  {project.techHighlights && project.techHighlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techHighlights.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                          title={tech.description}
                        >
                          {tech.pattern}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 功能截圖與亮點 */}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div className="space-y-4">
                      {project.screenshots.map((screenshot, idx) => (
                        <div key={idx} className="border border-purple-200 rounded-lg overflow-hidden">
                          <div className="bg-purple-50 px-3 py-2 font-medium text-purple-800 text-sm">
                            {screenshot.name}
                          </div>
                          <div className="p-3">
                            <img
                              src={screenshot.image}
                              alt={screenshot.name}
                              className="w-full rounded border border-gray-200 mb-2"
                            />
                            <ul className="space-y-1">
                              {screenshot.highlights.map((highlight, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2 text-xs text-gray-600">
                                  <span className="text-purple-500 mt-0.5">•</span>
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
