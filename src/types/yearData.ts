import type { PerformanceData, HighlightProject, WorkStats } from './performance';

// 年度配置
export interface YearConfig {
  year: number;
  displayName: string;
  csvPath: string;
  screenshotsPath: string;
  isActive: boolean;
}

// 年度資料模組
export interface YearDataModule {
  performanceData: PerformanceData;
  highlightProjects: HighlightProject[];
  workStats: WorkStats;
}

// 年度清單配置檔
export interface YearsConfig {
  years: YearConfig[];
  defaultYear: number;
}
