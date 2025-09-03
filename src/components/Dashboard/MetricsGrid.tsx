import React from 'react';
import { Package, Wrench, AlertTriangle, TrendingUp } from 'lucide-react';
import { mockDashboardMetrics } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  change?: string;
  trend?: 'up' | 'down';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  change, 
  trend 
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {change && (
          <div className={`flex items-center mt-2 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`h-4 w-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
            <span className="font-medium">{change}</span>
          </div>
        )}
      </div>
      <div className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-7 w-7" />
      </div>
    </div>
  </div>
);

export const MetricsGrid: React.FC = () => {
  const metrics = mockDashboardMetrics;
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <MetricCard
        title={t('dashboard.totalEquipment')}
        value={metrics.totalEquipment}
        icon={Package}
        color="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700"
        change="+2.5%"
        trend="up"
      />
      <MetricCard
        title={t('dashboard.inService')}
        value={metrics.equipmentByStatus.in_service}
        icon={Package}
        color="bg-gradient-to-br from-green-100 to-green-200 text-green-700"
        change="+1.2%"
        trend="up"
      />
      <MetricCard
        title={t('dashboard.upcomingMaintenance')}
        value={metrics.upcomingMaintenance}
        icon={Wrench}
        color="bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700"
      />
      <MetricCard
        title={t('dashboard.overdueItems')}
        value={metrics.overdueMaintenance + metrics.consumablesOverdue}
        icon={AlertTriangle}
        color="bg-gradient-to-br from-red-100 to-red-200 text-red-700"
      />
      <MetricCard
        title={t('dashboard.completionRate')}
        value={`${metrics.completionRate}%`}
        icon={TrendingUp}
        color="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700"
        change="+3.1%"
        trend="up"
      />
    </div>
  );
};