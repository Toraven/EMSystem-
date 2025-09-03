import React from 'react';
import { Activity, User, Clock, Wrench } from 'lucide-react';
import { formatDateTime } from '../../utils/dateHelpers';

interface ActivityItem {
  id: string;
  type: 'maintenance' | 'equipment_added' | 'consumable_replaced' | 'user_login';
  description: string;
  user: string;
  timestamp: string;
  equipment?: string;
}

const mockRecentActivity: ActivityItem[] = [
  {
    id: 'act-001',
    type: 'maintenance',
    description: 'Completed quarterly maintenance',
    user: 'Mike Wilson',
    timestamp: '2025-01-03T14:30:00Z',
    equipment: 'RO Unit (WT-RO-001)'
  },
  {
    id: 'act-002',
    type: 'consumable_replaced',
    description: 'Replaced UV lamp',
    user: 'Lisa Chen',
    timestamp: '2025-01-03T11:15:00Z',
    equipment: 'UV Sterilizer (WT-UV-002)'
  },
  {
    id: 'act-003',
    type: 'equipment_added',
    description: 'Added new equipment to inventory',
    user: 'Sarah Johnson',
    timestamp: '2025-01-03T09:45:00Z',
    equipment: 'Pressure Tank (WT-PT-005)'
  },
  {
    id: 'act-004',
    type: 'maintenance',
    description: 'Started periodic maintenance',
    user: 'Mike Wilson',
    timestamp: '2025-01-02T16:20:00Z',
    equipment: 'Steam Autoclave (AC-ST-001)'
  },
  {
    id: 'act-005',
    type: 'user_login',
    description: 'User logged into system',
    user: 'John Administrator',
    timestamp: '2025-01-02T08:00:00Z'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'maintenance': return <Wrench className="h-4 w-4" />;
    case 'equipment_added': return <Activity className="h-4 w-4" />;
    case 'consumable_replaced': return <Clock className="h-4 w-4" />;
    case 'user_login': return <User className="h-4 w-4" />;
    default: return <Activity className="h-4 w-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'maintenance': return 'bg-blue-100 text-blue-600';
    case 'equipment_added': return 'bg-green-100 text-green-600';
    case 'consumable_replaced': return 'bg-purple-100 text-purple-600';
    case 'user_login': return 'bg-gray-100 text-gray-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
      
      <div className="space-y-5">
        {mockRecentActivity.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
            <div className={`p-3 rounded-xl ${getActivityColor(activity.type)} shadow-sm`}>
              <div className="h-5 w-5">
                {getActivityIcon(activity.type)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">
                {activity.description}
                {activity.equipment && (
                  <span className="text-gray-600 font-medium"> - {activity.equipment}</span>
                )}
              </p>
              <div className="flex items-center mt-2 text-xs text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span className="mr-4 font-medium">{activity.user}</span>
                <Clock className="h-4 w-4 mr-2" />
                <span className="font-medium">{formatDateTime(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 text-sm text-blue-600 hover:text-blue-800 font-bold bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200">
        View All Activity
      </button>
    </div>
  );
};