import type { YearDataModule, YearsConfig } from '../types/yearData';

// 年度資料快取
const yearDataCache = new Map<number, YearDataModule>();

// 動態載入年度資料模組
export async function loadYearData(year: number): Promise<YearDataModule> {
  // 檢查快取
  if (yearDataCache.has(year)) {
    return yearDataCache.get(year)!;
  }

  try {
    // 使用動態 import 載入年度資料
    const module = await import(`./years/${year}/performanceData.ts`);

    const yearData: YearDataModule = {
      performanceData: module.performanceData,
      highlightProjects: module.highlightProjects,
      workStats: module.workStats,
    };

    // 存入快取
    yearDataCache.set(year, yearData);
    return yearData;
  } catch (error) {
    throw new Error(`無法載入 ${year} 年度資料: ${error}`);
  }
}

// 載入可用年度清單
export async function loadAvailableYears(): Promise<YearsConfig> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/years.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('載入年度清單失敗:', error);
    // 回傳預設值
    return {
      years: [
        {
          year: 2025,
          displayName: '2025 年度',
          csvPath: '/data/2025/worklist.csv',
          screenshotsPath: '/data/2025/screenshots',
          isActive: true
        }
      ],
      defaultYear: 2025
    };
  }
}

// 清除快取（如需重新載入）
export function clearYearDataCache(year?: number): void {
  if (year) {
    yearDataCache.delete(year);
  } else {
    yearDataCache.clear();
  }
}
