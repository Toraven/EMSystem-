import React, { useState } from 'react';
import { BarChart3, FileText, Download, Calendar, TrendingUp, Package, Users, Wrench } from 'lucide-react';
import { mockEquipment, mockWorkOrders, mockConsumables, mockBlocks, mockUsers } from '../../data/mockData';
import { formatDate } from '../../utils/dateHelpers';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  type: 'equipment' | 'maintenance' | 'compliance' | 'usage';
}

const reportTypes: ReportCard[] = [
  {
    id: 'equipment-status',
    title: 'Equipment Status Report',
    description: 'Current status and location of all equipment',
    icon: Package,
    type: 'equipment'
  },
  {
    id: 'maintenance-summary',
    title: 'Maintenance Summary',
    description: 'Completed and upcoming maintenance activities',
    icon: Wrench,
    type: 'maintenance'
  },
  {
    id: 'compliance-report',
    title: 'Compliance Report',
    description: 'Maintenance compliance and overdue items',
    icon: BarChart3,
    type: 'compliance'
  },
  {
    id: 'block-utilization',
    title: 'Block Utilization',
    description: 'Equipment distribution across blocks',
    icon: TrendingUp,
    type: 'usage'
  }
];

export const ReportsView: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2025-12-31' });

  const generateEquipmentReport = () => {
    const statusCounts = mockEquipment.reduce((acc, eq) => {
      acc[eq.status] = (acc[eq.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600 capitalize">{status.replace('_', ' ')}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Block</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Maintenance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockEquipment.map((equipment) => {
                const block = mockBlocks.find(b => b.id === equipment.blockId);
                return (
                  <tr key={equipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{equipment.productName}</div>
                        <div className="text-sm text-gray-500">{equipment.serialNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{block?.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        equipment.status === 'in_service' ? 'bg-green-100 text-green-800' :
                        equipment.status === 'under_maintenance' ? 'bg-yellow-100 text-yellow-800' :
                        equipment.status === 'out_of_service' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {equipment.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{equipment.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {equipment.lastMaintenanceDate ? formatDate(equipment.lastMaintenanceDate) : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const generateMaintenanceReport = () => {
    const completedWOs = mockWorkOrders.filter(wo => wo.status === 'completed');
    const pendingWOs = mockWorkOrders.filter(wo => wo.status !== 'completed');

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{mockWorkOrders.length}</p>
            <p className="text-sm text-gray-600">Total Work Orders</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{completedWOs.length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{pendingWOs.length}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round((completedWOs.length / mockWorkOrders.length) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Work Orders by Status</h4>
            <div className="space-y-2">
              {['open', 'in_progress', 'completed', 'cancelled'].map((status) => {
                const count = mockWorkOrders.filter(wo => wo.status === status).length;
                const percentage = (count / mockWorkOrders.length) * 100;
                return (
                  <div key={status} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">{status.replace('_', ' ')}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Work Orders by Priority</h4>
            <div className="space-y-2">
              {['critical', 'high', 'medium', 'low'].map((priority) => {
                const count = mockWorkOrders.filter(wo => wo.priority === priority).length;
                const percentage = count > 0 ? (count / mockWorkOrders.length) * 100 : 0;
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">{priority}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            priority === 'critical' ? 'bg-red-500' :
                            priority === 'high' ? 'bg-orange-500' :
                            priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const generateComplianceReport = () => {
    const totalEquipment = mockEquipment.length;
    const inService = mockEquipment.filter(e => e.status === 'in_service').length;
    const underMaintenance = mockEquipment.filter(e => e.status === 'under_maintenance').length;
    const outOfService = mockEquipment.filter(e => e.status === 'out_of_service').length;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Equipment Availability</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((inService / totalEquipment) * 100)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Wrench className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Maintenance Compliance</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">2.3h</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Equipment Status Distribution</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">In Service</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(inService / totalEquipment) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">{inService}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Under Maintenance</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-yellow-500"
                    style={{ width: `${(underMaintenance / totalEquipment) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">{underMaintenance}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Out of Service</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${(outOfService / totalEquipment) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">{outOfService}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'equipment-status':
        return generateEquipmentReport();
      case 'maintenance-summary':
        return generateMaintenanceReport();
      case 'compliance-report':
        return generateComplianceReport();
      case 'block-utilization':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockBlocks.map((block) => (
                <div key={block.id} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-gray-900">{block.equipmentCount}</p>
                  <p className="text-sm text-gray-600">{block.name}</p>
                  <p className="text-xs text-gray-500">{block.department}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Generate comprehensive reports and insights</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      {!selectedReport ? (
        <>
          {/* Report Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {report.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{report.description}</p>
                      <div className="mt-4">
                        <span className="inline-flex items-center text-sm text-blue-600 font-medium">
                          Generate Report
                          <BarChart3 className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockEquipment.length}</p>
                <p className="text-sm text-gray-600">Total Equipment</p>
              </div>
              <div>
                <Wrench className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockWorkOrders.length}</p>
                <p className="text-sm text-gray-600">Work Orders</p>
              </div>
              <div>
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockConsumables.length}</p>
                <p className="text-sm text-gray-600">Consumables</p>
              </div>
              <div>
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockUsers.length}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Report Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {reportTypes.find(r => r.id === selectedReport)?.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Generated on {formatDate(new Date().toISOString())} 
                  • Period: {formatDate(dateRange.start)} to {formatDate(dateRange.end)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back to Reports
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderReportContent()}
          </div>
        </>
      )}
    </div>
  );
};