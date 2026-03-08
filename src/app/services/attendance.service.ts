// src/app/services/attendance.service.ts
// AttendanceService - Manages attendance records via HTTP and JSON Server
// Uses RxJS Observables for async data operations

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttendanceRecord } from '../models/employee.model';

@Injectable({
  providedIn: 'root' // Singleton service via Angular DI
})
export class AttendanceService {
  // JSON Server API endpoint for attendance
  private apiUrl = 'http://localhost:3000/attendance';

  constructor(private http: HttpClient) { }

  /**
   * GET all attendance records
   * Returns Observable<AttendanceRecord[]> for async subscription
   */
  getAttendanceRecords(): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(this.apiUrl);
  }

  /**
   * GET attendance records filtered by employee ID
   * Uses JSON Server query parameter filtering
   */
  getAttendanceByEmployee(employeeId: number): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}?employeeId=${employeeId}`);
  }

  /**
   * GET attendance records filtered by date
   * Expects ISO date string (YYYY-MM-DD)
   */
  getAttendanceByDate(date: string): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}?date=${date}`);
  }

  /**
   * POST - Mark attendance for an employee
   * Creates a new attendance record
   */
  markAttendance(attendance: Omit<AttendanceRecord, 'id'>): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(this.apiUrl, attendance);
  }

  /**
   * PUT - Update an existing attendance record
   */
  updateAttendance(attendance: AttendanceRecord): Observable<AttendanceRecord> {
    return this.http.put<AttendanceRecord>(`${this.apiUrl}/${attendance.id}`, attendance);
  }

  /**
   * DELETE - Remove an attendance record
   */
  deleteAttendance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}