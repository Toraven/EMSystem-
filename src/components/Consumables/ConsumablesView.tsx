import React, { useState } from 'react';
import { Clock, Package, AlertTriangle, Plus, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockConsumables, mockEquipment } from '../../data/mockData';
import { formatDate, getDaysUntilDue } from '../../utils/dateHelpers';
import { getConsumableStatusColor, formatStatusText } from '../../utils/statusHelpers';

export const ConsumablesView: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredConsumables = mockConsumables.filter(consumable => {
    const equipment = mockEquipment.find(e => e.id === consumable.equipmentId);
    const matchesSearch = consumable.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consumable.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment?.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || consumable.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getUrgencyLevel = (status: string, daysUntil: number) => {
    if (status === 'overdue') return 'critical';
    if (status === 'due_soon' && daysUntil <= 7) return 'high';
    if (status === 'due_soon') return 'medium';
    return 'low';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('consumables.title')}</h2>
          <p className="text-gray-600">{t('consumables.subtitle')}</p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          {t('consumables.addConsumable')}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-600 bg-blue-100 rounded-lg p-2" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">{t('consumables.totalConsumables')}</p>
              <p className="text-xl font-bold text-gray-900">{mockConsumables.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-600 bg-green-100 rounded-lg p-2" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">{t('consumables.okStatus')}</p>
              <p className="text-xl font-bold text-gray-900">
                {mockConsumables.filter(c => c.status === 'ok').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600 bg-yellow-100 rounded-lg p-2" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">{t('consumables.dueSoon')}</p>
              <p className="text-xl font-bold text-gray-900">
                {mockConsumables.filter(c => c.status === 'due_soon').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 bg-red-100 rounded-lg p-2" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">{t('consumables.overdue')}</p>
              <p className="text-xl font-bold text-gray-900">
                {mockConsumables.filter(c => c.status === 'overdue').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('consumables.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">{t('consumables.allStatuses')}</option>
            <option value="ok">{t('status.ok')}</option>
            <option value="due_soon">{t('status.due_soon')}</option>
            <option value="overdue">{t('status.overdue')}</option>
            <option value="replaced">{t('status.replaced')}</option>
          </select>
        </div>
      </div>

      {/* Consumables List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('consumables.consumable')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('consumables.equipment')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('consumables.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('consumables.installDate')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('consumables.expiryDate')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('consumables.action')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredConsumables.map((consumable) => {
                const equipment = mockEquipment.find(e => e.id === consumable.equipmentId);
                const daysUntil = getDaysUntilDue(consumable.expiryDate);
                const urgency = getUrgencyLevel(consumable.status, daysUntil);

                return (
                  <tr key={consumable.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{consumable.type}</div>
                        <div className="text-sm text-gray-500 font-mono">{consumable.serialNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{equipment?.productName}</div>
                        <div className="text-sm text-gray-500">{equipment?.serialNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getConsumableStatusColor(consumable.status)}`}>
                        {t(`status.${consumable.status}`)}
                      </span>
                      {urgency !== 'low' && (
                        <div className={`text-xs mt-1 font-medium ${
                          urgency === 'critical' ? 'text-red-600' :
                          urgency === 'high' ? 'text-orange-600' : 'text-yellow-600'
                        }`}>
                          {daysUntil < 0 ? `${Math.abs(daysUntil)} ${t('maintenance.daysOverdue')}` : `${daysUntil} ${t('consumables.daysRemaining')}`}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(consumable.installDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(consumable.expiryDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">
                        {t('consumables.replace')}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredConsumables.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('consumables.noConsumablesFound')}</h3>
          <p className="text-gray-500">{t('equipment.adjustCriteria')}</p>
        </div>
      )}
    </div>
  );
};