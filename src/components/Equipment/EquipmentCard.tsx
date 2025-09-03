import React from 'react';
import { MapPin, Calendar, QrCode, MoreVertical, Wrench, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Equipment } from '../../types';
import { mockBlocks } from '../../data/mockData';
import { formatDate, getDaysUntilDue, isOverdue } from '../../utils/dateHelpers';
import { getStatusColor, formatStatusText } from '../../utils/statusHelpers';

interface EquipmentCardProps {
  equipment: Equipment;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  const { t } = useLanguage();
  const block = mockBlocks.find(b => b.id === equipment.blockId);
  const daysUntilMaintenance = equipment.nextDueDate ? getDaysUntilDue(equipment.nextDueDate) : null;
  const maintenanceOverdue = equipment.nextDueDate ? isOverdue(equipment.nextDueDate) : false;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group overflow-hidden">
      <div className="p-6 relative">
        {/* Status indicator */}
        <div className={`absolute top-0 right-0 w-1 h-full ${
          equipment.status === 'in_service' ? 'bg-green-500' :
          equipment.status === 'under_maintenance' ? 'bg-yellow-500' :
          equipment.status === 'out_of_service' ? 'bg-red-500' :
          'bg-gray-500'
        }`} />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {equipment.productName}
            </h3>
            <p className="text-sm text-gray-500 font-medium">{equipment.manufacturer} - {equipment.model}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <QrCode className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(equipment.status)}`}>
            {t(`status.${equipment.status}`)}
          </span>
        </div>

        {/* Equipment Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm">
            <span className="font-semibold text-gray-500 w-20">{t('equipment.serial')}</span>
            <span className="font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded text-xs">{equipment.serialNumber}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium">{equipment.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-semibold text-gray-500 w-20">{t('equipment.block')}</span>
            <span className="text-gray-900 font-medium">{block?.name}</span>
          </div>
        </div>

        {/* Maintenance Status */}
        {equipment.nextDueDate && (
          <div className={`p-4 rounded-xl border-2 ${
            maintenanceOverdue 
              ? 'bg-red-50 border-red-200 shadow-red-100' 
              : daysUntilMaintenance !== null && daysUntilMaintenance <= 14
                ? 'bg-yellow-50 border-yellow-200 shadow-yellow-100'
                : 'bg-green-50 border-green-200 shadow-green-100'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {maintenanceOverdue ? (
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                ) : (
                  <Wrench className="h-5 w-5 text-gray-600 mr-3" />
                )}
                <span className="text-sm font-semibold">
                  {maintenanceOverdue ? t('equipment.overdue') : t('equipment.nextMaintenance')}
                </span>
              </div>
              <span className="text-sm font-bold">
                {maintenanceOverdue 
                  ? `${Math.abs(daysUntilMaintenance!)}д ${t('maintenance.daysOverdue')}`
                  : daysUntilMaintenance === 0 
                    ? t('equipment.dueToday')
                    : `${daysUntilMaintenance}д`
                }
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Due: {formatDate(equipment.nextDueDate)}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-100">
          <button className="flex-1 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 hover:shadow-md transition-all duration-200">
            {t('equipment.viewDetails')}
          </button>
          <button className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-200">
            {t('equipment.logWork')}
          </button>
        </div>
      </div>
    </div>
  );
};