import { Goal } from '../types/performance';

interface GoalsSectionProps {
  goals: Goal[];
}

export function GoalsSection({ goals }: GoalsSectionProps) {
  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'on-track':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'delayed':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getStatusLabel = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'on-track':
        return '進度正常';
      case 'at-risk':
        return '有風險';
      case 'delayed':
        return '延遲';
    }
  };

  const getProgressColor = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'on-track':
        return 'bg-blue-500';
      case 'at-risk':
        return 'bg-yellow-500';
      case 'delayed':
        return 'bg-red-500';
    }
  };

  return (
    <section className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <h2 className="section-title">🎯 年度目標</h2>
      
      <div className="space-y-4">
        {goals.map((goal) => (
          <div 
            key={goal.id}
            className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {goal.status === 'completed' ? '✅' : '🎯'}
                </span>
                <div>
                  <h3 className="font-bold text-gray-800">{goal.title}</h3>
                  <p className="text-sm text-gray-500">{goal.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(goal.status)}`}>
                  {getStatusLabel(goal.status)}
                </span>
                <span className="text-sm text-gray-500">
                  截止：{goal.dueDate}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${getProgressColor(goal.status)}`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
              <span className="font-bold text-gray-700 min-w-[50px] text-right">
                {goal.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Goals Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {goals.filter(g => g.status === 'completed').length}
          </p>
          <p className="text-sm text-gray-600">已完成</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {goals.filter(g => g.status === 'on-track').length}
          </p>
          <p className="text-sm text-gray-600">進度正常</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {goals.filter(g => g.status === 'at-risk').length}
          </p>
          <p className="text-sm text-gray-600">有風險</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">
            {Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%
          </p>
          <p className="text-sm text-gray-600">平均進度</p>
        </div>
      </div>
    </section>
  );
}
