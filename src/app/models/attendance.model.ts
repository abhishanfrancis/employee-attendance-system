// src/app/models/attendance.model.ts
// Attendance model - Defines the structure for attendance records

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: string;                                        // ISO date string for JSON Server compatibility
  status: 'Present' | 'Absent' | 'Half-Day' | 'Late'; // Attendance status enum
  checkIn?: string;                                    // Optional check-in time
  checkOut?: string;                                   // Optional check-out time
  notes?: string;                                      // Optional notes
}
