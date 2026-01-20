// src/app/models/employee.model.ts

export interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    position: string;
    joinDate: Date;
}

export interface AttendanceRecord {
    id: number;
    employeeId: number;
    date: Date;
    status: 'Present' | 'Absent' | 'Half-Day' | 'Late';
    checkIn?: string;
    checkOut?: string;
    notes?: string;
}

export interface LeaveRequest {
    id: number;
    employeeId: number;
    employeeName: string;
    leaveType: 'Sick' | 'Casual' | 'Vacation' | 'Personal';
    startDate: Date;
    endDate: Date;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    appliedDate: Date;
}

export interface DashboardStats {
    totalEmployees: number;
    presentToday: number;
    absentToday: number;
    pendingLeaveRequests: number;
    approvedLeaves: number;
}