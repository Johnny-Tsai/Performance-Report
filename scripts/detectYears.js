import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataYearsPath = path.join(__dirname, '../src/data/years');
const publicDataPath = path.join(__dirname, '../public/data');

function detectYears() {
  const years = [];

  // 確保 public/data 目錄存在
  if (!fs.existsSync(publicDataPath)) {
    fs.mkdirSync(publicDataPath, { recursive: true });
  }

  // 掃描 src/data/years 目錄
  if (!fs.existsSync(dataYearsPath)) {
    console.log('No src/data/years directory found, creating default config...');
    writeDefaultConfig();
    return;
  }

  const yearDirs = fs.readdirSync(dataYearsPath)
    .filter(dir => /^\d{4}$/.test(dir))
    .sort((a, b) => parseInt(b) - parseInt(a)); // 降序（最新年度在前）

  for (const yearDir of yearDirs) {
    const year = parseInt(yearDir);
    const hasPerformanceData = fs.existsSync(
      path.join(dataYearsPath, yearDir, 'performanceData.ts')
    );

    if (hasPerformanceData) {
      const currentYearNum = new Date().getFullYear();
      years.push({
        year,
        displayName: `${year} 年度`,
        csvPath: `/data/${year}/worklist.csv`,
        screenshotsPath: `/data/${year}/screenshots`,
        isActive: year === currentYearNum
      });
    }
  }

  if (years.length === 0) {
    console.log('No year data found, creating default config...');
    writeDefaultConfig();
    return;
  }

  // 寫入 years.json
  const output = {
    years,
    defaultYear: years[0]?.year || new Date().getFullYear()
  };

  const outputPath = path.join(publicDataPath, 'years.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`Detected ${years.length} years:`, years.map(y => y.year).join(', '));
  console.log(`Default year: ${output.defaultYear}`);
  console.log(`Config written to: ${outputPath}`);
}

function writeDefaultConfig() {
  const currentYear = new Date().getFullYear();
  const output = {
    years: [
      {
        year: currentYear,
        displayName: `${currentYear} 年度`,
        csvPath: `/data/${currentYear}/worklist.csv`,
        screenshotsPath: `/data/${currentYear}/screenshots`,
        isActive: true
      }
    ],
    defaultYear: currentYear
  };

  const outputPath = path.join(publicDataPath, 'years.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Default config written to: ${outputPath}`);
}

// 執行
detectYears();
