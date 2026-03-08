// src/app/services/leave.service.ts
// LeaveService - Manages leave request CRUD operations via HTTP
// Provides methods for applying, approving, and rejecting leave requests

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../models/employee.model';

@Injectable({
  providedIn: 'root' // Available application-wide via Angular DI
})
export class LeaveService {
  // JSON Server API endpoint for leaves
  private apiUrl = 'http://localhost:3000/leaves';

  constructor(private http: HttpClient) { }

  /**
   * GET all leave requests
   */
  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl);
  }

  /**
   * GET leave requests filtered by employee ID
   */
  getLeavesByEmployee(employeeId: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}?employeeId=${employeeId}`);
  }

  /**
   * GET only pending leave requests (for HR approval view)
   */
  getPendingLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}?status=Pending`);
  }

  /**
   * POST - Submit a new leave application
   * Sets status to 'Pending' and records the applied date
   */
  applyLeave(leave: Omit<LeaveRequest, 'id'>): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.apiUrl, {
      ...leave,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0]
    });
  }

  /**
   * PATCH - Approve a leave request by ID
   * Only updates the status field
   */
  approveLeave(id: number): Observable<LeaveRequest> {
    return this.http.patch<LeaveRequest>(`${this.apiUrl}/${id}`, { status: 'Approved' });
  }

  /**
   * PATCH - Reject a leave request by ID
   * Only updates the status field
   */
  rejectLeave(id: number): Observable<LeaveRequest> {
    return this.http.patch<LeaveRequest>(`${this.apiUrl}/${id}`, { status: 'Rejected' });
  }

  /**
   * DELETE - Remove a leave request
   */
  deleteLeave(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}