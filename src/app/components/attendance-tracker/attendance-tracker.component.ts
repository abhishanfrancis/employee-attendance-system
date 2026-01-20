// src/app/components/attendance-tracker/attendance-tracker.component.ts

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
import { Employee, AttendanceRecord } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { AttendanceService } from '../../services/attendance.service';

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
    MatTableModule
  ],
  templateUrl: './attendance-tracker.component.html',
  styleUrls: ['./attendance-tracker.component.css']
})
export class AttendanceTrackerComponent implements OnInit {
  attendanceForm: FormGroup;
  employees: Employee[] = [];
  attendanceRecords: AttendanceRecord[] = [];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'date', 'status', 'checkIn', 'checkOut'];

  statusOptions = ['Present', 'Absent', 'Half-Day', 'Late'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService
  ) {
    this.attendanceForm = this.fb.group({
      employeeId: ['', Validators.required],
      date: [new Date(), Validators.required],
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
    this.attendanceService.getAttendanceRecords().subscribe(
      data => this.attendanceRecords = data
    );
  }

  getEmployeeName(employeeId: number): string {
    const employee = this.employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unknown';
  }

  onSubmit(): void {
    if (this.attendanceForm.valid) {
      const attendance: AttendanceRecord = {
        id: 0,
        employeeId: this.attendanceForm.value.employeeId,
        date: this.attendanceForm.value.date,
        status: this.attendanceForm.value.status,
        checkIn: this.attendanceForm.value.checkIn,
        checkOut: this.attendanceForm.value.checkOut,
        notes: this.attendanceForm.value.notes
      };

      this.attendanceService.markAttendance(attendance).subscribe(
        result => {
          alert('Attendance marked successfully!');
          this.loadAttendance();
          this.attendanceForm.reset({
            date: new Date(),
            status: 'Present'
          });
        }
      );
    }
  }
}