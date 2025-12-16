import { KPI } from '../types/performance';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface KPISectionProps {
  kpis: KPI[];
}

export function KPISection({ kpis }: KPISectionProps) {
  const getStatusColor = (status: KPI['status']) => {
    switch (status) {
      case 'exceeded':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'met':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'below':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusLabel = (status: KPI['status']) => {
    switch (status) {
      case 'exceeded':
        return '超越目標';
      case 'met':
        return '達成目標';
      case 'below':
        return '未達目標';
    }
  };

  const calculateOverallScore = () => {
    let totalWeight = 0;
    let weightedScore = 0;
    
    kpis.forEach(kpi => {
      const achievement = Math.min((kpi.actual / kpi.target) * 100, 150);
      weightedScore += (achievement * kpi.weight) / 100;
      totalWeight += kpi.weight;
    });
    
    return totalWeight > 0 ? (weightedScore / totalWeight * 100).toFixed(1) : 0;
  };

  const chartData = {
    labels: kpis.map(k => k.name),
    datasets: [
      {
        label: '目標',
        data: kpis.map(k => k.target),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: '實際',
        data: kpis.map(k => k.actual),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['已達成', '未達成'],
    datasets: [
      {
        data: [
          kpis.filter(k => k.status !== 'below').length,
          kpis.filter(k => k.status === 'below').length,
        ],
        backgroundColor: ['#22c55e', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <section className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <h2 className="section-title">📊 關鍵績效指標 (KPI)</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Overall Score Card */}
        <div className="kpi-card text-center">
          <p className="text-white/80 text-sm mb-2">整體達成率</p>
          <p className="text-5xl font-bold mb-2">{calculateOverallScore()}%</p>
          <p className="text-white/60 text-sm">加權平均</p>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-center text-gray-600 text-sm mb-2">KPI 達成狀況</p>
          <div className="h-32">
            <Doughnut 
              data={doughnutData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
              }} 
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600">
              {kpis.filter(k => k.status === 'exceeded').length}
            </p>
            <p className="text-xs text-green-700">超越目標</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {kpis.filter(k => k.status === 'met').length}
            </p>
            <p className="text-xs text-blue-700">達成目標</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {kpis.filter(k => k.status === 'below').length}
            </p>
            <p className="text-xs text-yellow-700">未達目標</p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <Bar 
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
            },
            scales: {
              y: { beginAtZero: true }
            }
          }}
        />
      </div>

      {/* KPI Details */}
      <div className="space-y-4">
        {kpis.map((kpi) => {
          const percentage = Math.min((kpi.actual / kpi.target) * 100, 100);
          return (
            <div key={kpi.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-800">{kpi.name}</h3>
                  <span className={`achievement-badge border ${getStatusColor(kpi.status)}`}>
                    {getStatusLabel(kpi.status)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">權重：{kpi.weight}%</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        kpi.status === 'exceeded' ? 'bg-green-500' : 
                        kpi.status === 'met' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <div className="text-right min-w-[120px]">
                  <span className="font-bold text-gray-800">{kpi.actual}</span>
                  <span className="text-gray-500"> / {kpi.target} {kpi.unit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
