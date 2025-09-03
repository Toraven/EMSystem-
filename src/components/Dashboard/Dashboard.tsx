import React from 'react';
import { MetricsGrid } from './MetricsGrid';
import { RecentActivity } from './RecentActivity';
import { UpcomingTasks } from './UpcomingTasks';
import { EquipmentChart } from './EquipmentChart';
import { useLanguage } from '../../contexts/LanguageContext';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h2>
            <p className="text-blue-100 text-lg">{t('dashboard.subtitle')}</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-blue-100">{t('dashboard.todaysDate')}</p>
              <p className="text-xl font-bold">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
        </div>
      </div>

      <MetricsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EquipmentChart />
        <UpcomingTasks />
      </div>

      <RecentActivity />
    </div>
  );
};