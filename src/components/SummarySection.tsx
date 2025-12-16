import { Summary } from '../types/performance';

interface SummarySectionProps {
  summary: Summary;
}

export function SummarySection({ summary }: SummarySectionProps) {
  return (
    <section className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
      <h2 className="section-title">📋 績效摘要</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highlights */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
          <h3 className="flex items-center gap-2 font-semibold text-green-800 mb-3">
            <span className="text-2xl">✨</span>
            亮點表現
          </h3>
          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
            {summary.highlights}
          </div>
        </div>

        {/* Areas of Improvement */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-100">
          <h3 className="flex items-center gap-2 font-semibold text-amber-800 mb-3">
            <span className="text-2xl">🎯</span>
            待改進項目
          </h3>
          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
            {summary.areasOfImprovement}
          </div>
        </div>
      </div>
    </section>
  );
}
