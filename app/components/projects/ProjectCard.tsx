import React from 'react';
import Link from 'next/link';
import { 
  BarChart2, 
  Clock, 
  Users, 
  Bot,
  AlertCircle,
  CheckCircle2,
  PlayCircle,
  PauseCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  activeAgents: number;
  avgResponseTime: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
  members: ProjectMember[];
  stats: ProjectStats;
  lastActive: Date;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard = ({ project, className = '' }: ProjectCardProps) => {
  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'IN_PROGRESS':
        return <PlayCircle className="w-5 h-5 text-green-500" />;
      case 'COMPLETED':
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      case 'ON_HOLD':
        return <PauseCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Project['status']) => {
    return status.replace('_', ' ').toLowerCase();
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getProgressPercentage = () => {
    return Math.round((project.stats.completedTasks / project.stats.totalTasks) * 100) || 0;
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <Link 
              href={`/projects/${project.id}`}
              className="text-xl font-semibold hover:text-blue-600 transition-colors"
            >
              {project.name}
            </Link>
            <p className="text-gray-600 mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {getStatusIcon(project.status)}
            <span className="capitalize">
              {getStatusText(project.status)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm font-medium">Active Agents</div>
              <div className="text-2xl font-semibold">
                {project.stats.activeAgents}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm font-medium">Avg Response</div>
              <div className="text-2xl font-semibold">
                {project.stats.avgResponseTime}s
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {getProgressPercentage()}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex -space-x-2">
              {project.members.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium"
                  title={`${member.name} (${member.role})`}
                >
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
              ))}
              {project.members.length > 4 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                  +{project.members.length - 4}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Active {getTimeAgo(project.lastActive)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;