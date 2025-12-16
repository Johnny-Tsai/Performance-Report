import { useState, useMemo, useEffect } from 'react';
import { WorkItem } from '../types/worklist';
import { loadWorklistData } from '../data/worklistData';
import { useYear } from '../hooks/useYear';

type SortField = 'date' | 'priority' | 'status' | 'type' | 'projectName';
type SortOrder = 'asc' | 'desc';

export function WorklistSection() {
  const { currentYear } = useYear();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);  // 改為多選標籤
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // 新增狀態來管理載入的資料
  const [items, setItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 載入資料（根據年度）
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadWorklistData(currentYear);
        setItems(data);
        setError(null);
      } catch (err) {
        console.error('載入工作清單失敗:', err);
        setError('載入工作清單失敗，請稍後再試');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentYear]);

  // 取得所有可用的標籤
  const availableTags = useMemo(() => {
    return [
      { id: 'ERP', label: 'ERP 系統', color: 'bg-blue-100 text-blue-700 border-blue-300' },
      { id: 'CSS', label: '客服系統', color: 'bg-green-100 text-green-700 border-green-300' },
    ];
  }, []);

  // 標籤勾選處理
  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(t => t !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
    setCurrentPage(1);
  };

  // 過濾與排序
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // 搜尋過濾
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.description.toLowerCase().includes(term) ||
        item.projectName.toLowerCase().includes(term) ||
        item.id.includes(term)
      );
    }

    // 標籤過濾（多選）
    if (selectedTags.length > 0) {
      result = result.filter(item => {
        const projectNameUpper = (item.projectName || '').toUpperCase();
        const descriptionUpper = (item.description || '').toUpperCase();
        const path1Upper = (item.path1 || '').toUpperCase();
        
        // 檢查是否為 CSS
        const isCSS = descriptionUpper.includes('UC_CSS') ||
                     descriptionUpper.includes('客戶資料管理') ||
                     descriptionUpper.includes('合約專案管理') ||
                     descriptionUpper.includes('輔導紀錄管理') ||
                     descriptionUpper.includes('情境說明管理') ||
                     descriptionUpper.includes('最新消息管理') ||
                     descriptionUpper.includes('通知中心管理') ||
                     descriptionUpper.includes('數據分析檢視') ||
                     descriptionUpper.includes('客戶公司管理') ||
                     descriptionUpper.includes('角色權限') ||
                     descriptionUpper.includes('統計報表') ||
                     descriptionUpper.includes('案件管理') ||
                     path1Upper.includes('CS01001') ||
                     path1Upper.includes('客服系統');
        
        // 檢查是否為 ERP
        const isERP = (projectNameUpper.includes('ERP') || projectNameUpper.includes('RD2017004')) &&
                     !isCSS;
        
        // 根據勾選的標籤篩選
        if (selectedTags.includes('CSS') && selectedTags.includes('ERP')) {
          return isCSS || isERP;
        } else if (selectedTags.includes('CSS')) {
          return isCSS;
        } else if (selectedTags.includes('ERP')) {
          return isERP;
        }
        return true;
      });
    }

    // 排序
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'priority':
          comparison = a.priority - b.priority;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'projectName':
          comparison = a.projectName.localeCompare(b.projectName);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [items, searchTerm, selectedTags, sortField, sortOrder]);

  // 分頁
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const paginatedItems = filteredAndSortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已關閉':
      case '已解決':
        return 'bg-green-100 text-green-800';
      case '作用中':
        return 'bg-blue-100 text-blue-800';
      case '已提議':
        return 'bg-yellow-100 text-yellow-800';
      case '暫止':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Bug'
      ? 'bg-red-100 text-red-800'
      : 'bg-purple-100 text-purple-800';
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return { label: '緊急', color: 'text-red-600' };
      case 2: return { label: '高', color: 'text-orange-600' };
      case 3: return { label: '中', color: 'text-yellow-600' };
      case 4: return { label: '低', color: 'text-green-600' };
      default: return { label: '-', color: 'text-gray-400' };
    }
  };

  // 載入狀態處理
  if (loading) {
    return (
      <section className="glass-card p-6 mb-6">
        <h2 className="section-title">工作清單</h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">載入資料中...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="glass-card p-6 mb-6">
        <h2 className="section-title">工作清單</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            重新載入
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="glass-card p-6 mb-6">
      <h2 className="section-title">{currentYear} 年度工作清單</h2>
      <p className="text-sm text-gray-500 mb-4">統計至 {currentYear}/12/01</p>

      {/* 搜尋與過濾 */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="搜尋工作項目..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">標籤篩選：</span>
          {availableTags.map(tag => (
            <label
              key={tag.id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                selectedTags.includes(tag.id)
                  ? `${tag.color} border-2`
                  : 'bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagToggle(tag.id)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{tag.label}</span>
              {selectedTags.includes(tag.id) && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* 結果計數 */}
      <div className="text-sm text-gray-600 mb-4">
        顯示 {filteredAndSortedItems.length} 筆結果
        {(searchTerm || selectedTags.length > 0) &&
          ` (共 ${items.length} 筆)`
        }
      </div>

      {/* 資料表格 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">編號</th>
              <th
                className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('type')}
              >
                類型 {sortField === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap min-w-[300px]">描述</th>
              <th
                className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                狀態 {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('priority')}
              >
                優先級 {sortField === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">指派人</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700 whitespace-nowrap">預估</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700 whitespace-nowrap">實際</th>
              <th
                className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('date')}
              >
                日期 {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedItems.map((item) => {
              const priority = getPriorityLabel(item.priority);
              return (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs whitespace-nowrap">{item.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{item.description}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.projectName}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`font-medium ${priority.color}`}>{priority.label}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{item.assignee}</td>
                  <td className="px-4 py-3 text-right text-gray-600 whitespace-nowrap">
                    {item.estimatedTime ? `${item.estimatedTime}h` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600 whitespace-nowrap">
                    {item.actualTime ? `${item.actualTime}h` : '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 分頁 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            第 {currentPage} / {totalPages} 頁
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              首頁
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              上一頁
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              下一頁
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              末頁
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
