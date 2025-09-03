import React, { useState } from 'react';
import { Calendar, Clock, User, Plus, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockWorkOrders, mockEquipment, mockUsers, mockMaintenanceSchedules } from '../../data/mockData';
import { formatDate, getDaysUntilDue, isOverdue } from '../../utils/dateHelpers';
import { formatStatusText } from '../../utils/statusHelpers';

export const MaintenanceView: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'workorders' | 'schedule'>('workorders');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('maintenance.title')}</h2>
          <p className="text-gray-600">{t('maintenance.subtitle')}</p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          {t('maintenance.createWorkOrder')}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('workorders')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'workorders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('maintenance.workOrders')}
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('maintenance.schedule')}
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'workorders' && (
            <div className="space-y-4">
              {mockWorkOrders.map((workOrder) => {
                const equipment = mockEquipment.find(e => e.id === workOrder.equipmentId);
                const technician = mockUsers.find(u => u.id === workOrder.technicianId);
                const daysUntil = getDaysUntilDue(workOrder.dueDate);
                const overdue = isOverdue(workOrder.dueDate);

                return (
                  <div key={workOrder.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">
                            ЗР-{workOrder.id.slice(-3).toUpperCase()}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(workOrder.status)}`}>
                            {t(`status.${workOrder.status}`)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(workOrder.priority)}`}>
                            {workOrder.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{workOrder.description}</p>
                        <p className="text-sm font-medium text-gray-900">{equipment?.productName}</p>
                        <p className="text-xs text-gray-500">{equipment?.serialNumber}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium">{t('maintenance.dueDate')}</p>
                          <p className={overdue ? 'text-red-600 font-medium' : ''}>
                            {formatDate(workOrder.dueDate)}
                            {overdue ? ` (${t('equipment.overdue')})` : daysUntil === 0 ? ` (${t('equipment.dueToday')})` : ` (${daysUntil}д)`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium">{t('maintenance.technician')}</p>
                          <p>{technician ? `${technician.firstName} ${technician.lastName}` : t('maintenance.unassigned')}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium">{t('maintenance.type')}</p>
                          <p>{workOrder.type}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        {t('equipment.viewDetails')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              {mockMaintenanceSchedules.map((schedule) => {
                const equipment = mockEquipment.find(e => e.id === schedule.equipmentId);
                const technician = mockUsers.find(u => u.id === schedule.assignedTechnicianId);
                const daysUntil = getDaysUntilDue(schedule.nextDueDate);
                const overdue = isOverdue(schedule.nextDueDate);

                return (
                  <div key={schedule.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                          {equipment?.productName}
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">{equipment?.serialNumber}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          overdue ? 'bg-red-100 text-red-800 border-red-200' : 
                          daysUntil <= 7 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                          'bg-green-100 text-green-800 border-green-200'
                        }`}>
                          {t(`status.${schedule.maintenanceType}`) || formatStatusText(schedule.maintenanceType)}
                        </span>
                      </div>
                      {overdue && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium">{t('maintenance.nextDue')}</p>
                          <p className={overdue ? 'text-red-600 font-medium' : ''}>
                            {formatDate(schedule.nextDueDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium">{t('maintenance.frequency')}</p>
                          <p>{schedule.frequency} {t('maintenance.days')}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium">{t('maintenance.assignedTo')}</p>
                          <p>{technician ? `${technician.firstName} ${technician.lastName}` : t('maintenance.unassigned')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <span className={`text-sm font-medium ${
                        overdue ? 'text-red-600' : 
                        daysUntil <= 7 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {overdue ? `${Math.abs(daysUntil)} ${t('maintenance.daysOverdue')}` : 
                         daysUntil === 0 ? t('equipment.dueToday') : 
                         `${t('maintenance.dueIn')} ${daysUntil} ${t('maintenance.days')}`}
                      </span>
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        {t('maintenance.createWorkOrder')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};