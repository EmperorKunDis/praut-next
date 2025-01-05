
import React, { useState, useEffect } from 'react';
import AnalyticsCard from './AnalyticsCard';
import AnalyticsChart from './AnalyticsChart';
import { Download, Filter } from 'lucide-react';

interface TeamAnalyticsProps {
  teamId: string;
  className?: string;
}

const TeamAnalytics = ({ teamId, className = '' }: TeamAnalyticsProps) => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalAutomations: 0,
    activeAgents: 0,
    processedTasks: 0,
    avgResponseTime: 0,
    successRate: 0,
    costSavings: 0
  });
  const [timeseriesData, setTimeseriesData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState('7D');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // TODO: Implement actual API calls
        // Mock data for demonstration
        setMetrics({
          totalAutomations: 156,
          activeAgents: 12,
          processedTasks: 1420,
          avgResponseTime: 1.8,
          successRate: 98.5,
          costSavings: 45000
        });

        const mockTimeseriesData = Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          tasks: Math.floor(Math.random() * 100) + 50,
          successRate: 95 + Math.random() * 5,
          responseTime: 1 + Math.random()
        }));

        setTimeseriesData(mockTimeseriesData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId, selectedDateRange]);

  const chartSeries = [
    { key: 'tasks', name: 'Processed Tasks', color: '#3B82F6' },
    { key: 'successRate', name: 'Success Rate', color: '#10B981' },
    { key: 'responseTime', name: 'Avg Response Time', color: '#F59E0B' }
  ];

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team Performance Analytics</h2>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <AnalyticsCard
          title="Total Automations"
          value={metrics.totalAutomations}
          change={12}
          loading={loading}
        />
        <AnalyticsCard
          title="Active AI Agents"
          value={metrics.activeAgents}
          change={8}
          loading={loading}
        />
        <AnalyticsCard
          title="Processed Tasks"
          value={metrics.processedTasks}
          change={15}
          loading={loading}
        />
        <AnalyticsCard
          title="Average Response Time"
          value={metrics.avgResponseTime}
          unit="s"
          change={-5}
          loading={loading}
        />
        <AnalyticsCard
          title="Success Rate"
          value={metrics.successRate}
          unit="%"
          change={2}
          loading={loading}
        />
        <AnalyticsCard
          title="Estimated Cost Savings"
          value={metrics.costSavings}
          unit="€"
          change={20}
          loading={loading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <AnalyticsChart
          title="Performance Trends"
          data={timeseriesData}
          series={chartSeries}
          loading={loading}
          className="h-[400px]"
        />
      </div>
    </div>
  );
};

export default TeamAnalytics;