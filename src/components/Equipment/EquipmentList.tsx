import React, { useState } from 'react';
import { Search, Filter, Plus, Package } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockEquipment, mockBlocks } from '../../data/mockData';
import { EquipmentCard } from './EquipmentCard';

export const EquipmentList: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredEquipment = mockEquipment.filter(equipment => {
    const matchesSearch = equipment.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlock = selectedBlock === 'all' || equipment.blockId === selectedBlock;
    const matchesStatus = selectedStatus === 'all' || equipment.status === selectedStatus;
    
    return matchesSearch && matchesBlock && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('equipment.title')}</h2>
          <p className="text-gray-600">{t('equipment.subtitle')}</p>
        </div>
        <button 
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('equipment.addEquipment')}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('equipment.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">{t('equipment.allBlocks')}</option>
            {mockBlocks.map((block) => (
              <option key={block.id} value={block.id}>
                {block.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">{t('equipment.allStatuses')}</option>
            <option value="in_service">{t('status.in_service')}</option>
            <option value="under_maintenance">{t('status.under_maintenance')}</option>
            <option value="out_of_service">{t('status.out_of_service')}</option>
            <option value="decommissioned">{t('status.decommissioned')}</option>
          </select>

          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            {t('equipment.moreFilters')}
          </button>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('equipment.noEquipmentFound')}</h3>
          <p className="text-gray-500">{t('equipment.adjustCriteria')}</p>
        </div>
      )}

      {/* Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{filteredEquipment.length}</p>
            <p className="text-sm text-gray-600">{t('equipment.totalShown')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {filteredEquipment.filter(e => e.status === 'in_service').length}
            </p>
            <p className="text-sm text-gray-600">{t('dashboard.inService')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {filteredEquipment.filter(e => e.status === 'under_maintenance').length}
            </p>
            <p className="text-sm text-gray-600">{t('equipment.underMaintenance')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">
              {filteredEquipment.filter(e => e.status === 'out_of_service').length}
            </p>
            <p className="text-sm text-gray-600">{t('equipment.outOfService')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};