import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadYearData, loadAvailableYears } from '../data/dataLoader';
import type { YearDataModule, YearConfig } from '../types/yearData';

interface YearContextType {
  currentYear: number;
  availableYears: YearConfig[];
  yearData: YearDataModule | null;
  isLoading: boolean;
  error: string | null;
  switchYear: (year: number) => void;
  getScreenshotPath: (projectCode: string, filename: string) => string;
  getCsvPath: () => string;
}

const YearContext = createContext<YearContextType | undefined>(undefined);

interface YearProviderProps {
  children: ReactNode;
}

export function YearProvider({ children }: YearProviderProps) {
  const { year } = useParams<{ year: string }>();
  const navigate = useNavigate();

  const [availableYears, setAvailableYears] = useState<YearConfig[]>([]);
  const [yearData, setYearData] = useState<YearDataModule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [defaultYear, setDefaultYear] = useState<number>(2025);

  const currentYear = year ? parseInt(year, 10) : defaultYear;

  // 載入可用年度
  useEffect(() => {
    loadAvailableYears()
      .then((config) => {
        setAvailableYears(config.years);
        setDefaultYear(config.defaultYear);
      })
      .catch((err) => setError(`載入年度清單失敗: ${err.message}`));
  }, []);

  // 載入當前年度資料
  useEffect(() => {
    if (!currentYear) return;

    setIsLoading(true);
    setError(null);

    loadYearData(currentYear)
      .then((data) => {
        setYearData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [currentYear]);

  const switchYear = (newYear: number) => {
    navigate(`/${newYear}`);
  };

  const getScreenshotPath = (projectCode: string, filename: string): string => {
    return `${import.meta.env.BASE_URL}data/${currentYear}/screenshots/${projectCode}/${filename}`;
  };

  const getCsvPath = (): string => {
    return `${import.meta.env.BASE_URL}data/${currentYear}/worklist.csv`;
  };

  return (
    <YearContext.Provider
      value={{
        currentYear,
        availableYears,
        yearData,
        isLoading,
        error,
        switchYear,
        getScreenshotPath,
        getCsvPath,
      }}
    >
      {children}
    </YearContext.Provider>
  );
}

export function useYear() {
  const context = useContext(YearContext);
  if (!context) {
    throw new Error('useYear must be used within a YearProvider');
  }
  return context;
}
