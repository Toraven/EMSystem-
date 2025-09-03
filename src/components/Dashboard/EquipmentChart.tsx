import React from 'react';
import { mockDashboardMetrics, mockBlocks } from '../../data/mockData';

export const EquipmentChart: React.FC = () => {
  const metrics = mockDashboardMetrics;
  const total = Object.values(metrics.equipmentByStatus).reduce((a, b) => a + b, 0);

  const statusData = [
    { label: 'In Service', value: metrics.equipmentByStatus.in_service, color: 'bg-green-500' },
    { label: 'Under Maintenance', value: metrics.equipmentByStatus.under_maintenance, color: 'bg-yellow-500' },
    { label: 'Out of Service', value: metrics.equipmentByStatus.out_of_service, color: 'bg-red-500' },
    { label: 'Decommissioned', value: metrics.equipmentByStatus.decommissioned, color: 'bg-gray-500' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Equipment Status Overview</h3>
      
      <div className="space-y-4">
        {statusData.map((item) => {
          const percentage = (item.value / total) * 100;
          return (
            <div key={item.label} className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">{item.label}</span>
                <span className="font-bold text-gray-900">{item.value} ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-3 rounded-full ${item.color} transition-all duration-500 shadow-sm`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Equipment by Block</h4>
        <div className="space-y-2">
          {mockBlocks.map((block) => (
            <div key={block.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <span className="text-gray-700 font-medium">{block.name}</span>
              <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-full text-sm">{block.equipmentCount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};