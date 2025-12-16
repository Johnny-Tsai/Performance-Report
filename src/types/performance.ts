// 績效資料類型定義
export interface PerformanceData {
  personalInfo: PersonalInfo;
  summary: Summary;
  kpis: KPI[];
  achievements: Achievement[];
  projects: Project[];
  skills: Skill[];
  goals: Goal[];
  feedback: Feedback[];
  annualGoals?: AnnualGoals;
}

export interface PersonalInfo {
  name: string;
  title: string;
  department: string;
  employeeId: string;
  reviewPeriod: string;
  manager: string;
  avatar?: string;
}

export interface Summary {
  overallRating: number; // 1-5
  highlights: string;
  areasOfImprovement: string;
}

export interface KPI {
  id: string;
  name: string;
  target: number;
  actual: number;
  unit: string;
  weight: number; // 百分比
  status: 'exceeded' | 'met' | 'below';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'planned';
  contribution: string;
  results?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'technical' | 'soft' | 'leadership';
  growth?: number; // 成長幅度
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  dueDate: string;
  status: 'completed' | 'on-track' | 'at-risk' | 'delayed';
}

export interface Feedback {
  id: string;
  from: string;
  role: string;
  content: string;
  date: string;
  type: 'peer' | 'manager' | 'subordinate' | 'client';
}

// 工作目標 (KPI)
export interface WorkGoal {
  id: number;
  name: string;
  target: string;
  description: string;
  metrics: string[];
  achievements: string[];
  weight: number; // 百分比
  linkTo?: string; // 連結到哪個區塊
}

// 核心職能
export interface CoreCompetency {
  id: number;
  name: string;
  behaviors: string[];
  weight: number; // 百分比
  feedback?: {
    behavior: string;
    content: string;
    result?: string;
  }[];
}

// 年度績效目標
export interface AnnualGoals {
  workGoals: WorkGoal[];
  coreCompetencies: CoreCompetency[];
}

// 年度工作統計
export interface WorkStats {
  commits: number;
  modules: number;
  enhancements: number;
  reports: number;
  bugFixes: number;
  refactors: number;
}

// 功能截圖
export interface Screenshot {
  name: string;        // 功能名稱
  image: string;       // 圖片路徑
  highlights: string[];  // 亮點說明列表
}

// 亮點專案
export interface HighlightProject {
  id: string;
  name: string;
  code: string; // QM, SEC 等
  stars: number; // 1-3 顆星
  period: string; // 開發期間
  commits: number;
  description: string;
  modules: ProjectModule[];
  techHighlights?: TechHighlight[];
  businessValue: string[];
  screenshots?: Screenshot[];  // 功能截圖
  codeSnippets?: CodeSnippet[];  // 程式碼範例
}

export interface CodeSnippet {
  title: string;       // 程式碼標題
  language: string;    // 程式語言 (javascript, csharp, etc.)
  code: string;        // 程式碼內容
}

export interface ProjectModule {
  code: string;
  name: string;
  description: string;
}

export interface TechHighlight {
  pattern: string;
  application: string;
  description: string;
}

// 客戶專案
export interface CustomerProject {
  id: string;
  customer: string;
  projectName: string;
  period: string;
  features: string[];
}
