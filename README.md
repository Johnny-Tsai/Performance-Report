# 績效報告系統

這是一個使用 Vite + React + TypeScript 建立的多年度績效報告系統，支援動態切換年度、自動偵測可用年度。

## 功能特色

- **多年度支援** - 支援切換不同年度的績效報告
- **自動偵測** - 自動偵測可用年度，無需手動配置
- **KPI 指標展示** - 圖表化呈現關鍵績效指標達成狀況
- **重點亮點專案** - 展示年度重要專案與技術亮點
- **工作清單** - 從 CSV 動態載入工作項目，支援搜尋、篩選、排序
- **流程標準化** - 詳細記錄技術改版進度
- **AI 績效報告** - 記錄 AI 工具應用實踐

## 快速開始

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
npm run dev
```

### 建置生產版本
```bash
npm run build
```

### 部署到 GitHub Pages
```bash
npm run deploy
```

## 專案結構

```
Web/
├── src/
│   ├── components/           # 共用元件
│   │   └── layout/           # 佈局元件
│   │       ├── YearSelector.tsx    # 年度選擇器
│   │       └── AppLayout.tsx       # 應用佈局
│   ├── context/
│   │   └── YearContext.tsx   # 年度狀態管理
│   ├── data/
│   │   ├── dataLoader.ts     # 動態資料載入器
│   │   └── years/            # 年度資料目錄
│   │       └── 2025/
│   │           ├── performanceData.ts
│   │           ├── standardizationData.ts
│   │           └── aiPerformanceData.ts
│   ├── hooks/
│   │   └── useYear.ts        # 年度 Hook
│   ├── pages/                # 頁面元件
│   │   ├── MainPage.tsx
│   │   ├── HighlightProjectsPage.tsx
│   │   ├── StandardizationPage.tsx
│   │   └── AIPerformancePage.tsx
│   ├── types/                # TypeScript 型別定義
│   └── utils/                # 工具函數
├── public/
│   └── data/
│       ├── years.json        # 可用年度配置（自動產生）
│       └── 2025/
│           ├── worklist.csv  # 工作清單
│           └── screenshots/  # 功能截圖
│               ├── QM/
│               ├── SEC/
│               └── ...
└── scripts/
    └── detectYears.js        # 年度自動偵測腳本
```

## 路由結構

| 路由 | 說明 |
|------|------|
| `/` | 重導向至最新年度 |
| `/:year` | 年度主頁（績效總覽） |
| `/:year/highlight-projects` | 亮點專案頁 |
| `/:year/standardization` | 流程標準化頁 |
| `/:year/ai-performance` | AI 績效報告頁 |

## 新增年度資料

### 步驟 1：建立年度資料檔案

在 `src/data/years/` 下建立新的年度目錄：

```
src/data/years/2026/
├── performanceData.ts      # 必要：主要績效資料
├── standardizationData.ts  # 選用：流程標準化資料
└── aiPerformanceData.ts    # 選用：AI 績效報告資料
```

### 步驟 2：編輯績效資料

複製現有年度的檔案作為範本，修改資料內容：

```typescript
// src/data/years/2026/performanceData.ts
import { PerformanceData, WorkStats, HighlightProject } from '../../../types/performance';

export const workStats: WorkStats = {
  commits: 300,
  modules: 20,
  // ...
};

export const performanceData: PerformanceData = {
  personalInfo: {
    name: '蔡中凡',
    title: '軟體工程師',
    department: '資訊服務部',
    employeeId: 'LJ24003',
    reviewPeriod: '2026年1月 - 2026年12月',
    manager: '周宗瑋',
  },
  // ...
};

export const highlightProjects: HighlightProject[] = [
  // ...
];
```

### 步驟 3：建立靜態資源目錄

在 `public/data/` 下建立年度資源目錄：

```
public/data/2026/
├── worklist.csv              # 工作清單 CSV
└── screenshots/              # 功能截圖
    ├── ProjectA/
    └── ProjectB/
```

### 步驟 4：執行專案

```bash
npm run dev
```

系統會自動偵測新年度並更新 `public/data/years.json`，年度選擇器會顯示所有可用年度。

## 資料格式說明

### performanceData.ts

| 欄位 | 說明 |
|------|------|
| `personalInfo` | 個人基本資料 |
| `summary` | 績效摘要與評分 |
| `kpis` | 關鍵績效指標 |
| `achievements` | 重大成就 |
| `projects` | 專案經歷 |
| `skills` | 技能評估 |
| `goals` | 年度目標 |
| `feedback` | 360度回饋 |
| `annualGoals` | 年度績效目標（工作目標 + 核心職能） |

### worklist.csv

CSV 欄位對應：

| 欄位 | 說明 |
|------|------|
| ID | 工作項目編號 |
| Work Item Type | 類型（工作/Bug） |
| Title | 描述 |
| State | 狀態 |
| Priority | 優先級 (1-4) |
| Changed Date | 日期 |
| Area Path | 專案路徑 |
| Iteration Path | 迭代路徑（用於年度篩選） |

## 自訂配置

### 修改基礎路徑

編輯 `vite.config.ts`：

```typescript
export default defineConfig({
  base: '/your-custom-path/',
  // ...
});
```

### 手動指定年度配置

如不使用自動偵測，可手動編輯 `public/data/years.json`：

```json
{
  "years": [
    {
      "year": 2025,
      "displayName": "2025 年度",
      "csvPath": "/data/2025/worklist.csv",
      "screenshotsPath": "/data/2025/screenshots",
      "isActive": true
    },
    {
      "year": 2024,
      "displayName": "2024 年度",
      "csvPath": "/data/2024/worklist.csv",
      "screenshotsPath": "/data/2024/screenshots",
      "isActive": false
    }
  ],
  "defaultYear": 2025
}
```

## 技術架構

- **Vite 7** - 快速的前端建置工具
- **React 19** - 使用者介面框架
- **React Router 7** - 客戶端路由
- **TypeScript 5** - 型別安全的 JavaScript
- **Tailwind CSS 3** - 實用優先的 CSS 框架
- **Chart.js** - 圖表視覺化

## 常見問題

### Q: 年度選擇器沒有顯示新增的年度？

確認以下事項：
1. `src/data/years/{year}/performanceData.ts` 檔案存在
2. 執行 `npm run dev` 或 `npm run build` 觸發自動偵測
3. 檢查 `public/data/years.json` 是否已更新

### Q: 工作清單沒有顯示資料？

確認以下事項：
1. `public/data/{year}/worklist.csv` 檔案存在
2. CSV 的 Iteration Path 欄位包含正確的年度（如 `\2025\`）

### Q: 截圖沒有顯示？

確認圖片路徑：
- 截圖應放在 `public/data/{year}/screenshots/{ProjectCode}/`
- `performanceData.ts` 中的 `screenshots.image` 路徑格式為 `/{ProjectCode}/filename.png`

## 授權

MIT License
