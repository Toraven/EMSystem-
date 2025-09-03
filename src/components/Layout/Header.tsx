import React from 'react';
import { Bell, Search, User, Menu, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  onMenuToggle: () => void;
  notificationCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, notificationCount }) => {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center ml-2 md:ml-0">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">EMS</span>
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                Equipment Management
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('header.search')}
                className="block w-80 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            <LanguageSwitcher />

            <button className="relative p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200">
              <Bell className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                <div className="h-9 w-9 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-900">Администратор</p>
                  <p className="text-xs text-gray-500">Системный администратор</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Settings className="h-4 w-4 mr-3" />
                    {t('header.settings')}
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <LogOut className="h-4 w-4 mr-3" />
                    {t('header.signOut')}
                  </button>
                </div>
              )}

              {userMenuOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
              )}
              </div>
          </div>
        </div>
      </div>
    </header>
  );
};