import { WorkItem } from '../types/worklist';

// 解析 CSV 格式
export function parseCSV(text: string): WorkItem[] {
  // 移除 BOM
  const cleanText = text.replace(/^\uFEFF/, '');
  const lines = cleanText.split('\n');

  const items: WorkItem[] = [];

  // 跳過第一行（標題行）
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;

    try {
      // 智能 CSV 解析，處理包含逗號的欄位
      const fields = parseCSVLine(line);
      
      if (fields.length >= 16) {  // 需要至少 16 個欄位
        const workItem = createWorkItem(fields);
        if (workItem) {
          items.push(workItem);
        }
      }
    } catch (error) {
      console.warn(`解析第 ${i + 1} 行失敗:`, error);
    }
  }

  return items;
}

// 智能解析 CSV 行，處理引號和逗號
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // 雙引號轉義
        current += '"';
        i += 2;
      } else {
        // 切換引號狀態
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      // 欄位分隔符
      fields.push(current.trim());
      current = '';
      i++;
    } else {
      current += char;
      i++;
    }
  }

  // 添加最後一個欄位
  fields.push(current.trim());
  return fields;
}

function createWorkItem(fields: string[]): WorkItem | null {
  try {
    // 根據實際 CSV 格式映射欄位
    // ID,TeamProject,WorkItemType,Title,AssignedTo,State,Priority,Triage,OriginalEstimate,CompletedWork,RemainingWork,AreaPath,IterationPath,Tags,CreatedBy,CreatedDate
    
    const id = fields[0]?.trim() || '';
    const projectName = fields[1]?.trim() || '';
    const type = (fields[2]?.trim() || '工作') as '工作' | 'Bug';
    const description = fields[3]?.trim() || '';
    const assignee = fields[4]?.trim() || '';
    const status = fields[5]?.trim() || '';
    const priority = parseInt(fields[6]) || 1;
    const gradingStatus = fields[7]?.trim() || '已分級';
    
    // 時間欄位處理
    const estimatedTimeStr = fields[8]?.trim();
    const actualTimeStr = fields[9]?.trim();
    const estimatedTime = estimatedTimeStr && estimatedTimeStr !== '' ? parseFloat(estimatedTimeStr) : undefined;
    const actualTime = actualTimeStr && actualTimeStr !== '' ? parseFloat(actualTimeStr) : undefined;
    
    // 路徑欄位
    const path1 = fields[11]?.trim() || '';  // AreaPath
    const path2 = fields[12]?.trim() || '';  // IterationPath
    
    // 其他欄位
    const owner = assignee || '蔡中凡'; // 使用 AssignedTo 作為負責人
    const date = fields[15]?.trim() || '';  // CreatedDate

    // 基本驗證
    if (!id || !description) {
      return null;
    }

    return {
      id,
      projectName,
      type,
      description,
      owner,
      status,
      priority,
      gradingStatus,
      estimatedTime,
      actualTime,
      path1,
      path2,
      assignee,
      date
    };
  } catch (error) {
    console.warn('建立 WorkItem 失敗:', error);
    return null;
  }
}
