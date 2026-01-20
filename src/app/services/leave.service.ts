// src/app/services/leave.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LeaveRequest } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'John Doe',
      leaveType: 'Sick',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-02'),
      reason: 'Fever and cold',
      status: 'Pending',
      appliedDate: new Date()
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Jane Smith',
      leaveType: 'Vacation',
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-02-20'),
      reason: 'Family vacation',
      status: 'Approved',
      appliedDate: new Date('2024-01-15')
    },
    {
      id: 3,
      employeeId: 4,
      employeeName: 'Sarah Williams',
      leaveType: 'Casual',
      startDate: new Date('2024-02-05'),
      endDate: new Date('2024-02-05'),
      reason: 'Personal work',
      status: 'Pending',
      appliedDate: new Date()
    }
  ];

  constructor() { }

  getLeaveRequests(): Observable<LeaveRequest[]> {
    return of(this.leaveRequests);
  }

  getLeavesByEmployee(employeeId: number): Observable<LeaveRequest[]> {
    return of(this.leaveRequests.filter(leave => leave.employeeId === employeeId));
  }

  getPendingLeaves(): Observable<LeaveRequest[]> {
    return of(this.leaveRequests.filter(leave => leave.status === 'Pending'));
  }

  applyLeave(leave: LeaveRequest): Observable<LeaveRequest> {
    leave.id = Math.max(...this.leaveRequests.map(l => l.id), 0) + 1;
    leave.appliedDate = new Date();
    leave.status = 'Pending';
    this.leaveRequests.push(leave);
    return of(leave);
  }

  approveLeave(id: number): Observable<LeaveRequest | undefined> {
    const leave = this.leaveRequests.find(l => l.id === id);
    if (leave) {
      leave.status = 'Approved';
    }
    return of(leave);
  }

  rejectLeave(id: number): Observable<LeaveRequest | undefined> {
    const leave = this.leaveRequests.find(l => l.id === id);
    if (leave) {
      leave.status = 'Rejected';
    }
    return of(leave);
  }
}