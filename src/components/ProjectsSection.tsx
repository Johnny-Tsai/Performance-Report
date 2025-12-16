import { Project } from '../types/performance';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'planned':
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '進行中';
      case 'planned':
        return '規劃中';
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔄';
      case 'planned':
        return '📋';
    }
  };

  return (
    <section className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <h2 className="section-title">💼 專案經歷</h2>
      
      <div className="space-y-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="relative bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getStatusIcon(project.status)}</span>
                  <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>
                
                <p className="text-blue-600 font-medium mb-3">
                  🎯 角色：{project.role}
                </p>
                
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-500 mb-1">💪 主要貢獻</p>
                    <p className="text-gray-700">{project.contribution}</p>
                  </div>
                  
                  {project.results && (
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-gray-500 mb-1">📈 成果</p>
                      <p className="text-green-600 font-medium">{project.results}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right text-sm text-gray-500 whitespace-nowrap">
                <p>📅 {project.startDate}</p>
                {project.endDate && <p>至 {project.endDate}</p>}
                {!project.endDate && project.status === 'in-progress' && (
                  <p className="text-blue-600">進行中</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-600">
            {projects.filter(p => p.status === 'completed').length}
          </p>
          <p className="text-sm text-gray-600">已完成專案</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">
            {projects.filter(p => p.status === 'in-progress').length}
          </p>
          <p className="text-sm text-gray-600">進行中專案</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">
            {new Set(projects.map(p => p.role)).size}
          </p>
          <p className="text-sm text-gray-600">不同角色</p>
        </div>
      </div>
    </section>
  );
}
