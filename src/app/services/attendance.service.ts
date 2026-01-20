// src/app/services/attendance.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AttendanceRecord } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendanceRecords: AttendanceRecord[] = [
    {
      id: 1,
      employeeId: 1,
      date: new Date(),
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM'
    },
    {
      id: 2,
      employeeId: 2,
      date: new Date(),
      status: 'Present',
      checkIn: '09:15 AM',
      checkOut: '06:15 PM'
    },
    {
      id: 3,
      employeeId: 3,
      date: new Date(),
      status: 'Absent'
    },
    {
      id: 4,
      employeeId: 4,
      date: new Date(),
      status: 'Present',
      checkIn: '08:45 AM',
      checkOut: '05:45 PM'
    }
  ];

  constructor() { }

  getAttendanceRecords(): Observable<AttendanceRecord[]> {
    return of(this.attendanceRecords);
  }

  getAttendanceByEmployee(employeeId: number): Observable<AttendanceRecord[]> {
    return of(this.attendanceRecords.filter(record => record.employeeId === employeeId));
  }

  getAttendanceByDate(date: Date): Observable<AttendanceRecord[]> {
    return of(this.attendanceRecords.filter(record =>
      record.date.toDateString() === date.toDateString()
    ));
  }

  markAttendance(attendance: AttendanceRecord): Observable<AttendanceRecord> {
    attendance.id = Math.max(...this.attendanceRecords.map(a => a.id), 0) + 1;
    this.attendanceRecords.push(attendance);
    return of(attendance);
  }

  updateAttendance(attendance: AttendanceRecord): Observable<AttendanceRecord> {
    const index = this.attendanceRecords.findIndex(a => a.id === attendance.id);
    if (index !== -1) {
      this.attendanceRecords[index] = attendance;
    }
    return of(attendance);
  }
}