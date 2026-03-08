// src/app/models/employee.model.ts
// Employee model - Core employee data structure used across the application

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string; // ISO date string for JSON Server compatibility
}

// Re-export other models for backward compatibility
export type { AttendanceRecord } from './attendance.model';
export type { LeaveRequest } from './leave.model';

/**
 * DashboardStats - Aggregated statistics displayed on the dashboard
 */
export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  pendingLeaveRequests: number;
  approvedLeaves: number;
}