import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.search': 'Search equipment...',
    'header.welcome': 'Welcome back',
    'header.settings': 'Settings',
    'header.signOut': 'Sign Out',
    
    // Sidebar
    'nav.dashboard': 'Dashboard',
    'nav.equipment': 'Equipment',
    'nav.maintenance': 'Maintenance',
    'nav.consumables': 'Consumables',
    'nav.users': 'Users',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'nav.help': 'Need Help?',
    'nav.documentation': 'Check our documentation for guides and tutorials.',
    'nav.viewDocs': 'View Documentation →',
    
    // Dashboard
    'dashboard.title': 'Welcome back, John!',
    'dashboard.subtitle': "Here's what's happening with your equipment today",
    'dashboard.todaysDate': "Today's Date",
    'dashboard.totalEquipment': 'Total Equipment',
    'dashboard.inService': 'In Service',
    'dashboard.upcomingMaintenance': 'Upcoming Maintenance',
    'dashboard.overdueItems': 'Overdue Items',
    'dashboard.completionRate': 'Completion Rate',
    'dashboard.equipmentStatus': 'Equipment Status Overview',
    'dashboard.upcomingTasks': 'Upcoming Tasks',
    'dashboard.workOrders': 'Work Orders',
    'dashboard.consumablesDue': 'Consumables Due',
    'dashboard.viewAllTasks': 'View All Tasks',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.viewAllActivity': 'View All Activity',
    'dashboard.equipmentByBlock': 'Equipment by Block',
    
    // Equipment
    'equipment.title': 'Equipment Management',
    'equipment.subtitle': 'Manage and track your equipment inventory',
    'equipment.addEquipment': 'Add Equipment',
    'equipment.searchPlaceholder': 'Search equipment...',
    'equipment.allBlocks': 'All Blocks',
    'equipment.allStatuses': 'All Statuses',
    'equipment.moreFilters': 'More Filters',
    'equipment.noEquipmentFound': 'No equipment found',
    'equipment.adjustCriteria': 'Try adjusting your search criteria',
    'equipment.totalShown': 'Total Shown',
    'equipment.underMaintenance': 'Under Maintenance',
    'equipment.outOfService': 'Out of Service',
    'equipment.viewDetails': 'View Details',
    'equipment.logWork': 'Log Work',
    'equipment.nextMaintenance': 'Next Maintenance',
    'equipment.overdue': 'Overdue',
    'equipment.dueToday': 'Due today',
    'equipment.serial': 'Serial:',
    'equipment.block': 'Block:',
    
    // Maintenance
    'maintenance.title': 'Maintenance Management',
    'maintenance.subtitle': 'Track work orders and maintenance schedules',
    'maintenance.createWorkOrder': 'Create Work Order',
    'maintenance.workOrders': 'Work Orders',
    'maintenance.schedule': 'Maintenance Schedule',
    'maintenance.dueDate': 'Due Date',
    'maintenance.technician': 'Technician',
    'maintenance.type': 'Type',
    'maintenance.nextDue': 'Next Due',
    'maintenance.frequency': 'Frequency',
    'maintenance.assignedTo': 'Assigned To',
    'maintenance.unassigned': 'Unassigned',
    'maintenance.daysOverdue': 'days overdue',
    'maintenance.dueIn': 'Due in',
    'maintenance.days': 'days',
    
    // Consumables
    'consumables.title': 'Consumables Management',
    'consumables.subtitle': 'Track and manage consumable items and replacements',
    'consumables.addConsumable': 'Add Consumable',
    'consumables.totalConsumables': 'Total Consumables',
    'consumables.okStatus': 'OK Status',
    'consumables.dueSoon': 'Due Soon',
    'consumables.overdue': 'Overdue',
    'consumables.searchPlaceholder': 'Search consumables...',
    'consumables.allStatuses': 'All Statuses',
    'consumables.consumable': 'Consumable',
    'consumables.equipment': 'Equipment',
    'consumables.status': 'Status',
    'consumables.installDate': 'Install Date',
    'consumables.expiryDate': 'Expiry Date',
    'consumables.action': 'Action',
    'consumables.replace': 'Replace',
    'consumables.noConsumablesFound': 'No consumables found',
    'consumables.daysRemaining': 'days remaining',
    
    // Users
    'users.title': 'User Management',
    'users.subtitle': 'Manage system users and access permissions',
    'users.addUser': 'Add User',
    'users.totalUsers': 'Total Users',
    'users.admins': 'Admins',
    'users.technicians': 'Technicians',
    'users.activeUsers': 'Active Users',
    'users.searchPlaceholder': 'Search users...',
    'users.allRoles': 'All Roles',
    'users.user': 'User',
    'users.role': 'Role',
    'users.department': 'Department',
    'users.created': 'Created',
    'users.actions': 'Actions',
    'users.active': 'Active',
    'users.inactive': 'Inactive',
    'users.noUsersFound': 'No users found',
    
    // Reports
    'reports.title': 'Reports & Analytics',
    'reports.subtitle': 'Generate comprehensive reports and insights',
    'reports.equipmentStatus': 'Equipment Status Report',
    'reports.equipmentStatusDesc': 'Current status and location of all equipment',
    'reports.maintenanceSummary': 'Maintenance Summary',
    'reports.maintenanceSummaryDesc': 'Completed and upcoming maintenance activities',
    'reports.complianceReport': 'Compliance Report',
    'reports.complianceReportDesc': 'Maintenance compliance and overdue items',
    'reports.blockUtilization': 'Block Utilization',
    'reports.blockUtilizationDesc': 'Equipment distribution across blocks',
    'reports.generateReport': 'Generate Report',
    'reports.quickStats': 'Quick Statistics',
    'reports.exportPdf': 'Export PDF',
    'reports.backToReports': 'Back to Reports',
    
    // Settings
    'settings.title': 'System Settings',
    'settings.subtitle': 'Configure system preferences and policies',
    'settings.saveChanges': 'Save Changes',
    'settings.unsavedChanges': "You have unsaved changes. Don't forget to save your settings.",
    'settings.general': 'General Settings',
    'settings.generalDesc': 'Basic system configuration and preferences',
    'settings.notifications': 'Notifications',
    'settings.notificationsDesc': 'Configure alerts and notification preferences',
    'settings.security': 'Security',
    'settings.securityDesc': 'User access control and security policies',
    'settings.maintenanceRules': 'Maintenance Rules',
    'settings.maintenanceRulesDesc': 'Default maintenance intervals and scheduling rules',
    'settings.systemInfo': 'System Information',
    'settings.version': 'Version',
    'settings.lastUpdated': 'Last Updated',
    'settings.databaseStatus': 'Database Status',
    'settings.connected': 'Connected',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.refresh': 'Refresh'
  },
  ru: {
    // Header
    'header.search': 'Поиск оборудования...',
    'header.welcome': 'Добро пожаловать',
    'header.settings': 'Настройки',
    'header.signOut': 'Выйти',
    
    // Sidebar
    'nav.dashboard': 'Панель управления',
    'nav.equipment': 'Оборудование',
    'nav.maintenance': 'Обслуживание',
    'nav.consumables': 'Расходники',
    'nav.users': 'Пользователи',
    'nav.reports': 'Отчеты',
    'nav.settings': 'Настройки',
    'nav.help': 'Нужна помощь?',
    'nav.documentation': 'Ознакомьтесь с документацией для руководств и учебных материалов.',
    'nav.viewDocs': 'Просмотреть документацию →',
    
    // Dashboard
    'dashboard.title': 'Добро пожаловать!',
    'dashboard.subtitle': 'Обзор состояния оборудования и задач',
    'dashboard.todaysDate': 'Сегодняшняя дата',
    'dashboard.totalEquipment': 'Всего оборудования',
    'dashboard.inService': 'В работе',
    'dashboard.upcomingMaintenance': 'Предстоящее обслуживание',
    'dashboard.overdueItems': 'Просроченные задачи',
    'dashboard.completionRate': 'Процент выполнения',
    'dashboard.equipmentStatus': 'Обзор статуса оборудования',
    'dashboard.upcomingTasks': 'Предстоящие задачи',
    'dashboard.workOrders': 'Заявки на работу',
    'dashboard.consumablesDue': 'Расходники к замене',
    'dashboard.viewAllTasks': 'Просмотреть все задачи',
    'dashboard.recentActivity': 'Последняя активность',
    'dashboard.viewAllActivity': 'Просмотреть всю активность',
    'dashboard.equipmentByBlock': 'Оборудование по блокам',
    
    // Equipment
    'equipment.title': 'Управление оборудованием',
    'equipment.subtitle': 'Управляйте и отслеживайте инвентарь оборудования',
    'equipment.addEquipment': 'Добавить оборудование',
    'equipment.searchPlaceholder': 'Поиск оборудования...',
    'equipment.allBlocks': 'Все блоки',
    'equipment.allStatuses': 'Все статусы',
    'equipment.moreFilters': 'Больше фильтров',
    'equipment.noEquipmentFound': 'Оборудование не найдено',
    'equipment.adjustCriteria': 'Попробуйте изменить критерии поиска',
    'equipment.totalShown': 'Всего показано',
    'equipment.underMaintenance': 'На обслуживании',
    'equipment.outOfService': 'Не в работе',
    'equipment.viewDetails': 'Подробности',
    'equipment.logWork': 'Записать работу',
    'equipment.nextMaintenance': 'Следующее обслуживание',
    'equipment.overdue': 'Просрочено',
    'equipment.dueToday': 'Сегодня',
    'equipment.serial': 'Серийный:',
    'equipment.block': 'Блок:',
    
    // Maintenance
    'maintenance.title': 'Управление обслуживанием',
    'maintenance.subtitle': 'Отслеживайте заявки на работу и графики обслуживания',
    'maintenance.createWorkOrder': 'Создать заявку',
    'maintenance.workOrders': 'Заявки на работу',
    'maintenance.schedule': 'График обслуживания',
    'maintenance.dueDate': 'Срок выполнения',
    'maintenance.technician': 'Техник',
    'maintenance.type': 'Тип',
    'maintenance.nextDue': 'Следующий срок',
    'maintenance.frequency': 'Частота',
    'maintenance.assignedTo': 'Назначено',
    'maintenance.unassigned': 'Не назначено',
    'maintenance.daysOverdue': 'дней просрочки',
    'maintenance.dueIn': 'Через',
    'maintenance.days': 'дней',
    
    // Consumables
    'consumables.title': 'Управление расходниками',
    'consumables.subtitle': 'Отслеживайте и управляйте расходными материалами и заменами',
    'consumables.addConsumable': 'Добавить расходник',
    'consumables.totalConsumables': 'Всего расходников',
    'consumables.okStatus': 'В порядке',
    'consumables.dueSoon': 'Скоро к замене',
    'consumables.overdue': 'Просрочено',
    'consumables.searchPlaceholder': 'Поиск расходников...',
    'consumables.allStatuses': 'Все статусы',
    'consumables.consumable': 'Расходник',
    'consumables.equipment': 'Оборудование',
    'consumables.status': 'Статус',
    'consumables.installDate': 'Дата установки',
    'consumables.expiryDate': 'Дата истечения',
    'consumables.action': 'Действие',
    'consumables.replace': 'Заменить',
    'consumables.noConsumablesFound': 'Расходники не найдены',
    'consumables.daysRemaining': 'дней осталось',
    
    // Users
    'users.title': 'Управление пользователями',
    'users.subtitle': 'Управляйте пользователями системы и правами доступа',
    'users.addUser': 'Добавить пользователя',
    'users.totalUsers': 'Всего пользователей',
    'users.admins': 'Администраторы',
    'users.technicians': 'Техники',
    'users.activeUsers': 'Активные пользователи',
    'users.searchPlaceholder': 'Поиск пользователей...',
    'users.allRoles': 'Все роли',
    'users.user': 'Пользователь',
    'users.role': 'Роль',
    'users.department': 'Отдел',
    'users.created': 'Создан',
    'users.actions': 'Действия',
    'users.active': 'Активен',
    'users.inactive': 'Неактивен',
    'users.noUsersFound': 'Пользователи не найдены',
    
    // Reports
    'reports.title': 'Отчеты и аналитика',
    'reports.subtitle': 'Создавайте подробные отчеты и аналитику',
    'reports.equipmentStatus': 'Отчет по статусу оборудования',
    'reports.equipmentStatusDesc': 'Текущий статус и расположение всего оборудования',
    'reports.maintenanceSummary': 'Сводка по обслуживанию',
    'reports.maintenanceSummaryDesc': 'Завершенные и предстоящие работы по обслуживанию',
    'reports.complianceReport': 'Отчет о соответствии',
    'reports.complianceReportDesc': 'Соответствие обслуживания и просроченные элементы',
    'reports.blockUtilization': 'Использование блоков',
    'reports.blockUtilizationDesc': 'Распределение оборудования по блокам',
    'reports.generateReport': 'Создать отчет',
    'reports.quickStats': 'Быстрая статистика',
    'reports.exportPdf': 'Экспорт в PDF',
    'reports.backToReports': 'Назад к отчетам',
    
    // Settings
    'settings.title': 'Настройки системы',
    'settings.subtitle': 'Настройте предпочтения и политики системы',
    'settings.saveChanges': 'Сохранить изменения',
    'settings.unsavedChanges': 'У вас есть несохраненные изменения. Не забудьте сохранить настройки.',
    'settings.general': 'Общие настройки',
    'settings.generalDesc': 'Базовая конфигурация системы и предпочтения',
    'settings.notifications': 'Уведомления',
    'settings.notificationsDesc': 'Настройте оповещения и предпочтения уведомлений',
    'settings.security': 'Безопасность',
    'settings.securityDesc': 'Контроль доступа пользователей и политики безопасности',
    'settings.maintenanceRules': 'Правила обслуживания',
    'settings.maintenanceRulesDesc': 'Интервалы обслуживания по умолчанию и правила планирования',
    'settings.systemInfo': 'Информация о системе',
    'settings.version': 'Версия',
    'settings.lastUpdated': 'Последнее обновление',
    'settings.databaseStatus': 'Статус базы данных',
    'settings.connected': 'Подключено',
    'settings.language': 'Язык',
    'settings.selectLanguage': 'Выберите предпочитаемый язык',
    'settings.companyName': 'Название компании',
    'settings.timezone': 'Часовой пояс',
    'settings.dateFormat': 'Формат даты',
    'settings.currency': 'Валюта',
    'settings.maintenanceLeadTime': 'Время уведомления об обслуживании (дни)',
    'settings.consumableLeadTime': 'Время уведомления о расходниках (дни)',
    'settings.notificationChannels': 'Каналы уведомлений',
    'settings.emailNotifications': 'Email уведомления',
    'settings.emailNotificationsDesc': 'Отправлять оповещения по электронной почте',
    'settings.inAppNotifications': 'Уведомления в приложении',
    'settings.inAppNotificationsDesc': 'Показывать уведомления в приложении',
    'settings.language': 'Язык',
    'settings.selectLanguage': 'Выберите язык',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.edit': 'Редактировать',
    'common.delete': 'Удалить',
    'common.view': 'Просмотр',
    'common.add': 'Добавить',
    'common.search': 'Поиск',
    'common.filter': 'Фильтр',
    'common.export': 'Экспорт',
    'common.import': 'Импорт',
    'common.refresh': 'Обновить',
    
    // Status translations
    'status.in_service': 'В работе',
    'status.under_maintenance': 'На обслуживании',
    'status.out_of_service': 'Не в работе',
    'status.decommissioned': 'Списано',
    'status.ok': 'В порядке',
    'status.due_soon': 'Скоро к замене',
    'status.overdue': 'Просрочено',
    'status.replaced': 'Заменено',
    'status.open': 'Открыто',
    'status.in_progress': 'В процессе',
    'status.completed': 'Завершено',
    'status.cancelled': 'Отменено',
    
    // Roles
    'role.admin': 'Администратор',
    'role.ops_manager': 'Менеджер операций',
    'role.technician': 'Техник',
    'role.viewer': 'Наблюдатель'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};