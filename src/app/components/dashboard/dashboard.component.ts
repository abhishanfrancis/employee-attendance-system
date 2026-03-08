// src/app/components/dashboard/dashboard.component.ts
// Dashboard Component - Shows aggregated attendance/leave statistics
// Combines data from multiple services using RxJS forkJoin

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardStats } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { AttendanceService } from '../../services/attendance.service';
import { LeaveService } from '../../services/leave.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    pendingLeaveRequests: 0,
    approvedLeaves: 0
  };

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  /**
   * Load dashboard statistics using RxJS forkJoin
   * Combines multiple HTTP observables into a single subscription
   */
  loadDashboardStats(): void {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    forkJoin({
      employees: this.employeeService.getEmployees(),
      attendance: this.attendanceService.getAttendanceByDate(today),
      leaves: this.leaveService.getLeaveRequests()
    }).subscribe(result => {
      this.stats.totalEmployees = result.employees.length;
      this.stats.presentToday = result.attendance.filter(a => a.status === 'Present').length;
      this.stats.absentToday = result.attendance.filter(a => a.status === 'Absent').length;
      this.stats.pendingLeaveRequests = result.leaves.filter(l => l.status === 'Pending').length;
      this.stats.approvedLeaves = result.leaves.filter(l => l.status === 'Approved').length;
    });
  }
}