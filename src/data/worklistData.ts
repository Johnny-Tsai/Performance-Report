import { WorkItem } from '../types/worklist';
import { parseCSV } from '../utils/csvParser';

// 年度資料快取
const yearWorklistCache = new Map<number, WorkItem[]>();

// 取得 base URL（支援 GitHub Pages）
const getBaseUrl = () => {
  return import.meta.env.BASE_URL || '/';
};

// 載入指定年度的 CSV 資料
export async function loadWorklistData(year: number): Promise<WorkItem[]> {
  // 如果已經有該年度的快取資料，直接回傳
  if (yearWorklistCache.has(year)) {
    return yearWorklistCache.get(year)!;
  }

  try {
    const baseUrl = getBaseUrl();
    const csvPath = `${baseUrl}data/${year}/worklist.csv`;
    console.log('Loading CSV from:', csvPath);

    const response = await fetch(csvPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    const allData = parseCSV(csvText);

    // 篩選該年度的資料（IterationPath 包含年度）
    const yearPattern = `\\${year}\\`;
    const yearPatternAlt = `/${year}/`;
    const filteredData = allData.filter(item =>
      item.path2?.includes(yearPattern) ||
      item.path2?.includes(yearPatternAlt)
    );

    console.log(`Loaded ${year} worklist items:`, filteredData.length);

    // 快取資料
    yearWorklistCache.set(year, filteredData);
    return filteredData;
  } catch (error) {
    console.error(`載入 ${year} 年工作清單資料失敗:`, error);
    // 回傳空陣列而不是拋出錯誤，讓應用程式能繼續運作
    return [];
  }
}

// 清除指定年度的快取（如果需要重新載入資料）
export function clearWorklistCache(year?: number): void {
  if (year) {
    yearWorklistCache.delete(year);
  } else {
    yearWorklistCache.clear();
  }
}
