import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useYear } from '../hooks/useYear';

// 動態載入標準化資料
async function loadStandardizationData(year: number) {
  const module = await import(`../data/years/${year}/standardizationData.ts`);
  return module.standardizationData;
}

type TabId = 'dotnet9' | 'restful-api' | 'new-layout' | 'kendo-vue';

export function StandardizationPage() {
  const navigate = useNavigate();
  const { currentYear } = useYear();
  const [activeTab, setActiveTab] = useState<TabId>('dotnet9');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStandardizationData(currentYear)
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [currentYear]);

  const handleBack = () => {
    navigate(`/${currentYear}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600" />
      </div>
    );
  }

  const tabs = [
    { id: 'dotnet9' as TabId, name: data.goals.dotNet9.name, icon: data.goals.dotNet9.icon, color: 'purple' },
    { id: 'restful-api' as TabId, name: data.goals.restfulAPI.name, icon: data.goals.restfulAPI.icon, color: 'blue' },
    { id: 'new-layout' as TabId, name: data.goals.newLayout.name, icon: data.goals.newLayout.icon, color: 'pink' },
    { id: 'kendo-vue' as TabId, name: data.goals.kendoVue.name, icon: data.goals.kendoVue.icon, color: 'amber' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            已完成
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            進行中
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            待開始
          </span>
        );
    }
  };

  const renderDotNet9Content = () => {
    const goal = data.goals.dotNet9;
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-purple-500">📦</span> 框架版本升級
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Target Framework', value: '.NET 9.0' },
              { label: 'Entity Framework Core', value: '9.0.5' },
              { label: 'FluentValidation', value: '12.0.0' },
              { label: 'ASP.NET Core MVC', value: '9.0.5' },
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="text-xs text-purple-600 mb-1">{item.label}</div>
                <div className="text-lg font-bold text-purple-800">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-purple-500">🏗️</span> 專案架構 ({goal.projectUpgrades.length} 個專案全部升級)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-600">專案名稱</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Framework</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">說明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {goal.projectUpgrades.map((project: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-mono text-purple-600">{project.name}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                        {project.framework}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{project.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-purple-500">📋</span> DTO 模式實作 (34+ 類別)
          </h3>
          <div className="space-y-4">
            {goal.dtoModules.map((module: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 font-medium text-gray-700 flex items-center justify-between">
                  <span>{module.name}</span>
                  <span className="text-xs text-gray-500 font-mono">{module.path}</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {module.items.map((item: any, itemIdx: number) => (
                      <div key={itemIdx} className="flex items-center gap-2 text-sm">
                        <span className="font-mono text-purple-600">{item.name}</span>
                        <span className="text-gray-400">-</span>
                        <span className="text-gray-600">{item.purpose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-purple-500">✅</span> FluentValidation 驗證器
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {goal.validators.map((validator: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-gray-800">{validator.name}</div>
                <div className="text-xs text-gray-500 font-mono mt-1">{validator.path}</div>
                <div className="text-sm text-gray-600 mt-2">{validator.description}</div>
                {validator.rules && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {validator.rules.map((rule: string, ruleIdx: number) => (
                      <span key={ruleIdx} className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                        {rule}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {goal.codeSnippets.map((snippet: any, idx: number) => (
            <div key={idx} className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-700">{snippet.title}</h4>
                <span className="text-xs text-gray-500">{snippet.description}</span>
              </div>
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{snippet.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRESTfulAPIContent = () => {
    const goal = data.goals.restfulAPI;
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-500">📐</span> 設計原則
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-600">原則</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">說明</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">範例</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {goal.designPrinciples.map((principle: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-blue-600">{principle.principle}</td>
                    <td className="px-4 py-2 text-gray-600">{principle.description}</td>
                    <td className="px-4 py-2 font-mono text-xs text-gray-500">{principle.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-500">🔄</span> API 重構對照表
          </h3>
          <div className="space-y-4">
            {goal.apiModules.map((module: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-blue-50 px-4 py-2 font-medium text-blue-700">
                  {module.name} - {module.description}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left font-medium text-gray-600">舊 API (RPC 風格)</th>
                        <th className="px-4 py-2 text-center font-medium text-gray-600">→</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">新 API (RESTful)</th>
                        <th className="px-4 py-2 text-center font-medium text-gray-600">HTTP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {module.mappings.map((mapping: any, mapIdx: number) => (
                        <tr key={mapIdx} className="hover:bg-gray-50">
                          <td className="px-4 py-2 font-mono text-xs text-red-600 line-through">{mapping.oldAPI}</td>
                          <td className="px-4 py-2 text-center text-gray-400">→</td>
                          <td className="px-4 py-2 font-mono text-xs text-green-600">{mapping.newAPI}</td>
                          <td className="px-4 py-2 text-center">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              mapping.httpMethod === 'GET' ? 'bg-green-100 text-green-700' :
                              mapping.httpMethod === 'POST' ? 'bg-blue-100 text-blue-700' :
                              mapping.httpMethod === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {mapping.httpMethod}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-500">📊</span> HTTP 狀態碼規範
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {goal.httpStatusCodes.map((status: any, idx: number) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-3">
                <div className="font-mono font-bold text-blue-700">{status.code}</div>
                <div className="text-sm text-gray-600 mt-1">{status.description}</div>
              </div>
            ))}
          </div>
        </div>

        {goal.codeSnippets.map((snippet: any, idx: number) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-blue-500">💻</span> {snippet.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{snippet.description}</p>
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}
      </div>
    );
  };

  const renderNewLayoutContent = () => {
    const goal = data.goals.newLayout;
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-pink-500">📝</span> 已套用至 MVC Views ({goal.mvcViewUpdates.length} 個)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-600">View</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">套用內容</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {goal.mvcViewUpdates.map((view: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-mono text-xs text-pink-600">{view.view}</td>
                    <td className="px-4 py-2 text-gray-600">{view.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderKendoVueContent = () => {
    const goal = data.goals.kendoVue;
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-amber-500">⚡</span> 技術棧升級
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-600">項目</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">舊技術</th>
                  <th className="px-4 py-2 text-center font-medium text-gray-600">→</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">新技術</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {goal.techStackUpgrades.map((upgrade: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">{upgrade.item}</td>
                    <td className="px-4 py-2 text-red-500 line-through">{upgrade.oldTech}</td>
                    <td className="px-4 py-2 text-center text-gray-400">→</td>
                    <td className="px-4 py-2 text-green-600 font-medium">{upgrade.newTech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-amber-500">📁</span> ClientApp 專案結構
          </h3>
          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
            <code>{goal.clientAppStructure}</code>
          </pre>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-amber-500">📦</span> Kendo UI for Vue 模組 ({goal.kendoModules.length} 個)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goal.kendoModules.map((module: any, idx: number) => (
              <div key={idx} className="border border-amber-200 rounded-lg p-4 bg-amber-50">
                <div className="font-medium text-amber-800">{module.name}</div>
                <div className="text-xs text-amber-600 font-mono mt-1">{module.package}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {module.components.map((comp: string, compIdx: number) => (
                    <span key={compIdx} className="px-2 py-0.5 bg-amber-200 text-amber-800 rounded text-xs">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-amber-500">🧩</span> Vue 元件 ({goal.vueComponents.length} 個)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {goal.vueComponents.map((component: any, idx: number) => (
              <div key={idx} className="bg-amber-50 rounded-lg p-3">
                <div className="font-mono text-amber-700">{component.name}</div>
                <div className="text-xs text-gray-500">{component.path}</div>
                <div className="text-sm text-gray-600 mt-1">{component.description}</div>
              </div>
            ))}
          </div>
        </div>

        {goal.codeSnippets.map((snippet: any, idx: number) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-amber-500">💻</span> {snippet.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{snippet.description}</p>
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dotnet9':
        return renderDotNet9Content();
      case 'restful-api':
        return renderRESTfulAPIContent();
      case 'new-layout':
        return renderNewLayoutContent();
      case 'kendo-vue':
        return renderKendoVueContent();
      default:
        return null;
    }
  };

  const getCurrentGoal = () => {
    switch (activeTab) {
      case 'dotnet9':
        return data.goals.dotNet9;
      case 'restful-api':
        return data.goals.restfulAPI;
      case 'new-layout':
        return data.goals.newLayout;
      case 'kendo-vue':
        return data.goals.kendoVue;
      default:
        return data.goals.dotNet9;
    }
  };

  return (
    <div className="min-h-screen">
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          {data.title}
          <span className="text-lg font-normal text-purple-200">
            (權重 {data.weight}%)
          </span>
        </h1>
        <p className="text-purple-100 mt-3 text-lg">
          {data.description}
        </p>
        <div className="flex items-center gap-4 mt-4">
          <span className="text-purple-200">目標日期：{data.targetDate}</span>
          {getStatusBadge(getCurrentGoal().milestones[0]?.status || 'pending')}
        </div>
      </div>

      {/* Tab 切換 */}
      <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 px-4 py-4 text-center font-medium transition-colors"
              style={{
                backgroundColor: activeTab === tab.id ?
                  (tab.color === 'purple' ? '#faf5ff' :
                   tab.color === 'blue' ? '#eff6ff' :
                   tab.color === 'pink' ? '#fdf2f8' :
                   '#fffbeb') : undefined,
                color: activeTab === tab.id ?
                  (tab.color === 'purple' ? '#7c3aed' :
                   tab.color === 'blue' ? '#2563eb' :
                   tab.color === 'pink' ? '#db2777' :
                   '#d97706') : '#4b5563',
                borderBottomColor: activeTab === tab.id ?
                  (tab.color === 'purple' ? '#7c3aed' :
                   tab.color === 'blue' ? '#2563eb' :
                   tab.color === 'pink' ? '#db2777' :
                   '#d97706') : undefined,
                borderBottomWidth: activeTab === tab.id ? '2px' : undefined,
              }}
            >
              <span className="text-xl mr-2">{tab.icon}</span>
              <span className="hidden md:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab 內容 */}
      {renderTabContent()}

      {/* 績效總結 */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mt-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          績效總結
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.performanceSummary.map((category: any, idx: number) => (
            <div key={idx} className="bg-white/10 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3">{category.category}</h3>
              <ul className="space-y-2">
                {category.items.map((item: any, itemIdx: number) => (
                  <li key={itemIdx} className="text-gray-300 text-sm whitespace-nowrap">
                    <span className="text-gray-400">{item.label}：</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
