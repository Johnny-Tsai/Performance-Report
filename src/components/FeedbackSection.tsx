import { Feedback } from '../types/performance';

interface FeedbackSectionProps {
  feedback: Feedback[];
}

export function FeedbackSection({ feedback }: FeedbackSectionProps) {
  const getTypeIcon = (type: Feedback['type']) => {
    switch (type) {
      case 'manager':
        return '👔';
      case 'peer':
        return '🤝';
      case 'subordinate':
        return '👥';
      case 'client':
        return '💼';
    }
  };

  const getTypeLabel = (type: Feedback['type']) => {
    switch (type) {
      case 'manager':
        return '主管評價';
      case 'peer':
        return '同儕回饋';
      case 'subordinate':
        return '部屬回饋';
      case 'client':
        return '客戶回饋';
    }
  };

  const getTypeColor = (type: Feedback['type']) => {
    switch (type) {
      case 'manager':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'peer':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'subordinate':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'client':
        return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  return (
    <section className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
      <h2 className="section-title">💬 360度回饋</h2>
      
      <div className="space-y-4">
        {feedback.map((fb) => (
          <div 
            key={fb.id}
            className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{getTypeIcon(fb.type)}</div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-bold text-gray-800">{fb.from}</span>
                  <span className="text-gray-500">-</span>
                  <span className="text-gray-600">{fb.role}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(fb.type)}`}>
                    {getTypeLabel(fb.type)}
                  </span>
                </div>
                
                <blockquote className="text-gray-600 italic border-l-4 border-blue-300 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
                  "{fb.content}"
                </blockquote>
                
                <p className="text-sm text-gray-400 mt-2">
                  📅 {fb.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <h3 className="text-center font-semibold text-gray-800 mb-4">回饋來源統計</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {['manager', 'peer', 'subordinate', 'client'].map((type) => {
            const count = feedback.filter(f => f.type === type).length;
            if (count === 0) return null;
            return (
              <div key={type} className="text-center">
                <p className="text-2xl">{getTypeIcon(type as Feedback['type'])}</p>
                <p className="font-bold text-gray-700">{count}</p>
                <p className="text-xs text-gray-500">{getTypeLabel(type as Feedback['type'])}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
