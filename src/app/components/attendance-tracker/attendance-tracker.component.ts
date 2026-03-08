// src/app/components/attendance-tracker/attendance-tracker.component.ts
// Attendance Tracker - Reactive form for marking attendance with Material UI
// Includes custom directive (HighlightAbsent) and status filter pipe

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Employee, AttendanceRecord } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { AttendanceService } from '../../services/attendance.service';
import { HighlightAbsentDirective } from '../../directives/highlight-absent.directive';
import { AttendanceStatusFilterPipe } from '../../pipes/attendance-status-filter.pipe';

@Component({
  selector: 'app-attendance-tracker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    HighlightAbsentDirective,      // Custom directive for highlighting absent rows
    AttendanceStatusFilterPipe     // Custom pipe for filtering by attendance status
  ],
  templateUrl: './attendance-tracker.component.html',
  styleUrls: ['./attendance-tracker.component.css']
})
export class AttendanceTrackerComponent implements OnInit {
  // Reactive form for marking attendance
  attendanceForm: FormGroup;
  employees: Employee[] = [];
  attendanceRecords: AttendanceRecord[] = [];
  filteredRecords: AttendanceRecord[] = [];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'date', 'status', 'checkIn', 'checkOut'];

  statusOptions = ['Present', 'Absent', 'Half-Day', 'Late'];
  filterStatuses = ['All', 'Present', 'Absent', 'Half-Day', 'Late'];
  selectedStatusFilter = 'All';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private snackBar: MatSnackBar // MatSnackBar for success/error notifications
  ) {
    // Initialize reactive form with validators
    this.attendanceForm = this.fb.group({
      employeeId: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      status: ['Present', Validators.required],
      checkIn: [''],
      checkOut: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadAttendance();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      data => this.employees = data
    );
  }

  loadAttendance(): void {
    this.attendanceService.getAttendanceRecords().subscribe(data => {
      this.attendanceRecords = data;
      this.applyStatusFilter();
    });
  }

  /**
   * Filter attendance records by status
   */
  applyStatusFilter(): void {
    if (!this.selectedStatusFilter || this.selectedStatusFilter === 'All') {
      this.filteredRecords = [...this.attendanceRecords];
    } else {
      this.filteredRecords = this.attendanceRecords.filter(
        r => r.status.toLowerCase() === this.selectedStatusFilter.toLowerCase()
      );
    }
  }

  /**
   * Get employee name by ID for display in the table
   */
  getEmployeeName(employeeId: number): string {
    const employee = this.employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unknown';
  }

  /**
   * Submit attendance record via reactive form
   */
  onSubmit(): void {
    if (this.attendanceForm.valid) {
      const formValue = this.attendanceForm.value;
      const attendance = {
        employeeId: formValue.employeeId,
        date: formValue.date,
        status: formValue.status,
        checkIn: formValue.checkIn,
        checkOut: formValue.checkOut,
        notes: formValue.notes
      };

      this.attendanceService.markAttendance(attendance).subscribe(() => {
        // MatSnackBar notification
        this.snackBar.open('Attendance marked successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.loadAttendance();
        this.attendanceForm.patchValue({
          date: new Date().toISOString().split('T')[0],
          status: 'Present',
          employeeId: '',
          checkIn: '',
          checkOut: '',
          notes: ''
        });
      });
    }
  }
}