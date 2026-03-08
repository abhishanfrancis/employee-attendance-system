// src/app/pipes/attendance-status-filter.pipe.ts
// Custom Pipe - Filters attendance records by status
// Usage: *ngFor="let record of records | attendanceStatusFilter:'Absent'"

import { Pipe, PipeTransform } from '@angular/core';
import { AttendanceRecord } from '../models/employee.model';

@Pipe({
  name: 'attendanceStatusFilter',
  standalone: true,
  pure: true
})
export class AttendanceStatusFilterPipe implements PipeTransform {

  /**
   * Filters attendance records by their status
   * @param records - Array of AttendanceRecord objects
   * @param status - The status to filter by ('Present', 'Absent', 'Half-Day', 'Late')
   * @returns Filtered array of records matching the status, or all if no filter
   *
   * Example:
   *   {{ records | attendanceStatusFilter:'Present' }}
   *   {{ records | attendanceStatusFilter:selectedStatus }}
   */
  transform(records: AttendanceRecord[], status: string): AttendanceRecord[] {
    if (!records || !status || status === 'All') {
      return records;
    }
    return records.filter(record =>
      record.status.toLowerCase() === status.toLowerCase()
    );
  }
}
