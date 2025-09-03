import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { EquipmentList } from './components/Equipment/EquipmentList';
import { MaintenanceView } from './components/Maintenance/MaintenanceView';
import { ConsumablesView } from './components/Consumables/ConsumablesView';
import { UsersView } from './components/Users/UsersView';
import { ReportsView } from './components/Reports/ReportsView';
import { SettingsView } from './components/Settings/SettingsView';
import { LanguageProvider } from './contexts/LanguageContext';
import { mockNotifications } from './data/mockData';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'equipment':
        return <EquipmentList />;
      case 'maintenance':
        return <MaintenanceView />;
      case 'consumables':
        return <ConsumablesView />;
      case 'users':
        return <UsersView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            notificationCount={mockNotifications.filter(n => !n.isRead).length}
          />
          
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;