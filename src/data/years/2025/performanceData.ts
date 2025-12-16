import { PerformanceData, WorkStats, HighlightProject } from '../../../types/performance';

// 年度工作統計
export const workStats: WorkStats = {
  commits: 265,
  modules: 15,
  enhancements: 80,
  reports: 20,
  bugFixes: 40,
  refactors: 15,
};

// 亮點專案資料
export const highlightProjects: HighlightProject[] = [
  {
    id: 'qm',
    name: '品質管理系統',
    code: 'QM',
    stars: 3,
    period: '7月 - 10月',
    commits: 30,
    description: '從零建立完整的品質管理系統，包含檢驗項目、檢驗方式、品項檢驗及多種檢驗紀錄單',
    modules: [
      { code: 'UC_QM_01', name: '檢驗項目管理', description: '建立檢驗項目基礎資料' },
      { code: 'UC_QM_02', name: '檢驗方式管理', description: '定義各種檢驗方法' },
      { code: 'UC_QM_03', name: '品項檢驗方式', description: '品項與檢驗方式關聯' },
      { code: 'UC_QM_04', name: '進貨檢驗紀錄單', description: '進貨品質把關' },
      { code: 'UC_QM_05', name: '成品檢驗紀錄單', description: '出貨品質確認' },
      { code: 'UC_QM_06', name: '設備檢驗紀錄單', description: '設備狀態管理' },
      { code: 'UC_QM_07', name: '檢驗紀錄單', description: '通用檢驗文件' },
    ],
    techHighlights: [
      { pattern: '檢驗方式管理', application: '動態資料型態', description: '支援數字/選單/日期/文字四種資料型態，各有不同標準值、上下限值、預設值設定' },
      { pattern: '品項檢驗方式', application: '彈性檢驗配置', description: '可針對特定品項設定專屬檢驗方式，支援抽檢方式與數量設定' },
      { pattern: '進貨檢驗紀錄單', application: '智慧帶入與判定', description: '自動帶入品項或檢驗方式設定，依資料型態即時判定結果，前後端共用判定邏輯' },
    ],
    businessValue: [
      '建立完整品質追溯機制，符合食品安全法規要求',
      '支援 ISO 品質認證所需之文件記錄',
      '減少人工紙本作業，提升檢驗效率',
    ],
    screenshots: [
      {
        name: '檢驗方式管理',
        image: 'QM/2025-12-01_164213.png',
        highlights: [
          '依照資料型態而有不同的標準值、上下限值、預設值',
          '數字型態：可設定上限值、下限值',
          '選單型態：可設定標準值選項',
          '日期型態：無需設定標準值',
          '文字型態：無需設定標準值',
        ],
      },
      {
        name: '品項檢驗方式',
        image: 'QM/2025-12-01_164656.png',
        highlights: [
          '設定品項預設有哪些檢驗方式',
          '可針對特定品項設定專屬的檢驗方式',
          '支援多種檢驗紀錄單類型（進貨檢驗單、成品檢驗單等）',
          '可設定抽檢方式與抽檢數量',
        ],
      },
      {
        name: '進貨檢驗紀錄單',
        image: 'QM/2025-12-01_164820.png',
        highlights: [
          '會預設帶入「品項檢驗方式」所設定的檢驗項目，若沒有則帶入「檢驗方式」所設定的檢驗項目',
          '依照資料型態不同而自動判定結果',
          '選單型態：檢驗結果是否在標準值清單中',
          '數字型態：檢驗結果是否符合標準值或在上下限範圍內',
          '核心亮點：檢驗項目共同邏輯前後端抽出（後端 QMInspectionJudgmentBLL、前端 InspectionItemDetailsGridEditors.js）',
        ],
      },
    ],
  },
  {
    id: 'sec',
    name: '內控預警系統',
    code: 'SEC',
    stars: 3,
    period: '3月 - 11月',
    commits: 50,
    description: '建立企業內部控制與異常預警機制，支援即時異常通知與行動版操作',
    modules: [
      { code: 'UC_SEC_01', name: '流程分類管理', description: '定義業務流程類別' },
      { code: 'UC_SEC_02', name: '檢核點資料設定', description: '設定各流程檢核項目' },
      { code: 'UC_SEC_03', name: '公司檢核點設定', description: '公司層級檢核配置' },
      { code: 'UC_SEC_04', name: '人員檢核權限設定', description: '權限細緻化管理' },
      { code: 'UC_SEC_05', name: '異常警示', description: '即時異常通知' },
    ],
    techHighlights: [
      { pattern: 'Dynamic SQL', application: '異常查詢', description: '執行期動態組建 View 查詢' },
      { pattern: 'SQL Security', application: '防注入攻擊', description: 'SqlSecurityTool 5 種驗證方法' },
      { pattern: 'Vue Component', application: '前端元件化', description: 'Sidebar/Tag/Mixin 可重用元件' },
      { pattern: 'SignalR', application: '即時進度', description: 'Excel 匯出進度即時推播' },
      { pattern: 'Generic Method', application: '泛型查詢', description: 'GetModifyData<T>() 支援多種 ViewModel' },
      { pattern: 'kendoTreeList', application: '階層式權限管理', description: '解決原生限制與業務需求衝突，實現雙向資料移動' },
      { pattern: 'VueDraggable', application: '拖曳排序', description: '支援水平與垂直方向的檢核點排序' },
    ],
    businessValue: [
      '強化企業內部控制，降低營運風險',
      '即時預警機制，提早發現異常狀況',
      '符合公司治理與稽核要求',
    ],
    screenshots: [
      {
        name: '檢核點資料設定',
        image: 'SEC/2025-08-15_141426.png',
        highlights: [
          '檢核點基本資料管理：代號、名稱、流程分類、類型、模組別',
          '檢核點類型：凌駿標準 / 客戶自訂',
          '檢核類型：提醒 / 預警 / 逾期',
          'View 名稱設定：指定動態查詢的資料庫 View',
          '欄位設定：自訂報表顯示欄位，支援多語系 Key 值對應',
        ],
      },
      {
        name: '人員檢核權限設定',
        image: 'SEC/2025-12-01_173600.png',
        highlights: [
          '透過左右雙面板實現檢核點的授權管理',
          'kendoTreeList 實作：篩選時保留原始資料、已打勾資料不能取消選取',
          '解決 TreeList 原生限制：將非階層檢核點資料組織成群組形式',
          '群組行顯示邏輯：最上層內控循環群組特殊顯示格式',
          '資料結構重組：平面資料動態重組為父子關係，維持展開/收合狀態',
        ],
      },
      {
        name: '異常警示儀表板',
        image: 'SEC/2025-08-15_143019.png',
        highlights: [
          '側邊欄元件 (Vue 獨立元件)：6 種內控循環切換',
          '統計標籤：逾期/預警/提醒項目數與筆數，Computed 動態計算',
          '卡片式佈局：依流程分類顯示各檢核點異常數量',
        ],
      },
      {
        name: '檢核點明細查詢',
        image: 'SEC/2025-08-15_143233.png',
        highlights: [
          '動態分頁：實作動態分頁功能 (如 100/2592)',
          '列表頁/說明頁切換：支援檢核點說明資訊查看',
          '欄位動態配置：依檢核點設定的欄位定義動態顯示',
        ],
      },
      {
        name: 'SignalR 即時進度回報',
        image: 'SEC/2025-08-15_143330.png',
        highlights: [
          'Hub 連線初始化：頁面載入時建立 SignalR 連線，註冊進度更新回調',
          '進度更新處理：透過 ProgressTool.SendProgress 即時傳送匯出進度',
          '前端進度顯示：接收進度後更新 UI 顯示',
        ],
      },
      {
        name: '拖曳排序設定',
        image: 'SEC/2025-08-15_144220.png',
        highlights: [
          'VueDraggable 整合：實現檢核點的拖曳排序功能',
          '支援左右拖曳：流程分類間水平拖曳',
          '支援上下拖曳：檢核點項目垂直排序',
          '樣式切換：流程分類啟用/停用狀態切換',
        ],
      },
    ],
  },
  {
    id: 'gm',
    name: '團膳報表',
    code: 'GM',
    stars: 3,
    period: '1月 - 9月',
    commits: 35,
    description: '完整支援政府食登申報作業，包含多項報表與菜單匯出功能',
    modules: [
      { code: 'UC_SRGM_01', name: '三章一Q每日食材驗收表', description: '符合政府食登規範' },
      { code: 'UC_SRGM_02', name: '多餐學校菜單表', description: '學校供餐菜單管理' },
      { code: 'UC_SRGM_03', name: '多餐食材資料表', description: '食材登錄資料整合' },
      { code: 'UC_SRGM_04', name: '菜單明細表', description: '菜單內容詳細報表' },
      { code: 'UC_SRGM_05', name: '食材統計表', description: '食材用量分析' },
      { code: 'UC_SRGM_06', name: '供餐單位別食材統計表', description: '分單位食材統計' },
    ],
    businessValue: [
      '完整支援政府食登申報作業',
      '提升團膳業者營運效率',
      '強化食材追溯與管理',
    ],
    screenshots: [
      {
        name: '001 三章一Q每日食材驗收表',
        image: 'GM/2025-12-01_175220.png',
        highlights: ['符合政府食登規範的每日食材驗收報表'],
      },
      {
        name: '002 多餐學校菜單表',
        image: 'GM/2025-12-01_175309.png',
        highlights: ['學校供餐菜單管理報表'],
      },
      {
        name: '003 多餐食材資料表',
        image: 'GM/2025-12-01_175331.png',
        highlights: ['食材登錄資料整合報表'],
      },
      {
        name: '004 菜單明細表',
        image: 'GM/2025-12-01_175352.png',
        highlights: ['菜單內容詳細報表'],
      },
      {
        name: '005 食材統計表',
        image: 'GM/2025-12-01_175417.png',
        highlights: ['食材用量分析報表'],
      },
      {
        name: '006 供餐單位別食材統計表',
        image: 'GM/2025-12-01_175433.png',
        highlights: ['分單位食材統計報表'],
      },
    ],
  },
  {
    id: 'pm36',
    name: '分級進貨看板',
    code: 'PM',
    stars: 2,
    period: '6月 - 8月',
    commits: 15,
    description: '全新視覺化看板系統，支援等級顏色區分、跑馬燈速度調整等',
    modules: [
      { code: 'UC_PM_36', name: '分級進貨看板', description: '即時顯示待分級/已分級貨品' },
    ],
    techHighlights: [
      { pattern: 'Kendo Splitter', application: '雙層架構', description: '外層(左右分割)+內層(上下分割)，每層獨立配置和生命週期管理' },
      { pattern: '輪播與分頁同步', application: '雙向聯動', description: '輪播切換觸發分頁變更，分頁變更觸發輪播切換' },
      { pattern: '響應式佈局', application: '側邊欄縮合', description: '縮合狀態變更觸發分頁重置和輪播重新初始化' },
      { pattern: '動態網格佈局', application: 'CSS Grid', description: '根據側邊欄狀態動態調整 gridTemplateColumns' },
      { pattern: '分組資料結構', application: '智能分組', description: '明細資料按固定大小分組支援輪播顯示' },
      { pattern: '即時資料載入', application: 'async/await', description: 'Promise 非同步載入整合載入狀態管理' },
    ],
    businessValue: [
      '現場作業即時監控',
      '提升分級作業效率',
      '減少人工追蹤成本',
    ],
    screenshots: [
      {
        name: '分級看板總覽',
        image: 'PMPurchaseGradingDashboard/2025-08-15_153635.png',
        highlights: [
          '左側：等待分級中清單 (待分級/分級中狀態)',
          '右側：已分級完成字卡 (等級占比、規格明細)',
          '等級顏色視覺化區分',
          '即時訊息跑馬燈',
        ],
      },
      {
        name: '廠商選擇彈窗',
        image: 'PMPurchaseGradingDashboard/2025-08-15_153755.png',
        highlights: [
          '廠商篩選功能',
          '分頁瀏覽 (1/4)',
          '關鍵字搜尋',
        ],
      },
      {
        name: '已分級完成展開',
        image: 'PMPurchaseGradingDashboard/2025-08-15_154639.png',
        highlights: [
          '側邊欄縮合後展開更多字卡',
          '字卡輪播與分頁同步',
          '等級占比進度條',
          '規格明細 (等級、規格、總重量、計價量、占比)',
        ],
      },
    ],
  },
  {
    id: 'fmb',
    name: '花卉資料管理系統',
    code: 'FMB',
    stars: 2,
    period: '6月 - 10月',
    commits: 15,
    description: '花卉照片匯出、合成照自動產生、商品規格複製功能',
    modules: [
      { code: 'UC_FMB_21', name: '自動產生花卉合成照', description: '智慧圖片合成處理' },
      { code: 'UC_FMB_21', name: '商品規格新增複製功能', description: '提升建檔效率' },
      { code: 'UC_FMB_24', name: '花卉照片匯出', description: '批次匯出 PDF 功能' },
      { code: 'UC_SRSM_SL_41', name: '客戶訂購表', description: '客戶訂購報表' },
    ],
    techHighlights: [
      { pattern: 'GDI+ 圖片合成', application: '合成照產生', description: '800×600px 版面配置，左側主圖+右上文字+右下副圖' },
      { pattern: 'EntityTool 深層複製', application: '規格複製', description: 'CloneEntity() 深層複製實體，外鍵映射處理' },
      { pattern: 'QuestPDF', application: '照片匯出', description: 'A4 橫向 4 張照片網格佈局 (13.5×9.5cm)' },
      { pattern: 'Spire.XLS', application: '客戶訂購表', description: '訂貨單/銷貨單/銷退單多源合併，多幣別支援' },
    ],
    businessValue: [
      '花卉業者產品展示標準化',
      '自動化圖片處理，節省人力',
    ],
    screenshots: [
      {
        name: '自動產生花卉合成照',
        image: 'Flower/2025-12-02_093843.png',
        highlights: [
          'GDI+ 圖片合成技術',
          '800×600px 版面配置',
          '左側主圖 400×540px + 右上文字區塊 + 右下副圖 380×310px',
          '背景色：#E6E6E6',
        ],
      },
      {
        name: '花卉照片匯出',
        image: 'Flower/2025-12-02_093010.png',
        highlights: [
          'QuestPDF 報表產生',
          'A4 橫向版面',
          '4 張照片網格佈局 (2×2)',
          '每張照片尺寸：13.5×9.5cm',
        ],
      },
      {
        name: '客戶訂購表',
        image: 'Flower/2025-12-02_093503.png',
        highlights: [
          'Spire.XLS Excel 報表',
          '訂貨單/銷貨單/銷退單多源合併',
          '多幣別支援',
          '空運/海運提單類別',
        ],
      },
    ],
  },
  {
    id: 'wm',
    name: '倉儲單據 EXCEL 架構升級',
    code: 'WM',
    stars: 2,
    period: '5月 - 8月',
    commits: 15,
    description: '將多項倉儲單據報表升級至 EXCEL 架構',
    modules: [
      { code: 'WM10', name: '盤點卡', description: '盤點單報表' },
      { code: 'WM11', name: '盤點清單', description: '盤點清單報表' },
      { code: 'WM30', name: '調撥單', description: '調撥單報表' },
      { code: 'WM31', name: '調撥單2', description: '調撥單報表2' },
      { code: 'WM20', name: '報廢單', description: '報廢單報表' },
      { code: 'PM4C001', name: '進貨單', description: '進貨單報表' },
    ],
    techHighlights: [
      { pattern: 'EXCEL 架構', application: '報表統一', description: '統一報表輸出架構' },
    ],
    businessValue: [
      '統一報表輸出架構',
      '提升報表維護效率',
      '改善使用者操作體驗',
    ],
  },
  {
    id: 'tm',
    name: '理貨標籤列印',
    code: 'TM',
    stars: 2,
    period: '11月 - 12月',
    commits: 12,
    description: '標籤資料查詢介面、列印功能、自訂標籤版面',
    modules: [
      { code: 'UC_TM_06', name: '理貨標籤列印', description: '查詢+列表+列印實作' },
    ],
    techHighlights: [
      { pattern: 'Pipeline Pattern', application: '標籤產生管線', description: 'ITagPipeline 介面 + DelegatedTagPipeline 泛型委派' },
      { pattern: 'ITagDataProvider', application: '資料提供者介面', description: 'TallyTagDataProvider / SalesOrderTagDataProvider 差異封裝' },
      { pattern: 'Spire.PDF', application: '標準列印', description: '全聯外籃/產品/美廉社/全聯2 四種標籤格式' },
      { pattern: 'QuestPDF', application: '自訂列印', description: '使用者可在 SM_TagSetting 自訂版面配置' },
      { pattern: '計算邏輯內聚', application: 'ViewModel 封裝', description: 'TMTallyTagMergedData 整件數/尾箱數/散件張數計算' },
    ],
    businessValue: [
      '理貨作業標準化',
      '彈性標籤設計支援',
      '提升倉儲作業效率',
    ],
    screenshots: [
      {
        name: '標準列印',
        image: 'TMTallyTag/2025-12-02_102613.png',
        highlights: [
          'Spire.PDF 標籤產生',
          '全聯外籃/產品/美廉社/全聯2 四種標籤格式',
          '程式碼固定格式',
          '快速列印常用格式',
        ],
      },
      {
        name: '自訂列印',
        image: 'TMTallyTag/2025-12-02_102644.png',
        highlights: [
          'QuestPDF 標籤產生',
          '使用者可在 SM_TagSetting 自訂版面配置',
          '透過 TallyTagDataProvider 取得資料',
          '客製化版面配置需求',
        ],
      },
    ],
  },
  {
    id: 'contract',
    name: '合約專案管理',
    code: 'CSS',
    stars: 3,
    period: '1月 - 12月',
    commits: 27,
    description: '合約專案管理系統大幅功能擴充，涵蓋發票收款、里程碑管理、基本資料頁擴充等完整功能',
    modules: [
      { code: 'Contract_Invoice', name: '發票收款功能', description: '完整發票收款管理介面' },
      { code: 'Contract_Milestone', name: '里程碑管理', description: '新增預計交付日、實際交付日、逾期未驗收、金額(未稅)、負責人等欄位' },
      { code: 'Contract_Basic', name: '基本資料頁擴充', description: '新增母案號、停用報工、農易訂方案、終止續約等功能' },
      { code: 'Contract_List', name: '列表頁功能', description: '欄位可拖曳拉寬、立案通知背景排程' },
    ],
    techHighlights: [
      { pattern: 'EF Core Migration', application: '資料庫欄位擴充', description: '使用 Code First 進行 AddColumn_fileId_in_CustomerProjectMilestone 等 Migration' },
      { pattern: '背景排程', application: '立案通知自動化', description: '實作 ProjectInitiationNotificationJob 進行立案通知自動發送' },
      { pattern: '前端互動優化', application: '欄位可拖曳拉寬', description: '提升使用者列表操作體驗' },
      { pattern: '檔案上傳整合', application: '里程碑附件', description: '擴充 UploadFileRefType 列舉，里程碑明細支援檔案附件功能' },
    ],
    businessValue: [
      '完整合約生命週期管理，從立案到結案全程追蹤',
      '里程碑逾期預警機制，提升專案執行效率',
      '發票收款管理，確保收款進度透明化',
    ],
  },
  {
    id: 'excel-framework',
    name: 'Excel 報表框架',
    code: 'CSS',
    stars: 2,
    period: '2月 - 12月',
    commits: 3,
    description: '建立通用 Excel 報表匯出服務架構，使用 Builder Pattern 設計可擴充的報表系統',
    modules: [
      { code: 'ExcelExportService', name: 'Excel 匯出服務', description: '統一報表匯出服務基底' },
      { code: 'WorksheetBuilder', name: '工作表建構器', description: 'Builder Pattern 建構 Excel 工作表' },
      { code: 'ExcelBodyTool', name: '輔助工具', description: '報表內容輔助處理工具' },
    ],
    techHighlights: [
      { pattern: 'Builder Pattern', application: '工作表建構', description: '使用 WorksheetBuilder 建構器模式，靈活組建 Excel 工作表' },
      { pattern: '屬性驅動', application: '欄位設定', description: '使用 GroupAttribute、NumberAttrColumn 等屬性進行報表欄位配置' },
      { pattern: '可擴充架構', application: 'BaseExcelOptions', description: '基礎類別支援各種報表擴充，統一匯出介面' },
      { pattern: '完整文件', application: '使用範例', description: '提供 ExcelExportServiceUsageExample.cs 與 README.md 說明文件' },
    ],
    businessValue: [
      '統一報表輸出架構，減少重複開發',
      '提升報表維護效率，易於擴充新報表',
      '標準化報表格式，確保輸出品質一致',
    ],
  },
  {
    id: 'dashboard',
    name: '首頁數據分析儀表板',
    code: 'CSS',
    stars: 2,
    period: '4月 - 11月',
    commits: 5,
    description: '首頁數據分析檢視功能，實作逾期合約追蹤儀表板',
    modules: [
      { code: 'OverdueStats', name: '逾期合約追蹤', description: '逾期合約統計與分類顯示' },
      { code: 'OverdueCategory', name: '逾期分類', description: '逾期類別列舉定義' },
      { code: 'OverduePeriod', name: '逾期區間', description: '逾期時間區間列舉定義' },
    ],
    techHighlights: [
      { pattern: '儀表板設計', application: '即時統計', description: '首頁即時顯示逾期合約統計，支援分類與區間篩選' },
      { pattern: '列舉驅動', application: '分類管理', description: '使用 OverdueCategory、OverduePeriod 列舉定義逾期分類與區間，易於維護' },
      { pattern: '前後端分離', application: '模組化 JavaScript', description: '獨立的 home.index.overdue.js 模組處理逾期追蹤邏輯' },
      { pattern: '部分檢視', application: 'Partial View', description: '使用 _partial_index_overdue.cshtml 部分檢視，支援動態載入' },
    ],
    businessValue: [
      '即時掌握逾期合約狀況，提早處理風險',
      '視覺化呈現數據，快速理解業務狀態',
      '提升管理決策效率，降低合約逾期損失',
    ],
  },
  {
    id: 'notification',
    name: '通知中心與最新消息',
    code: 'CSS',
    stars: 1,
    period: '1月 - 4月',
    commits: 6,
    description: '通知中心管理與最新消息系統功能優化，支援登入推播與郵件通知',
    modules: [
      { code: 'NotificationCenter', name: '通知中心管理', description: '通知標籤與分類優化' },
      { code: 'Announcement', name: '最新消息管理', description: '公告發布與郵件通知' },
      { code: 'LoginBroadcast', name: '登入推播', description: '登入時重要公告推播' },
    ],
    techHighlights: [
      { pattern: '通知池架構', application: 'AnnouncementPool', description: '使用通知池管理公告，支援狀態追蹤' },
      { pattern: '背景郵件發送', application: 'SendTool 整合', description: '公告發布後自動發送 Email 通知' },
      { pattern: '通知狀態追蹤', application: 'jobId 機制', description: '透過 jobId 追蹤通知發送狀態與結果' },
      { pattern: '登入後推播', application: '即時通知', description: '整合 FrontNotificationListService，登入後即時顯示重要公告' },
    ],
    businessValue: [
      '重要訊息即時傳達，提升資訊傳遞效率',
      '郵件自動通知，確保訊息觸達率',
      '登入推播機制，關鍵公告不遺漏',
    ],
  },
  {
    id: 'select-picker',
    name: 'Select Picker 優化',
    code: 'ERP',
    stars: 2,
    period: '8月 - 11月',
    commits: 9,
    description: '建立 Web Component 架構的下拉選單元件，採用原生標準實現跨框架相容',
    modules: [
      { code: 'SelectPickerComponent', name: 'Web Component 元件', description: '原生 customElements.define 標準實作' },
      { code: 'TaskQueue', name: '任務排隊機制', description: 'Generator 函數實現非同步任務佇列' },
      { code: 'BaseComponent', name: '基礎元件擴充', description: '共用屬性型別轉換與驗證邏輯' },
    ],
    techHighlights: [
      { pattern: 'Web Component', application: 'customElements.define', description: '繼承 AbstractComponent 基礎類別，統一元件生命週期管理' },
      { pattern: 'TaskQueue', application: 'Generator 函數', description: '使用 async* 實現非同步任務佇列，防止 API 重複呼叫與 race condition' },
      { pattern: 'observedAttributes', application: '屬性監聯', description: '監聽 loadurl、multiple、placeholder、value、disabled、canSearch、delay 屬性變更' },
      { pattern: 'onlyRunLast', application: '防抖機制', description: '只執行最後一個待處理任務，避免連續操作造成的效能問題' },
    ],
    businessValue: [
      '統一 API：各模組使用相同的 <select-picker> 標籤語法',
      '自動載入：透過 loadurl 屬性自動取得下拉選項',
      '跨框架相容：原生標準可與任何前端框架整合',
    ],
    codeSnippets: [
      {
        title: 'TaskQueue 任務排隊機制',
        language: 'javascript',
        code: `class TaskQueue {
    constructor(options = {}) {
        this.queue = [];
        this.isProcessing = false;
        this.options = {
            enqueueCallback: () => {},
            dequeueCallback: () => {},
            clearCallback: () => {},
            onlyRunLast: false,
            ...options
        };
    }

    async *processQueue() {
        while (this.queue.length > 0) {
            const task = this.options.onlyRunLast 
                ? this.queue.pop() 
                : this.queue.shift();
            if (this.options.onlyRunLast) this.queue = [];
            yield await task();
            this.options.dequeueCallback();
        }
        this.options.clearCallback();
    }

    enqueue(task) {
        this.queue.push(task);
        this.options.enqueueCallback();
        if (!this.isProcessing) this.run();
    }
}`,
      },
      {
        title: 'Web Component 屬性監聽',
        language: 'javascript',
        code: `class SelectPickerComponent extends AbstractComponent {
    static get observedAttributes() {
        return ['loadurl', 'multiple', 'placeholder', 
                'value', 'disabled', 'cansearch', 'delay'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        switch (name) {
            case 'loadurl':
                this.taskQueue.enqueue(() => this.loadData(newValue));
                break;
            case 'value':
                this.setValue(newValue);
                break;
        }
    }
}
customElements.define('select-picker', SelectPickerComponent);`,
      },
    ],
  },
  {
    id: 'vue-optimization',
    name: 'Vue 元件優化',
    code: 'ERP',
    stars: 2,
    period: '8月 - 11月',
    commits: 9,
    description: 'Vue 元件架構重構，建立 Mixin 共用機制並移除冗餘程式碼',
    modules: [
      { code: 'SelectPickerMixin', name: 'Vue Mixin', description: '共用 props、methods、computed' },
      { code: 'VueSelectPickerComponent', name: 'Vue 包裝器', description: '封裝 Web Component 的 Vue 整合層' },
      { code: 'FMBSelectPickerComponent', name: 'FMB 專用元件', description: '花卉模組客製化需求' },
    ],
    techHighlights: [
      { pattern: 'Mixin Pattern', application: 'SelectPickerMixin', description: '共用 props、methods、computed，統一事件處理' },
      { pattern: 'v-model 雙向綁定', application: 'Vue 整合', description: 'handleInput/handleChange/handleLoadComplete 事件封裝' },
      { pattern: '程式碼精簡', application: '移除冗餘', description: '刪除 VueCommon.js (547行) 與 SelectPickerComponent.all.js (341行)' },
      { pattern: '框架整合', application: 'Web Component + Vue', description: 'Web Component 與 Vue 無縫協作' },
    ],
    businessValue: [
      '程式碼精簡：淨減少 207 行，移除重複邏輯',
      'Mixin 共用：統一事件處理機制',
      '維護性提升：集中管理元件邏輯',
    ],
    codeSnippets: [
      {
        title: 'SelectPickerMixin 共用邏輯',
        language: 'javascript',
        code: `const SelectPickerMixin = {
    props: {
        value: { type: [String, Array], default: '' },
        multiple: { type: Boolean, default: false },
        searchMode: Boolean,
        canSearch: Boolean,
        placeholder: String,
        disabled: Boolean,
        loadurl: String,
    },
    methods: {
        handleInput(value) {
            this.$emit('input', value);
        },
        handleChange(value) {
            this.$emit('change', value);
            if (this.onchange) this.onchange(value);
        },
        handleLoadComplete() {
            this.$emit('load-complete');
        }
    }
};`,
      },
      {
        title: 'Vue 元件包裝 Web Component',
        language: 'javascript',
        code: `Vue.component('vue-select-picker', {
    mixins: [SelectPickerMixin],
    template: \`
        <select-picker
            :loadurl="loadurl"
            :multiple="multiple"
            :placeholder="placeholder"
            :value="value"
            :disabled="disabled"
            :can-search="canSearch"
            @input="handleInput"
            @change="handleChange"
            @load-complete="handleLoadComplete">
        </select-picker>
    \`
});`,
      },
    ],
  },
  {
    id: 'kendo-grid',
    name: 'KendoGrid 優化',
    code: 'ERP',
    stars: 2,
    period: '12月 - 1月',
    commits: 6,
    description: '建立 ProdSpecBox 商品燈箱元件，統一多個模組的品項選擇介面',
    modules: [
      { code: 'ProdSpecBox', name: '商品燈箱元件', description: '封裝 Fancybox 燈箱開啟邏輯' },
      { code: 'ProductCombobox', name: '品項下拉選單', description: '整合 Kendo Grid 內的品項選擇' },
      { code: 'kendoGridV2', name: 'Grid 擴充', description: '新版 Kendo Grid 工具函式' },
    ],
    techHighlights: [
      { pattern: 'ProdSpecBox', application: '商品燈箱標準化', description: '封裝單選/多選商品選擇介面，支援驗證函數' },
      { pattern: '模組整合', application: '5 個業務模組', description: 'PMPurchaseQuotation、PMFirmPriceSetting、PMPurchaseCost、GMRecipe、GFFarmerSupplySetting' },
      { pattern: '參數配置', application: '燈箱選項', description: 'IsMulti、IsNeedFirmProd、IsNeedSupplierProd、IsFallowGetPriceOrder 等配置' },
      { pattern: '程式碼重用', application: '統一介面', description: '修改燈箱邏輯只需調整單一檔案 kendoGridV2.js' },
    ],
    businessValue: [
      '商品燈箱標準化：統一 5 個模組的品項選擇介面',
      '程式碼重用：ProdSpecBox 類別可供其他模組直接使用',
      '維護性提升：修改燈箱邏輯只需調整單一檔案',
    ],
    codeSnippets: [
      {
        title: 'ProdSpecBox 商品燈箱類別',
        language: 'javascript',
        code: `class ProdSpecBox {
    constructor(options = {}, validateFunc = null) {
        this.options = {
            ModelType: 0,
            IsMulti: false,
            IsNeedFirmProd: false,
            IsNeedSupplierProd: false,
            IsFallowGetPriceOrder: false,
            FirmID: 0,
            CurrencyID: null,
            TaxType: null,
            ...options
        };
        this.validateFunc = validateFunc;
    }

    Single(callback) {
        this.options.IsMulti = false;
        this._open(callback);
    }

    Multiple(callback) {
        this.options.IsMulti = true;
        this._open(callback);
    }

    _open(callback) {
        const url = this._buildUrl();
        $.fancybox.open({ src: url, type: 'iframe' });
    }
}`,
      },
      {
        title: '使用範例',
        language: 'javascript',
        code: `// 單選商品
const prodBox = new ProdSpecBox({
    ModelType: 1,
    FirmID: currentFirmID,
    IsNeedFirmProd: true
});

prodBox.Single((selectedItem) => {
    grid.dataSource.add({
        ProdID: selectedItem.ProdID,
        ProdName: selectedItem.ProdName,
        Spec: selectedItem.Spec,
        Price: selectedItem.Price
    });
});

// 多選商品
prodBox.Multiple((selectedItems) => {
    selectedItems.forEach(item => {
        grid.dataSource.add(item);
    });
});`,
      },
    ],
  },
];

// 日常工作量化指標
export const workMetrics = [
  {
    id: 'test_coverage',
    name: '測試覆蓋率',
    current: 87,
    target: 85,
    unit: '%',
    trend: 'up' as const,
    description: '單元測試覆蓋率需達到85%以上，目前已達87%，表現良好。包含所有核心功能模組的測試案例，確保程式碼品質。',
  },
  {
    id: 'task_completion',
    name: '任務完成率',
    current: 96,
    target: 95,
    unit: '%',
    trend: 'up' as const,
    description: '按時完成分配的工作項目，目前完成率96%，超越目標。包含功能開發、Bug修復、文件撰寫等各項任務。',
  },
  {
    id: 'bug_fix_time',
    name: 'Bug修復時間',
    current: 1.5,
    target: 2.0,
    unit: '天',
    trend: 'up' as const,
    description: '平均Bug修復時間1.5天，優於目標2天。快速回應問題並提供有效解決方案，提升系統穩定性。',
  },
  {
    id: 'code_review',
    name: '程式碼審查通過率',
    current: 94,
    target: 90,
    unit: '%',
    trend: 'stable' as const,
    description: '程式碼審查通過率94%，符合團隊開發標準。注重程式碼品質、可讀性和安全性，減少後續維護成本。',
  },
  {
    id: 'cross_team_help',
    name: '跨部門協助案件',
    current: 8,
    target: 12,
    unit: '件',
    trend: 'down' as const,
    description: '本季協助其他部門解決技術問題8件，目標12件。主要協助內容包含系統整合、資料分析、技術諮詢等。',
  },
  {
    id: 'satisfaction_score',
    name: '問題解決滿意度',
    current: 4.3,
    target: 4.0,
    unit: '/5.0',
    trend: 'up' as const,
    description: '問題解決滿意度4.3分，超越目標4.0分。獲得同事和其他部門的正面回饋，解決方案具實用性和可行性。',
  },
];

// 這是範例資料，您可以替換成自己的績效資料
export const performanceData: PerformanceData = {
  personalInfo: {
    name: '蔡中凡',
    title: '軟體工程師',
    department: '產品開發部(TDD)',
    employeeId: 'LJ24003',
    reviewPeriod: '2025 年度',
    manager: '周宗瑋',
  },
  
  summary: {
    overallRating: 4,
    highlights: `
      • 獨立開發 2 大全新模組（品質管理系統、內控預警系統）
      • 完成 265 筆 Commit，涵蓋 15+ 個完整模組開發
      • 完成 6+ 個團膳報表，符合政府食登規範
      • 升級 6+ 個倉儲報表至 EXCEL 架構
      • 開發視覺化看板（分級進貨即時監控）
      • 支援多客戶客製化需求（YSH、漢光、蜀隆等）
    `,
    areasOfImprovement: `
      • 持續精進系統架構設計能力
      • 加強技術文件撰寫完整度
    `,
  },
  
  kpis: [
    {
      id: 'kpi-1',
      name: '專案完成率',
      target: 90,
      actual: 95,
      unit: '%',
      weight: 30,
      status: 'exceeded',
    },
    {
      id: 'kpi-2',
      name: '客戶滿意度',
      target: 4.0,
      actual: 4.5,
      unit: '分',
      weight: 25,
      status: 'exceeded',
    },
    {
      id: 'kpi-3',
      name: '程式碼品質分數',
      target: 85,
      actual: 88,
      unit: '%',
      weight: 20,
      status: 'met',
    },
    {
      id: 'kpi-4',
      name: '文件完整度',
      target: 100,
      actual: 92,
      unit: '%',
      weight: 15,
      status: 'below',
    },
    {
      id: 'kpi-5',
      name: '團隊協作評分',
      target: 4.0,
      actual: 4.3,
      unit: '分',
      weight: 10,
      status: 'met',
    },
  ],
  
  achievements: [
    {
      id: 'ach-1',
      title: '導入自動化測試框架',
      description: '成功導入 CI/CD 自動化測試，提升開發效率 40%',
      date: '2025-03',
      impact: 'high',
      category: '技術創新',
    },
    {
      id: 'ach-2',
      title: '獲得最佳團隊貢獻獎',
      description: '因出色的跨部門合作表現獲得季度獎項',
      date: '2025-06',
      impact: 'high',
      category: '團隊合作',
    },
    {
      id: 'ach-3',
      title: '完成技術分享會',
      description: '舉辦 5 場技術分享會，促進團隊知識交流',
      date: '2025-08',
      impact: 'medium',
      category: '知識分享',
    },
    {
      id: 'ach-4',
      title: '優化系統效能',
      description: '成功將系統響應時間縮短 50%',
      date: '2025-10',
      impact: 'high',
      category: '技術優化',
    },
  ],
  
  projects: [
    {
      id: 'proj-1',
      name: '客戶管理系統重構',
      role: '技術負責人',
      description: '負責舊系統的現代化重構，採用微服務架構',
      startDate: '2025-01',
      endDate: '2025-06',
      status: 'completed',
      contribution: '架構設計、技術選型、團隊指導',
      results: '系統效能提升 60%，維護成本降低 40%',
    },
    {
      id: 'proj-2',
      name: '行動應用程式開發',
      role: '前端開發',
      description: '開發跨平台行動應用程式',
      startDate: '2025-04',
      endDate: '2025-09',
      status: 'completed',
      contribution: 'UI/UX 實作、效能優化',
      results: '上線首月下載量突破 10,000',
    },
    {
      id: 'proj-3',
      name: 'AI 智能助手整合',
      role: '專案成員',
      description: '將 AI 功能整合至現有產品',
      startDate: '2025-07',
      status: 'in-progress',
      contribution: 'API 整合、功能開發',
    },
  ],
  
  skills: [
    { name: 'React/TypeScript', level: 5, category: 'technical', growth: 1 },
    { name: 'Node.js', level: 4, category: 'technical', growth: 1 },
    { name: 'Python', level: 4, category: 'technical', growth: 0 },
    { name: '系統架構設計', level: 4, category: 'technical', growth: 1 },
    { name: '團隊溝通', level: 4, category: 'soft', growth: 1 },
    { name: '問題解決', level: 5, category: 'soft', growth: 0 },
    { name: '專案管理', level: 3, category: 'leadership', growth: 1 },
    { name: '技術指導', level: 4, category: 'leadership', growth: 1 },
  ],
  
  goals: [
    {
      id: 'goal-1',
      title: '取得雲端架構師認證',
      description: 'AWS Solutions Architect Professional',
      progress: 100,
      dueDate: '2025-06',
      status: 'completed',
    },
    {
      id: 'goal-2',
      title: '提升團隊技術能力',
      description: '舉辦技術分享會，提升團隊整體技術水平',
      progress: 80,
      dueDate: '2025-12',
      status: 'on-track',
    },
    {
      id: 'goal-3',
      title: '建立技術文件庫',
      description: '整理並建立完整的技術文件與最佳實踐',
      progress: 60,
      dueDate: '2025-12',
      status: 'on-track',
    },
  ],
  
  feedback: [
    {
      id: 'fb-1',
      from: '張經理',
      role: '直屬主管',
      content: '工作態度積極，技術能力出色，能夠獨立解決複雜問題。建議可以更主動分享知識給團隊成員。',
      date: '2025-11',
      type: 'manager',
    },
    {
      id: 'fb-2',
      from: '李同事',
      role: '專案夥伴',
      content: '合作起來非常愉快，溝通清楚且有效率。在專案遇到困難時總能提供很好的建議。',
      date: '2025-10',
      type: 'peer',
    },
    {
      id: 'fb-3',
      from: '王客戶',
      role: '外部客戶',
      content: '技術專業度高，回應速度快，解決問題的能力很強。非常滿意合作的成果。',
      date: '2025-09',
      type: 'client',
    },
  ],

  // 2025 年度績效目標
  annualGoals: {
    workGoals: [
      {
        id: 1,
        name: '流程標準化',
        target: '12月完成MVC範本改版',
        description: '成功將現有MVC框架升級至最新技術棧，包含.NET 9遷移、RESTful API重構、前端Vue框架導入等。此項目大幅提升了開發團隊的工作效率，新的架構更具擴展性和維護性，為未來專案奠定了良好的技術基礎。',
        metrics: [
          '遷移至 .NET 9、EF Core 9 (DTO、FluentValidation)',
          'API 改為 RESTful API',
          '套用新版面',
          '前端套用 Kendo、Vue',
        ],
        achievements: [
          '✅ 完成 .NET 9 與 EF Core 9 遷移',
          '✅ 引入 DTO 模式與 FluentValidation 驗證',
          '✅ 傳統 API 重構為 RESTful API',
          '✅ 新版面套用',
          '✅ Kendo + Vue 前端框架整合',
        ],
        weight: 30,
        linkTo: 'standardization',
      },
      {
        id: 2,
        name: '日常工作',
        target: '簡報 1 份',
        description: '本年度獨立完成品質管理系統(QM)、內控預警系統(SEC)、團膳報表(GM)、分級進貨看板(PM)、花卉系統(FMB)、理貨標籤(TM)等多項重點專案開發。工作中注重程式碼品質與架構設計，積極導入設計模式與最佳實踐。',
        metrics: [
          '實作單元測試、E2E測試',
          '工作完成數量',
          '提供解決方案',
          '解決同部門/跨部門的問題',
          '程式碼品質、可讀性、安全性',
        ],
        achievements: [
          '✅ 完成檢驗模組(QM)：從零建立完整檢驗流程，含7個核心功能模組',
          '✅ 開發內控預警系統(SEC)：實作 Dynamic SQL、SignalR 即時通知、Vue 元件化架構',
          '✅ 完成團膳報表(GM)：配合菜單複雜的架構，完成6項符合政府食登規範的報表功能',
          '✅ 開發分級進貨看板(PM)：實作 Kendo Splitter 雙層架構、輪播與分頁同步、響應式佈局',
          '✅ 花卉系統(FMB)：GDI+ 圖片合成、QuestPDF 照片匯出、商品規格複製功能',
          '✅ 理貨標籤(TM)：Pipeline Pattern 標籤產生管線、支援標準列印與自訂版面配置',
          '✅ 客服系統(CSS)開發：',
          '　　• Excel 報表框架：使用 Builder Pattern 設計可擴充的報表匯出服務',
          '　　• 合約專案管理功能擴充：發票收款、里程碑管理、背景排程通知',
          '　　• 首頁數據分析儀表板：逾期合約追蹤、列舉驅動分類管理',
          '　　• 通知中心與最新消息：登入推播、背景郵件發送、通知狀態追蹤',
        ],
        weight: 60,
        linkTo: 'highlight-projects',
      },
      {
        id: 3,
        name: '提升開發效率',
        target: '每人分享2個日常工作使用AI的經驗',
        description: '積極探索並推廣AI工具在日常開發工作中的應用，透過工具導入、知識分享與經驗交流，協助團隊成員提升工作效率。依以下方向，循序漸進地提升公司同仁的AI通識能力，並有效提升開發團隊的工作效率。',
        metrics: [
          '工具導入',
          'AI知識',
          '使用經驗',
          '情境案例',
        ],
        achievements: [
          '✅ 導入 GitHub Copilot、Devin、ChatGPT、Gemini 等多款 AI 工具，實現工具生態多元化',
          '✅ 確立「模型選型」優於「提示優化」的核心認知，指導高效 AI 應用',
          '✅ 積累完整的 AI 工具使用經驗與失敗教訓，完成 SDD 自動化 90% 準確率突破',
        ],
        weight: 10,
        linkTo: 'ai-performance',
      },
    ],
    coreCompetencies: [
      {
        id: 1,
        name: '溝通協調',
        behaviors: [
          '有條理、有組織地表達訊息',
          '確保對方專注聆聽',
          '依據不同對象運用適當方法清楚表達訊息',
          '確認對方清楚瞭解',
          '專注傾聽、細心觀察對方傳達之訊息',
          '回應並確認訊息正確性',
          '釐清雙方意見歧異點並取得共識',
        ],
        weight: 50,
        feedback: [
          {
            behavior: '有條理、有組織地表達資訊',
            content: '[情境與行動 S/A] 我能夠有條理地識別並指出目前開發流程中的核心難點：規格文件常不完善、語意模糊，且完整功能缺乏事前共識。我清晰地將問題結構化，指出這種情況將導致單方面猜測與後續頻繁退單，並強調誤這會直接導致開發成本的非必要上升。',
          },
          {
            behavior: '釐清雙方意見歧異點並取得共識',
            content: '[行動 A] 在面對 PM/PG/QA 之間的複雜資訊流時，我精準地分析了資訊斷層（例如：PM 不知道 QA 已退單），並將其視為影響開發效率的重大歧異點。我主動提出「溝通為主、規格為輔」的滾動式調整原則作為解決方案的建議方向，積極推動團隊開始討論優化規格流程的重要性。',
          },
          {
            behavior: '確保對方專注聆聽',
            content: '[行動 A] 我利用具體的退單實例，讓相關方理解規格模糊與資訊不同步所帶來的實際後果（即重複開發的成本），成功引起 PM 和 QA 對於現行流程的風險意識。',
          },
          {
            behavior: '成果 R',
            content: '雖然最終解決機制仍在討論與推動中，但我的清晰警示成功使團隊開始正視這個問題，為後續的流程優化奠定了基礎。',
          },
        ],
      },
      {
        id: 2,
        name: '團隊合作',
        behaviors: [
          '接納、尊重團隊成員的意見',
          '以團隊目標為優先，支持團隊的決定',
          '在團隊中盡力完成個人職責',
          '鼓勵其他成員積極參與團隊',
          '主動提供其他成員協助或分享資訊，營造合作氣氛',
        ],
        weight: 50,
        feedback: [
          {
            behavior: '以團隊目標為優先，支持團隊的決定',
            content: '[情境 S] 年中時，我被指派接手維護客服系統，該系統為內部核心營運工具，但面臨程式邏輯常有缺漏、唯一開發者無法提供有效支援等多重技術挑戰，且三番兩次引發令人難以置信的重大問題。',
          },
          {
            behavior: '接納、尊重團隊成員的意見',
            content: '[行動 A] 儘管該系統無法直接增加公司營收、且接手成本高，我意識到其既存在必有合理性，且維護工作並不會消失。基於對團隊大局的理解和支援，我選擇拋開個人意願，接納這項非預期任務，承擔起系統穩定性的責任。',
          },
          {
            behavior: '在團隊中盡力完成個人職責',
            content: '[行動 A] 我投入時間與精力，深入研究這套充滿「無法理解設計」的系統。透過我的努力，客服系統的問題數量和故障頻率顯著降低，確保了客服團隊的營運順暢。我主動將維護工作標準化，為系統建立了基礎的知識庫。',
          },
          {
            behavior: '主動提供其他成員協助或分享資訊，營造合作氣氛',
            content: '[成果 R] 透過穩定該系統，我間接幫助了同隊成員和公司節省了大量的人力成本（例如：客服人員處理客訴的時間、其他工程師救火的時間）。這項貢獻穩定了重要的內部工作流，使團隊能夠更專注於高營收產出專案。同時，我在維護過程中積累了關鍵系統的營運經驗，拓寬了個人技術廣度。',
          },
        ],
      },
    ],
  },
};
