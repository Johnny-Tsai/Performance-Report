import { Achievement } from '../types/performance';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const getImpactBadge = (impact: Achievement['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getImpactLabel = (impact: Achievement['impact']) => {
    switch (impact) {
      case 'high':
        return '高影響力';
      case 'medium':
        return '中影響力';
      case 'low':
        return '一般';
    }
  };

  const getImpactIcon = (impact: Achievement['impact']) => {
    switch (impact) {
      case 'high':
        return '🏆';
      case 'medium':
        return '⭐';
      case 'low':
        return '✓';
    }
  };

  return (
    <section className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <h2 className="section-title">🏆 重大成就</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">
                {getImpactIcon(achievement.impact)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {achievement.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">
                  {achievement.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`achievement-badge border ${getImpactBadge(achievement.impact)}`}>
                    {getImpactLabel(achievement.impact)}
                  </span>
                  <span className="achievement-badge bg-blue-50 text-blue-700 border border-blue-200">
                    {achievement.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    📅 {achievement.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{achievements.length}</p>
            <p className="text-sm text-gray-600">總成就數</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">
              {achievements.filter(a => a.impact === 'high').length}
            </p>
            <p className="text-sm text-gray-600">高影響力</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-500">
              {achievements.filter(a => a.impact === 'medium').length}
            </p>
            <p className="text-sm text-gray-600">中影響力</p>
          </div>
        </div>
      </div>
    </section>
  );
}
