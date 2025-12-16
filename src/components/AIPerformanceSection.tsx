import { useState, useEffect } from 'react';
import { useYear } from '../hooks/useYear';

interface AIPerformanceReport {
  title: string;
  objective: string;
  keyActions: string[];
  toolExperiences: {
    codeAssistance: Array<{ tool: string; scenario: string[]; insight: string }>;
    knowledge: Array<{ tool: string; scenario: string[]; insight: string }>;
    breakthrough: Array<{ model: string; achievement: string; painPoint?: string }>;
  };
  keyLearnings: {
    pain: string;
    insights: Array<{ oldBeief: string; newExperience: string; lesson: string }>;
  };
}

// 動態載入 AI 績效資料
async function loadAIPerformanceData(year: number): Promise<AIPerformanceReport | null> {
  try {
    const module = await import(`../data/years/${year}/aiPerformanceData.ts`);
    return module.aiPerformanceReport;
  } catch {
    return null;
  }
}

export function AIPerformanceSection() {
  const { currentYear } = useYear();
  const [aiPerformanceReport, setData] = useState<AIPerformanceReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAIPerformanceData(currentYear)
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentYear]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (!aiPerformanceReport) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-600">
        <p>{currentYear} 年度暫無 AI 績效報告資料</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 目標回顧 */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📋 {aiPerformanceReport.title.replace('績效目標3：', '')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2">績效目標</h3>
            <p className="text-gray-700">{aiPerformanceReport.objective}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-green-900 mb-2">關鍵行動</h3>
            <ul className="text-gray-700 text-sm space-y-1">
              {aiPerformanceReport.keyActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 工具應用實戰 - 程式碼與即時輔助 */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          💻 核心程式碼與即時輔助
        </h3>
        <div className="space-y-4">
          {aiPerformanceReport.toolExperiences.codeAssistance.map((exp, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">
                {exp.tool}
              </h4>
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  關鍵應用情境：
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-2">
                  {exp.scenario.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">▪</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-blue-900">心得：</span>
                  {' '}{exp.insight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 通識知識與資料檢索 */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🧠 通識知識與資料檢索
        </h3>
        <div className="space-y-4">
          {aiPerformanceReport.toolExperiences.knowledge.map((exp, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">
                {exp.tool}
              </h4>
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  應用情境：
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-2">
                  {exp.scenario.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">▪</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-green-900">結論：</span>
                  {' '}{exp.insight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SDD 自動化突破 */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✨ 突破性進展：SDD規格自動化
        </h3>
        <div className="space-y-4">
          {aiPerformanceReport.toolExperiences.breakthrough.map((item, idx) => (
            <div
              key={idx}
              className={`border rounded-lg p-4 ${
                item.painPoint
                  ? 'border-red-300 bg-red-50'
                  : 'border-green-300 bg-green-50'
              }`}
            >
              <div className="flex items-start gap-2 mb-2">
                <span className={item.painPoint ? 'text-2xl' : 'text-3xl'}>
                  {item.painPoint ? '⚠️' : '🎯'}
                </span>
                <h4 className="font-semibold text-lg text-gray-800">
                  {item.model}
                </h4>
              </div>
              <div className="ml-10 space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">成果：</p>
                  <p className="text-sm text-gray-700">{item.achievement}</p>
                </div>
                {item.painPoint && (
                  <div>
                    <p className="text-sm font-medium text-red-700">痛點：</p>
                    <p className="text-sm text-gray-700">{item.painPoint}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 經驗總結 */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          💡 經驗總結與推廣心得
        </h3>
        
        {/* 痛苦與突破 */}
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <h4 className="font-semibold text-gray-800 mb-2">
            痛苦與突破：「不可行」到「可行」的轉折
          </h4>
          <blockquote className="text-sm text-gray-700 italic border-l-2 border-yellow-400 pl-3 mb-3">
            「{aiPerformanceReport.keyLearnings.pain}」
          </blockquote>
          <div className="bg-white p-3 rounded text-sm text-gray-700 space-y-2">
            <p>
              <span className="font-medium">心得重點：</span>
              AI 應用是一段充滿失敗嘗試的歷程。但只要找到對的模型和對的場景，效率的提升就是指數級的。
            </p>
          </div>
        </div>

        {/* 認知轉變 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 mb-3">
            AI通識能力提升的關鍵發現
          </h4>
          {aiPerformanceReport.keyLearnings.insights.map((insight, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs font-medium text-red-600 uppercase mb-1">
                    原本認知
                  </p>
                  <p className="text-sm text-gray-700">{insight.oldBeief}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-green-600 uppercase mb-1">
                    實戰經驗
                  </p>
                  <p className="text-sm text-gray-700">{insight.newExperience}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-2 rounded text-xs text-gray-700">
                <span className="font-medium text-blue-900">啟示：</span> {insight.lesson}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 經典哲學思考 */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-md p-6 border-l-4 border-amber-500">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          💭 失敗也是一種明確的結果
        </h3>
        
        <div className="space-y-4">
          {/* 哲學對應 */}
          <div className="space-y-3">
            {/* 愛迪生 */}
            <div className="bg-white p-4 rounded-lg border border-amber-100">
              <p className="text-sm font-semibold text-amber-900 mb-2">托馬斯·愛迪生</p>
              <p className="text-sm text-gray-700 italic mb-2">
                「我沒有失敗。我只是發現了一萬種行不通的方法。」
              </p>
              <p className="text-sm text-gray-600">
                每個「不可行」都是排除法的一步，讓研發過程不斷收斂，最終找到可行的方法。
              </p>
            </div>

            {/* 波普爾 */}
            <div className="bg-white p-4 rounded-lg border border-amber-100">
              <p className="text-sm font-semibold text-amber-900 mb-2">卡爾·波普爾（證偽主義）</p>
              <p className="text-sm text-gray-700 italic mb-2">
                「科學進步不是證明理論是對的，而是證明理論是錯的。」
              </p>
              <p className="text-sm text-gray-600">
                「不可行」就是對假設的有力證偽，比盲目的「可能成功」更有價值。
              </p>
            </div>
          </div>

          {/* 啟示 */}
          <div className="bg-amber-100 p-3 rounded-lg border-l-4 border-amber-600">
            <p className="text-sm text-amber-900 font-medium">💡 啟示</p>
            <p className="text-sm text-gray-700 mt-1.5">
              因此，那些失敗的 AI 工具嘗試、不符合規範的規格產出、速度不夠快的工具體驗——它們都不是徒勞。每一次的「不可行」都標記了知識的界限，為下一次的突破奠定了基礎。正是這些失敗的累積，最終帶來了 Opus 4.5 在 SDD 自動化上 90% 準確率的成功。
            </p>
          </div>
        </div>
      </section>

      {/* 心境調整 */}
      <section className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg shadow-md p-6 border-l-4 border-rose-500">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          🌱 心境調整
        </h3>
        
        <div className="space-y-3">
          {/* 停止禁錮 */}
          <div className="bg-white p-4 rounded-lg border border-rose-100">
            <p className="text-sm font-semibold text-rose-900 mb-2">心態轉向</p>
            <p className="text-sm text-gray-700">
              停止讓固有思維禁錮新時代的潛能。將 AI 視為能力的延伸，而不是取代自身的威脅。
            </p>
          </div>

          {/* 擁抱結果 */}
          <div className="bg-white p-4 rounded-lg border border-rose-100">
            <p className="text-sm font-semibold text-rose-900 mb-2">擁抱結果</p>
            <p className="text-sm text-gray-700">
              接受「不可行」的結論是研發探索的常態。每一次試錯，都是為下一個突破奠定堅實的知識基石。
            </p>
          </div>

          {/* 主導未來 */}
          <div className="bg-white p-4 rounded-lg border border-rose-100">
            <p className="text-sm font-semibold text-rose-900 mb-2">主導未來</p>
            <p className="text-sm text-gray-700">
              從被動抗拒轉為主動嘗試，我們必須從工具的使用者，升級為 AI 時代的工作流程設計者。
            </p>
          </div>
        </div>
      </section>

      {/* 真香時刻 */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-md p-6 border border-amber-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          🍚 真香定律
        </h3>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-shrink-0">
            <img 
              src={`${import.meta.env.BASE_URL}zhenxiang.jpg`} 
              alt="真香" 
              className="rounded-lg shadow-lg max-w-xs md:max-w-sm"
            />
          </div>
          <div className="space-y-3 text-gray-700">
            <p className="text-lg font-medium text-amber-800">
              「AI 寫的程式碼錯誤百出...」
            </p>
            <p className="text-lg font-medium text-amber-800">
              「我就是自己手動寫程式，從這兒跳下去...」
            </p>
            <p className="text-lg font-medium text-amber-800">
              「也不會用 AI 來幫我工作！」
            </p>
            <p className="text-2xl font-bold text-orange-600 mt-4">
              「真香！」🍚
            </p>
            <p className="text-sm text-gray-600 italic mt-2">
              從懷疑到依賴，這就是每位開發者使用 AI 輔助工具的必經之路。
            </p>
          </div>
        </div>
      </section>

      {/* 結語 */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-6 border-t-4 border-blue-500">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          📌 結語
        </h3>
        <div className="text-gray-700 space-y-3">
          <p>
            這份上半年的 AI 導入經驗，不僅驗證了 AI 對開發效率的巨大潛力，更重要的是確立了<span className="font-semibold">「模型選型」</span>而非「提示優化」才是決定性要素的實戰結論。
          </p>
          <p>
            下半年我持續用 AI 工具慢慢積累經驗，<span className="font-semibold">在日常工作中得到切實的好處與心得。</span>同時，透過分享這些實戰經驗與失敗教訓，讓團隊成員也能逐步認識 AI 的價值，進而提升整體的開發效率。
          </p>
          <p className="text-sm text-gray-600 italic">
            文件生成日期：2025年12月3日
          </p>
        </div>
      </section>
    </div>
  );
}
