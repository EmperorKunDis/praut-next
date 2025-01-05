import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus,
  SortAsc,
  SortDesc,
  Loader
} from 'lucide-react';
import ProjectCard, { Project } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  loading?: boolean;
  onCreateProject?: () => void;
  className?: string;
}

type SortField = 'name' | 'status' | 'lastActive' | 'progress';
type SortOrder = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  order: SortOrder;
}

const ProjectList = ({ 
  projects, 
  loading = false, 
  onCreateProject,
  className = '' 
}: ProjectListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Project['status'] | 'ALL'>('ALL');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    field: 'lastActive', 
    order: 'desc' 
  });

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredAndSortedProjects = useMemo(() => {
    return projects
      .filter(project => {
        const matchesSearch = project.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
            
        const matchesStatus = statusFilter === 'ALL' || 
          project.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const { field, order } = sortConfig;
        let comparison = 0;

        switch (field) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'status':
            comparison = a.status.localeCompare(b.status);
            break;
          case 'lastActive':
            comparison = b.lastActive.getTime() - a.lastActive.getTime();
            break;
          case 'progress':
            const progressA = (a.stats.completedTasks / a.stats.totalTasks) * 100;
            const progressB = (b.stats.completedTasks / b.stats.totalTasks) * 100;
            comparison = progressA - progressB;
            break;
          default:
            comparison = 0;
        }

        return order === 'asc' ? comparison : -comparison;
      });
  }, [projects, searchQuery, statusFilter, sortConfig]);

  return (
    <div className={className}>
      {/* Header with controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Project['status'] | 'ALL')}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ON_HOLD">On Hold</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortConfig.field}
              onChange={(e) => handleSort(e.target.value as SortField)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Name</option>
              <option value="status">Status</option>
              <option value="lastActive">Last Active</option>
              <option value="progress">Progress</option>
            </select>
            <button
              onClick={() => setSortConfig(prev => ({
                ...prev,
                order: prev.order === 'asc' ? 'desc' : 'asc'
              }))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sortConfig.order === 'asc' ? (
                <SortAsc className="w-5 h-5" />
              ) : (
                <SortDesc className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            onClick={onCreateProject}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>

      {/* Project grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filteredAndSortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'ALL'
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Get started by creating your first project."}
          </p>
          {!searchQuery && statusFilter === 'ALL' && (
            <button
              onClick={onCreateProject}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Create Project
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectList;