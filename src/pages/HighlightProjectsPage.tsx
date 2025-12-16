import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useYear } from '../hooks/useYear';

export function HighlightProjectsPage() {
  const navigate = useNavigate();
  const { yearData, currentYear, getScreenshotPath } = useYear();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  if (!yearData) {
    return null;
  }

  const projects = yearData.highlightProjects;

  const handleBack = () => {
    navigate(`/${currentYear}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getProjectColor = (index: number) => {
    const colors = [
      'from-emerald-500 to-teal-600',
      'from-sky-500 to-blue-600',
      'from-violet-500 to-purple-600',
      'from-rose-500 to-pink-600',
      'from-amber-500 to-orange-600',
    ];
    return colors[index % colors.length];
  };

  // 處理截圖路徑
  const resolveScreenshotPath = (project: typeof projects[0], imagePath: string) => {
    // 如果路徑已經是絕對路徑，需要轉換為年度化路徑
    if (imagePath.startsWith('/')) {
      // 提取專案代碼和檔名
      const parts = imagePath.split('/').filter(Boolean);
      if (parts.length >= 2) {
        const projectCode = parts[0];
        const filename = parts.slice(1).join('/');
        return getScreenshotPath(projectCode, filename);
      }
    }
    return getScreenshotPath(project.code, imagePath);
  };

  return (
    <div className="min-h-screen">
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-3 text-lg">{lightboxImage.alt}</p>
          </div>
        </div>
      )}

      {/* 返回按鈕 */}
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

      {/* 頁面標題 */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          年度重點亮點專案
        </h1>
        <p className="text-emerald-100 mt-3 text-lg">
          {currentYear} 年度共完成 <span className="font-bold text-white">{projects.length}</span> 個重點專案，涵蓋品質管理、內控預警、團膳系統等多個領域
        </p>
      </div>

      {/* 專案列表 */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl shadow-md border border-gray-100"
          >
            {/* 專案標題區 */}
            <div
              className="p-5 cursor-pointer flex"
              onClick={() => toggleExpand(project.id)}
            >
              {/* 左側色條 */}
              <div className={`w-1.5 bg-gradient-to-b ${getProjectColor(index)} rounded-full mr-4 self-stretch`}></div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-mono text-xs">
                        {project.code}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {project.modules.length} 個功能 · {project.techHighlights?.length || 0} 個技術亮點
                      </span>
                    </div>
                    <h2 className="text-gray-800 font-bold text-xl">{project.name}</h2>
                    <p className="text-gray-500 mt-1">{project.description}</p>
                  </div>
                  <span className="text-gray-400 flex items-center gap-1 ml-4 text-sm">
                    {expandedId === project.id ? <>▲</> : <>▼</>}
                  </span>
                </div>
              </div>
            </div>

            {/* 展開的詳細內容 */}
            {expandedId === project.id && (
              <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 左側：功能 */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      功能模組
                    </h3>
                    <div className="space-y-2">
                      {project.modules.map((module, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border-l-4 border-l-violet-400 border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs text-violet-700 bg-violet-100 px-2 py-0.5 rounded font-semibold">{module.code}</span>
                            <span className="text-gray-800 font-medium">{module.name}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{module.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 右側：技術亮點 */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      技術亮點
                    </h3>

                    {/* 技術標籤 */}
                    {project.techHighlights && project.techHighlights.length > 0 && (
                      <div className="space-y-2">
                        {project.techHighlights.map((tech, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-lg p-3 border-l-4 border-l-amber-400 border border-gray-200 shadow-sm"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-semibold">
                                {tech.pattern}
                              </span>
                              <span className="text-gray-700 text-sm">{tech.application}</span>
                            </div>
                            <p className="text-gray-600 text-sm">{tech.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 功能截圖區塊 */}
                {project.screenshots && project.screenshots.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      功能截圖
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.screenshots.map((screenshot, idx) => {
                        const imageSrc = resolveScreenshotPath(project, screenshot.image);
                        return (
                          <div key={idx} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                            <div className="bg-gray-100 px-4 py-2 font-medium text-gray-700 text-sm">
                              {screenshot.name}
                            </div>
                            <div className="p-3">
                              <img
                                src={imageSrc}
                                alt={screenshot.name}
                                className="w-full rounded-lg border border-gray-100 shadow-sm mb-3 cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => setLightboxImage({ src: imageSrc, alt: screenshot.name })}
                              />
                              <ul className="space-y-1">
                                {screenshot.highlights.map((highlight, hIdx) => (
                                  <li key={hIdx} className="flex items-start gap-2 text-gray-600 text-sm">
                                    <span className="text-emerald-500 mt-0.5">•</span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 程式碼範例區塊 */}
                {project.codeSnippets && project.codeSnippets.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      程式碼範例
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {project.codeSnippets.map((snippet, idx) => (
                        <div key={idx} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                            <span className="text-gray-300 font-medium text-sm">{snippet.title}</span>
                            <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded">{snippet.language}</span>
                          </div>
                          <pre className="p-4 overflow-x-auto text-sm">
                            <code className="text-gray-300 font-mono whitespace-pre">{snippet.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 返回按鈕（底部） */}
      <div className="mt-8 text-center">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回績效報告
        </button>
      </div>
    </div>
  );
}
