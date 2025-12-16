// AI 績效目標執行報告數據

export interface AIToolExperience {
  tool: string;
  scenario: string[];
  insight: string;
}

export interface AIModelComparison {
  model: string;
  achievement: string;
  painPoint?: string;
}

export interface AIPerformanceReport {
  title: string;
  objective: string;
  keyActions: string[];
  toolExperiences: {
    codeAssistance: AIToolExperience[];
    knowledge: AIToolExperience[];
    breakthrough: AIModelComparison[];
  };
  keyLearnings: {
    pain: string;
    breakthrough: string[];
    insights: Array<{
      oldBeief: string;
      newExperience: string;
      lesson: string;
    }>;
  };
  nextSteps: {
    shortTerm: Array<{
      title: string;
      details: string[];
    }>;
    midTerm: string[];
  };
  kpis: Array<{
    metric: string;
    target: string;
    remark: string;
  }>;
}

export const aiPerformanceReport: AIPerformanceReport = {
  title: '績效目標3：AI賦能開發效率提升',
  objective: '提升開發效率',
  keyActions: [
    '每人分享2個日常工作使用AI的經驗',
    '循序漸進地提升公司同仁的AI通識能力（工具導入、AI知識、使用經驗、情境案例）',
  ],
  toolExperiences: {
    codeAssistance: [
      {
        tool: 'GitHub Copilot',
        scenario: [
          '程式碼即時補全',
          '單元測試生成',
          '快速產出符合規範的程式碼',
        ],
        insight: '高效的即戰力。尤其在將 Devin 輸出的邏輯報告貼入後，能快速產生成符合專案風格的實作程式碼，預期未來若能整合 Devin MCP，將能實現概念到實作的無縫銜接，極大化開發效率。',
      },
      {
        tool: 'Devin',
        scenario: [
          '快速查找商業邏輯',
          '確認方法命名與定義',
          '確保符合產品規範',
        ],
        insight: '邏輯探索與規範遵循的利器。能夠在開發新功能時，迅速消化商業邏輯，並提供高準確度、符合專案規範的程式碼結構報告。',
      },
    ],
    knowledge: [
      {
        tool: 'ChatGPT / Gemini',
        scenario: [
          '邏輯的簡單查詢',
          '通用知識檢索',
          '文件摘要與分析',
        ],
        insight: '由 ChatGPT 轉向 Gemini。上半年主要用於通用資料檢索與邏輯驗證，後期轉向 Gemini 以探索其更強大的整合與多模態能力。',
      },
      {
        tool: 'ClaudeCode',
        scenario: [
          '複雜程式架構分析',
          '深度程式邏輯推理',
          '跨文件代碼關聯性檢查',
        ],
        insight: '因速度考量暫緩日常使用。與 Copilot 的即時輔助不同，ClaudeCode 適合複雜邏輯分析與深度推理，但在沒有 UI 支援且速度不夠快的情況下，影響了即時互動的體驗，故暫時降低其使用頻率。建議用於 Copilot 無法快速解決的複雜問題。',
      },
    ],
    breakthrough: [
      {
        model: 'Claude Sonnet 4.5',
        achievement: '能產生「十分好的規格」',
        painPoint: '無法遵循專案的通用寫法，AI會「幻想」自己的優化寫法，導致產出結果不符合專案規範',
      },
      {
        model: 'Claude Opus 4.5（頂級模型）',
        achievement: '準確率達 90%，規格產出符合專案規範，為 SDD 自動化帶來了曙光',
        painPoint: undefined,
      },
    ],
  },
  keyLearnings: {
    pain: '用 AI 過程中來來回回其實都是失敗居多，過程中其實蠻累的，到頭來得到不可行，一切還是得自己做，直到 Opus 出世以後為 SDD 帶來了一絲曙光。',
    breakthrough: [
      'AI 應用是一段充滿失敗嘗試（Trial and Error）的歷程',
      '只要找到對的模型（Model Selection）和對的場景（Scenario），效率的提升就是指數級的',
    ],
    insights: [
      {
        oldBeief: '提示工程（Prompt）是決定輸出的唯一要素',
        newExperience: '模型能力（Model）是決定輸出的最重要要素，提示工程是輔助',
        lesson: '不要過度依賴「提示詞優化」，應先投資於更強大的模型',
      },
      {
        oldBeief: '所有 AI 工具都能用來解決所有問題',
        newExperience: '需根據任務類型精選工具',
        lesson: 'Copilot → 即時補全 / Devin → 複雜邏輯 / Opus → SDD自動化',
      },
      {
        oldBeief: '速度是次要考量',
        newExperience: '互動速度是影響日常工作採用意願的關鍵要素',
        lesson: 'ClaudeCode 的經驗教訓：無論能力多強，慢速反應會直接降低使用意願',
      },
    ],
  },
  nextSteps: {
    shortTerm: [
      {
        title: '實施「Opus/Top Model」效益分享會',
        details: [
          '以 SDD 自動化為核心案例',
          '分享模型升級帶來的巨大轉變',
          '激勵同仁嘗試更高階的付費/頂級模型',
          '預期影響：提升公司整體 AI 應用意願',
        ],
      },
      {
        title: 'Devin 協作流程標準化',
        details: [
          '將 Devin 輸出結果 → Copilot 實作這套工作流程標準化',
          '作為「情境案例」分享給所有開發人員',
          '提供標準化模板與最佳實踐',
        ],
      },
      {
        title: '推動「失敗與成功」經驗分享目標',
        details: [
          '要求每人必須分享一個「失敗的嘗試與教訓」',
          '要求每人必須分享一個「成功的突破與應用」',
          '讓經驗交流更加真實與深入',
        ],
      },
    ],
    midTerm: [
      '建立 AI 工具最佳實踐知識庫',
      '定期舉辦跨部門的 AI 應用工作坊',
      '量化 AI 應用對開發效率的提升（時間與質量指標）',
    ],
  },
  kpis: [
    {
      metric: '參與分享人數',
      target: '100% 開發人員',
      remark: '每人至少2個經驗分享',
    },
    {
      metric: 'SDD 自動化應用率',
      target: '80%+',
      remark: '新規格文件使用自動化工具生成',
    },
    {
      metric: '開發效率提升',
      target: '15-20%',
      remark: '相同工作量下的工作時間縮減',
    },
    {
      metric: 'AI 工具日均使用頻率',
      target: '提升 30%',
      remark: '基於工具使用統計',
    },
  ],
};
