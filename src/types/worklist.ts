export interface WorkItem {
  id: string;
  projectName: string;
  type: '工作' | 'Bug';
  description: string;
  owner: string;
  status: string;
  priority: number;
  gradingStatus: string;
  estimatedTime?: number;
  actualTime?: number;
  path1: string;
  path2: string;
  assignee: string;
  date: string;
}