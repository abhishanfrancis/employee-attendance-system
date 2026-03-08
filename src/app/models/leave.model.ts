// src/app/models/leave.model.ts
// Leave model - Defines the structure for leave requests

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  leaveType: 'Sick' | 'Casual' | 'Vacation' | 'Personal'; // Type of leave
  startDate: string;                                         // ISO date string for JSON Server
  endDate: string;                                           // ISO date string for JSON Server
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';              // Leave approval status
  appliedDate: string;                                       // ISO date string for JSON Server
}
