export interface Block {
  id: string;
  name: string;
  site: string;
  department: string;
  createdDate: string;
  equipmentCount: number;
}

export interface Equipment {
  id: string;
  blockId: string;
  serialNumber: string;
  productName: string;
  manufacturer: string;
  model: string;
  manufactureDate: string;
  commissioningDate: string;
  status: EquipmentStatus;
  location: string;
  qrCode?: string;
  lastMaintenanceDate?: string;
  nextDueDate?: string;
  createdDate: string;
  modifiedDate: string;
}

export type EquipmentStatus = 
  | 'in_service' 
  | 'under_maintenance' 
  | 'out_of_service' 
  | 'decommissioned';

export interface Consumable {
  id: string;
  equipmentId: string;
  type: string;
  serialNumber: string;
  lotNumber: string;
  installDate: string;
  expiryDate: string;
  recommendedIntervalDays: number;
  status: ConsumableStatus;
  createdDate: string;
}

export type ConsumableStatus = 'ok' | 'due_soon' | 'overdue' | 'replaced';

export interface MaintenanceSchedule {
  id: string;
  equipmentId: string;
  maintenanceType: MaintenanceType;
  frequency: number;
  lastMaintenanceDate?: string;
  nextDueDate: string;
  assignedTechnicianId?: string;
}

export type MaintenanceType = 'periodic' | 'quarterly' | 'annual' | 'overhaul';

export interface WorkOrder {
  id: string;
  equipmentId: string;
  type: 'PM' | 'CM' | 'Replacement';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  dueDate: string;
  openedAt: string;
  closedAt?: string;
  technicianId?: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  role: UserRole;
  isActive: boolean;
  createdDate: string;
}

export type UserRole = 'admin' | 'ops_manager' | 'technician' | 'viewer';

export interface DashboardMetrics {
  totalEquipment: number;
  equipmentByStatus: Record<EquipmentStatus, number>;
  upcomingMaintenance: number;
  overdueMaintenance: number;
  consumablesDueSoon: number;
  consumablesOverdue: number;
  completionRate: number;
}

export interface Notification {
  id: string;
  type: 'maintenance_due' | 'maintenance_overdue' | 'consumable_expiring' | 'consumable_expired';
  title: string;
  message: string;
  entityId: string;
  entityType: 'equipment' | 'consumable';
  createdAt: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}