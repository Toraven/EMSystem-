import React, { useState } from 'react';
import { Settings, Bell, Shield, Database, Mail, Save, AlertCircle } from 'lucide-react';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const settingSections: SettingSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Basic system configuration and preferences',
    icon: Settings
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure alerts and notification preferences',
    icon: Bell
  },
  {
    id: 'security',
    title: 'Security',
    description: 'User access control and security policies',
    icon: Shield
  },
  {
    id: 'maintenance',
    title: 'Maintenance Rules',
    description: 'Default maintenance intervals and scheduling rules',
    icon: Database
  }
];

export const SettingsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock settings state
  const [settings, setSettings] = useState({
    general: {
      companyName: 'Industrial Equipment Corp',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD',
      language: 'en'
    },
    notifications: {
      maintenanceLeadTime: 14,
      consumableLeadTime: 30,
      emailEnabled: true,
      smsEnabled: false,
      inAppEnabled: true,
      escalationDays: 7
    },
    security: {
      sessionTimeout: 60,
      passwordExpiration: 90,
      mfaRequired: false,
      loginAttempts: 5,
      lockoutDuration: 30
    },
    maintenance: {
      periodicDefault: 30,
      quarterlyDefault: 90,
      annualDefault: 365,
      overhaulDefault: 1825,
      gracePeriod: 3,
      autoAssignment: true
    }
  });

  const updateSetting = (section: string, key: string, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = () => {
    // In a real app, this would make an API call
    setHasUnsavedChanges(false);
    // Show success message
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={settings.general.companyName}
            onChange={(e) => updateSetting('general', 'companyName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="UTC-8">Pacific Time (UTC-8)</option>
            <option value="UTC-7">Mountain Time (UTC-7)</option>
            <option value="UTC-6">Central Time (UTC-6)</option>
            <option value="UTC-5">Eastern Time (UTC-5)</option>
            <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Format
          </label>
          <select
            value={settings.general.dateFormat}
            onChange={(e) => updateSetting('general', 'dateFormat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={settings.general.currency}
            onChange={(e) => updateSetting('general', 'currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maintenance Lead Time (days)
          </label>
          <input
            type="number"
            value={settings.notifications.maintenanceLeadTime}
            onChange={(e) => updateSetting('notifications', 'maintenanceLeadTime', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">How many days before maintenance due to send notifications</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Consumable Lead Time (days)
          </label>
          <input
            type="number"
            value={settings.notifications.consumableLeadTime}
            onChange={(e) => updateSetting('notifications', 'consumableLeadTime', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">How many days before consumable expires to send notifications</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email уведомления</p>
                <p className="text-xs text-gray-500">Отправлять оповещения по электронной почте</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.emailEnabled}
                onChange={(e) => updateSetting('notifications', 'emailEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{t('settings.inAppNotifications')}</p>
                <p className="text-xs text-gray-500">{t('settings.inAppNotificationsDesc')}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.inAppEnabled}
                onChange={(e) => updateSetting('notifications', 'inAppEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Expiration (days)
          </label>
          <input
            type="number"
            value={settings.security.passwordExpiration}
            onChange={(e) => updateSetting('security', 'passwordExpiration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Login Attempts
          </label>
          <input
            type="number"
            value={settings.security.loginAttempts}
            onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Lockout Duration (minutes)
          </label>
          <input
            type="number"
            value={settings.security.lockoutDuration}
            onChange={(e) => updateSetting('security', 'lockoutDuration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Multi-Factor Authentication</p>
              <p className="text-xs text-gray-500">Require MFA for all users</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.mfaRequired}
              onChange={(e) => updateSetting('security', 'mfaRequired', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Periodic Interval (days)
          </label>
          <input
            type="number"
            value={settings.maintenance.periodicDefault}
            onChange={(e) => updateSetting('maintenance', 'periodicDefault', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Quarterly Interval (days)
          </label>
          <input
            type="number"
            value={settings.maintenance.quarterlyDefault}
            onChange={(e) => updateSetting('maintenance', 'quarterlyDefault', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Annual Interval (days)
          </label>
          <input
            type="number"
            value={settings.maintenance.annualDefault}
            onChange={(e) => updateSetting('maintenance', 'annualDefault', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grace Period (days)
          </label>
          <input
            type="number"
            value={settings.maintenance.gracePeriod}
            onChange={(e) => updateSetting('maintenance', 'gracePeriod', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Days after due date before marking as overdue</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Database className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Auto-Assignment</p>
              <p className="text-xs text-gray-500">Automatically assign maintenance to available technicians</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenance.autoAssignment}
              onChange={(e) => updateSetting('maintenance', 'autoAssignment', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'maintenance':
        return renderMaintenanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
          <p className="text-gray-600">Configure system preferences and policies</p>
        </div>
        {hasUnsavedChanges && (
          <button
            onClick={saveSettings}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        )}
      </div>

      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
            <p className="text-sm text-yellow-800">
              You have unsaved changes. Don't forget to save your settings.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              {settingSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    <div>
                      <div>{section.title}</div>
                      <div className="text-xs text-gray-500 font-normal">{section.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {settingSections.find(s => s.id === activeSection)?.title}
              </h3>
              <p className="text-sm text-gray-600">
                {settingSections.find(s => s.id === activeSection)?.description}
              </p>
            </div>

            {renderSettingsContent()}
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700">Version</p>
            <p className="text-sm text-gray-900">2.0.1</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Last Updated</p>
            <p className="text-sm text-gray-900">January 3, 2025</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Database Status</p>
            <div className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
              <p className="text-sm text-green-600">Connected</p>
              <p className="text-sm text-green-600">{t('settings.connected')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};