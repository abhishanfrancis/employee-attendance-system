// src/app/components/employee-detail/employee-detail.component.ts
// Employee Detail Component - Displays individual employee information
// Accessed via route parameter: /employees/:id

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { Employee, AttendanceRecord, LeaveRequest } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { AttendanceService } from '../../services/attendance.service';
import { LeaveService } from '../../services/leave.service';
import { HighlightAbsentDirective } from '../../directives/highlight-absent.directive';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    HighlightAbsentDirective // Custom directive for highlighting absent records
  ],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  attendanceRecords: AttendanceRecord[] = [];
  leaveRequests: LeaveRequest[] = [];

  attendanceColumns: string[] = ['date', 'status', 'checkIn', 'checkOut'];
  leaveColumns: string[] = ['leaveType', 'startDate', 'endDate', 'reason', 'status'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void {
    // Extract the :id route parameter and load employee data
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadEmployeeData(id);
    }
  }

  /**
   * Load employee details, attendance records, and leave requests
   */
  loadEmployeeData(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(emp => {
      this.employee = emp;
    });

    this.attendanceService.getAttendanceByEmployee(id).subscribe(records => {
      this.attendanceRecords = records;
    });

    this.leaveService.getLeavesByEmployee(id).subscribe(leaves => {
      this.leaveRequests = leaves;
    });
  }

  /**
   * Navigate back to employee list
   */
  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
