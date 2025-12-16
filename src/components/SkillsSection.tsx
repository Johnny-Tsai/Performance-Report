import { Skill } from '../types/performance';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const technicalSkills = skills.filter(s => s.category === 'technical');
  const softSkills = skills.filter(s => s.category === 'soft');
  const leadershipSkills = skills.filter(s => s.category === 'leadership');

  const radarData = {
    labels: skills.slice(0, 8).map(s => s.name),
    datasets: [
      {
        label: '技能水平',
        data: skills.slice(0, 8).map(s => s.level),
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const renderSkillBar = (skill: Skill) => (
    <div key={skill.name} className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-gray-700">{skill.name}</span>
        <div className="flex items-center gap-2">
          {skill.growth !== undefined && skill.growth > 0 && (
            <span className="text-green-500 text-sm flex items-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              +{skill.growth}
            </span>
          )}
          <span className="text-sm text-gray-500">{skill.level}/5</span>
        </div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
          style={{ width: `${(skill.level / 5) * 100}%` }}
        />
      </div>
    </div>
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return '💻';
      case 'soft':
        return '🤝';
      case 'leadership':
        return '👔';
      default:
        return '📌';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'technical':
        return '技術能力';
      case 'soft':
        return '軟實力';
      case 'leadership':
        return '領導能力';
      default:
        return '其他';
    }
  };

  return (
    <section className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <h2 className="section-title">🎯 技能評估</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-center text-gray-600 font-medium mb-4">技能雷達圖</h3>
          <Radar data={radarData} options={radarOptions} />
        </div>

        {/* Skills List */}
        <div className="space-y-6">
          {[
            { category: 'technical', skills: technicalSkills },
            { category: 'soft', skills: softSkills },
            { category: 'leadership', skills: leadershipSkills },
          ].map(({ category, skills: categorySkills }) => (
            categorySkills.length > 0 && (
              <div key={category} className="bg-gray-50 rounded-xl p-4">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-4">
                  <span>{getCategoryIcon(category)}</span>
                  {getCategoryLabel(category)}
                </h3>
                {categorySkills.map(renderSkillBar)}
              </div>
            )
          ))}
        </div>
      </div>

      {/* Growth Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
        <h3 className="text-center font-semibold text-gray-800 mb-4">📈 年度成長摘要</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">
              {skills.filter(s => s.growth && s.growth > 0).length}
            </p>
            <p className="text-sm text-gray-600">技能提升</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">
              {(skills.reduce((acc, s) => acc + s.level, 0) / skills.length).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">平均技能等級</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">
              {skills.filter(s => s.level >= 4).length}
            </p>
            <p className="text-sm text-gray-600">專精技能 (4+)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
