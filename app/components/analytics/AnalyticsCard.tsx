
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  unit?: string;
  change?: number;
  timeframe?: string;
  description?: string;
  loading?: boolean;
  className?: string;
}

const AnalyticsCard = ({
  title,
  value,
  unit = '',
  change,
  timeframe = 'vs. last period',
  description,
  loading = false,
  className = ''
}: AnalyticsCardProps) => {
  const formatChange = (change: number) => {
    const absChange = Math.abs(change);
    return `${absChange}%`;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="p-6">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold mb-2">
              {value}
              {unit && <span className="text-gray-500 text-lg ml-1">{unit}</span>}
            </div>
            
            {typeof change !== 'undefined' && (
              <div className="flex items-center gap-1">
                <span className={`flex items-center ${getChangeColor(change)}`}>
                  {getChangeIcon(change)}
                  {formatChange(change)}
                </span>
                <span className="text-gray-500 text-sm">
                  {timeframe}
                </span>
              </div>
            )}
            
            {description && (
              <p className="mt-2 text-sm text-gray-500">
                {description}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;