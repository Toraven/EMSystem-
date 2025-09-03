import { Block, Equipment, Consumable, MaintenanceSchedule, WorkOrder, User, DashboardMetrics, Notification } from '../types';

export const mockBlocks: Block[] = [
  {
    id: '1',
    name: 'Water Treatment',
    site: 'Main Facility',
    department: 'Operations',
    createdDate: '2024-01-15',
    equipmentCount: 12
  },
  {
    id: '2',
    name: 'Autoclaves',
    site: 'Main Facility',
    department: 'Sterilization',
    createdDate: '2024-01-15',
    equipmentCount: 8
  },
  {
    id: '3',
    name: 'Incubators',
    site: 'Lab Building A',
    department: 'Research',
    createdDate: '2024-01-15',
    equipmentCount: 15
  },
  {
    id: '4',
    name: 'HVAC Systems',
    site: 'Main Facility',
    department: 'Facilities',
    createdDate: '2024-01-15',
    equipmentCount: 6
  }
];

export const mockEquipment: Equipment[] = [
  {
    id: 'eq-001',
    blockId: '1',
    serialNumber: 'WT-RO-001',
    productName: 'Reverse Osmosis Unit',
    manufacturer: 'AquaTech Solutions',
    model: 'AT-RO-5000',
    manufactureDate: '2023-03-15',
    commissioningDate: '2023-06-01',
    status: 'in_service',
    location: 'Building A, Room 101',
    qrCode: 'QR-WT-RO-001',
    lastMaintenanceDate: '2024-11-15',
    nextDueDate: '2025-02-15',
    createdDate: '2023-06-01',
    modifiedDate: '2024-11-15'
  },
  {
    id: 'eq-002',
    blockId: '1',
    serialNumber: 'WT-UV-002',
    productName: 'UV Sterilizer',
    manufacturer: 'UltraViolet Systems',
    model: 'UV-MAX-200',
    manufactureDate: '2023-04-20',
    commissioningDate: '2023-07-10',
    status: 'under_maintenance',
    location: 'Building A, Room 102',
    qrCode: 'QR-WT-UV-002',
    lastMaintenanceDate: '2024-10-01',
    nextDueDate: '2025-01-01',
    createdDate: '2023-07-10',
    modifiedDate: '2024-12-20'
  },
  {
    id: 'eq-003',
    blockId: '2',
    serialNumber: 'AC-ST-001',
    productName: 'Steam Autoclave',
    manufacturer: 'Sterile Tech',
    model: 'ST-AUTO-300',
    manufactureDate: '2023-02-10',
    commissioningDate: '2023-05-15',
    status: 'in_service',
    location: 'Building B, Sterile Room',
    qrCode: 'QR-AC-ST-001',
    lastMaintenanceDate: '2024-12-01',
    nextDueDate: '2025-03-01',
    createdDate: '2023-05-15',
    modifiedDate: '2024-12-01'
  },
  {
    id: 'eq-004',
    blockId: '3',
    serialNumber: 'INC-CO2-001',
    productName: 'CO2 Incubator',
    manufacturer: 'BioLab Equipment',
    model: 'BL-INC-150',
    manufactureDate: '2023-01-05',
    commissioningDate: '2023-04-20',
    status: 'in_service',
    location: 'Lab A, Room 201',
    qrCode: 'QR-INC-CO2-001',
    lastMaintenanceDate: '2024-11-20',
    nextDueDate: '2025-01-20',
    createdDate: '2023-04-20',
    modifiedDate: '2024-11-20'
  }
];

export const mockConsumables: Consumable[] = [
  {
    id: 'cons-001',
    equipmentId: 'eq-001',
    type: 'RO Membrane',
    serialNumber: 'MEM-001-2024',
    lotNumber: 'LOT-24-001',
    installDate: '2024-06-01',
    expiryDate: '2025-06-01',
    recommendedIntervalDays: 365,
    status: 'due_soon',
    createdDate: '2024-06-01'
  },
  {
    id: 'cons-002',
    equipmentId: 'eq-002',
    type: 'UV Lamp',
    serialNumber: 'UV-LAMP-002',
    lotNumber: 'LOT-24-002',
    installDate: '2024-08-15',
    expiryDate: '2025-08-15',
    recommendedIntervalDays: 365,
    status: 'ok',
    createdDate: '2024-08-15'
  },
  {
    id: 'cons-003',
    equipmentId: 'eq-003',
    type: 'Door Gasket',
    serialNumber: 'GASKET-003',
    lotNumber: 'LOT-24-003',
    installDate: '2024-05-01',
    expiryDate: '2025-11-01',
    recommendedIntervalDays: 548,
    status: 'overdue',
    createdDate: '2024-05-01'
  }
];

export const mockMaintenanceSchedules: MaintenanceSchedule[] = [
  {
    id: 'ms-001',
    equipmentId: 'eq-001',
    maintenanceType: 'quarterly',
    frequency: 90,
    lastMaintenanceDate: '2024-11-15',
    nextDueDate: '2025-02-15',
    assignedTechnicianId: 'user-003'
  },
  {
    id: 'ms-002',
    equipmentId: 'eq-002',
    maintenanceType: 'periodic',
    frequency: 30,
    lastMaintenanceDate: '2024-12-01',
    nextDueDate: '2024-12-31',
    assignedTechnicianId: 'user-003'
  },
  {
    id: 'ms-003',
    equipmentId: 'eq-003',
    maintenanceType: 'annual',
    frequency: 365,
    lastMaintenanceDate: '2024-03-01',
    nextDueDate: '2025-03-01',
    assignedTechnicianId: 'user-004'
  }
];

export const mockWorkOrders: WorkOrder[] = [
  {
    id: 'wo-001',
    equipmentId: 'eq-001',
    type: 'PM',
    status: 'open',
    dueDate: '2025-02-15',
    openedAt: '2025-01-03T10:00:00Z',
    technicianId: 'user-003',
    description: 'Quarterly maintenance - replace filters and check pressure',
    priority: 'medium'
  },
  {
    id: 'wo-002',
    equipmentId: 'eq-002',
    type: 'CM',
    status: 'in_progress',
    dueDate: '2025-01-05',
    openedAt: '2025-01-02T14:30:00Z',
    technicianId: 'user-003',
    description: 'UV lamp replacement - intensity below threshold',
    priority: 'high'
  },
  {
    id: 'wo-003',
    equipmentId: 'eq-003',
    type: 'Replacement',
    status: 'completed',
    dueDate: '2024-12-20',
    openedAt: '2024-12-18T09:00:00Z',
    closedAt: '2024-12-20T16:45:00Z',
    technicianId: 'user-004',
    description: 'Door gasket replacement',
    priority: 'medium'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-001',
    username: 'admin',
    email: 'admin@company.com',
    firstName: 'John',
    lastName: 'Administrator',
    department: 'IT',
    role: 'admin',
    isActive: true,
    createdDate: '2024-01-01'
  },
  {
    id: 'user-002',
    username: 'manager1',
    email: 'manager@company.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    department: 'Operations',
    role: 'ops_manager',
    isActive: true,
    createdDate: '2024-01-01'
  },
  {
    id: 'user-003',
    username: 'tech1',
    email: 'tech1@company.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    department: 'Maintenance',
    role: 'technician',
    isActive: true,
    createdDate: '2024-01-01'
  },
  {
    id: 'user-004',
    username: 'tech2',
    email: 'tech2@company.com',
    firstName: 'Lisa',
    lastName: 'Chen',
    department: 'Maintenance',
    role: 'technician',
    isActive: true,
    createdDate: '2024-01-01'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalEquipment: 41,
  equipmentByStatus: {
    in_service: 32,
    under_maintenance: 5,
    out_of_service: 3,
    decommissioned: 1
  },
  upcomingMaintenance: 8,
  overdueMaintenance: 2,
  consumablesDueSoon: 5,
  consumablesOverdue: 1,
  completionRate: 94.2
};

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'maintenance_due',
    title: 'Maintenance Due Soon',
    message: 'RO Unit (WT-RO-001) maintenance due in 3 days',
    entityId: 'eq-001',
    entityType: 'equipment',
    createdAt: '2025-01-03T08:00:00Z',
    isRead: false,
    priority: 'medium'
  },
  {
    id: 'notif-002',
    type: 'consumable_expiring',
    title: 'Consumable Expiring',
    message: 'RO Membrane (MEM-001-2024) expires in 5 months',
    entityId: 'cons-001',
    entityType: 'consumable',
    createdAt: '2025-01-03T09:15:00Z',
    isRead: false,
    priority: 'low'
  },
  {
    id: 'notif-003',
    type: 'maintenance_overdue',
    title: 'Maintenance Overdue',
    message: 'Steam Autoclave (AC-ST-001) maintenance is 5 days overdue',
    entityId: 'eq-003',
    entityType: 'equipment',
    createdAt: '2025-01-02T16:30:00Z',
    isRead: true,
    priority: 'high'
  }
];