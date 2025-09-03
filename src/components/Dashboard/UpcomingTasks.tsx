import React from 'react';
import { Clock, Wrench } from 'lucide-react';
import { mockWorkOrders, mockConsumables, mockEquipment } from '../../data/mockData';
import { getDaysUntilDue } from '../../utils/dateHelpers';

export const UpcomingTasks: React.FC = () => {
  const openWorkOrders = mockWorkOrders.filter(wo => wo.status === 'open');
  const dueSoonConsumables = mockConsumables.filter(c => c.status === 'due_soon' || c.status === 'overdue');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Tasks</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
            <Wrench className="h-5 w-5 mr-2 text-blue-600" />
            Work Orders
          </h4>
          <div className="space-y-2">
            {openWorkOrders.slice(0, 3).map((wo) => {
              const equipment = mockEquipment.find(e => e.id === wo.equipmentId);
              const daysUntil = getDaysUntilDue(wo.dueDate);
              
              return (
                <div key={wo.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">
                      {equipment?.productName}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{wo.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(wo.priority)}`}>
                      {wo.priority}
                    </span>
                    <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded-full">
                      {daysUntil > 0 ? `${daysUntil}d` : 'Overdue'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-purple-600" />
            Consumables Due
          </h4>
          <div className="space-y-2">
            {dueSoonConsumables.slice(0, 3).map((consumable) => {
              const equipment = mockEquipment.find(e => e.id === consumable.equipmentId);
              const daysUntil = getDaysUntilDue(consumable.expiryDate);
              
              return (
                <div key={consumable.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">
                      {consumable.type}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{equipment?.productName}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      consumable.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {consumable.status === 'overdue' ? 'Overdue' : 'Due Soon'}
                    </span>
                    <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded-full">
                      {daysUntil > 0 ? `${daysUntil}d` : `${Math.abs(daysUntil)}d ago`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {(openWorkOrders.length > 3 || dueSoonConsumables.length > 3) && (
        <button className="w-full mt-6 py-3 text-sm text-blue-600 hover:text-blue-800 font-bold bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200">
          View All Tasks
        </button>
      )}
    </div>
  );
};