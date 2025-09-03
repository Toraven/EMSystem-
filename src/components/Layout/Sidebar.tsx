import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  Clock, 
  Users, 
  BarChart3, 
  Settings,
  X,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { id: 'equipment', labelKey: 'nav.equipment', icon: Package },
  { id: 'maintenance', labelKey: 'nav.maintenance', icon: Wrench },
  { id: 'consumables', labelKey: 'nav.consumables', icon: Clock },
  { id: 'users', labelKey: 'nav.users', icon: Users },
  { id: 'reports', labelKey: 'nav.reports', icon: BarChart3 },
  { id: 'settings', labelKey: 'nav.settings', icon: Settings }
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onClose 
}) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-gray-100
        md:relative md:transform-none md:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100 md:hidden">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">EMS</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{t('nav.dashboard')}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Navigation
            </h2>
          </div>
        </div>

        <nav className="px-6 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center">
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  {t(item.labelKey)}
                </div>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t('nav.help')}</h3>
            <p className="text-xs text-gray-600 mb-3">{t('nav.documentation')}</p>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
              {t('nav.viewDocs')}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};