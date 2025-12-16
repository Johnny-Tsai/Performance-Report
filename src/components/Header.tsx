import { PersonalInfo, Summary } from '../types/performance';

interface HeaderProps {
  personalInfo: PersonalInfo;
  summary: Summary;
}

export function Header({ personalInfo }: HeaderProps) {
  return (
    <header className="glass-card p-8 mb-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg bg-white">
          <img 
            src={`${import.meta.env.BASE_URL}avatar.gif`}
            alt={personalInfo.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {personalInfo.name}
          </h1>
          <p className="text-xl text-blue-600 font-medium mb-4">
            {personalInfo.title}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 mb-4">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{personalInfo.department}</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>主管：{personalInfo.manager}</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>考核期間：{personalInfo.reviewPeriod}</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              <span>員工編號：{personalInfo.employeeId}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
