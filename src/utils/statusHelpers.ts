import { EquipmentStatus, ConsumableStatus } from '../types';

export const getStatusColor = (status: EquipmentStatus): string => {
  switch (status) {
    case 'in_service':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'under_maintenance':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'out_of_service':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'decommissioned':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getConsumableStatusColor = (status: ConsumableStatus): string => {
  switch (status) {
    case 'ok':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'due_soon':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'overdue':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'replaced':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const formatStatusText = (status: string): string => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};