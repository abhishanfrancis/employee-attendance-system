// src/app/components/leave-request/leave-request.component.ts
// Leave Request Component - Reactive Form with advanced validation
// Demonstrates FormBuilder, FormGroup, Validators, and custom validation

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Required for reactive forms (FormGroup, formControlName)
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  // Reactive form with validators
  leaveForm: FormGroup;
  employees: Employee[] = [];
  leaveTypes = ['Sick', 'Casual', 'Vacation', 'Personal'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private leaveService: LeaveService,
    private snackBar: MatSnackBar
  ) {
    // Initialize reactive form with validation rules
    this.leaveForm = this.fb.group({
      employeeId: ['', Validators.required],
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]] // Min 10 chars for reason
    }, {
      validators: this.dateRangeValidator // Custom cross-field validator
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      data => this.employees = data
    );
  }

  /**
   * Custom Validator: Ensures end date is after start date
   * Cross-field validation applied at form group level
   */
  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { dateRange: true }; // Validation error
    }
    return null; // Valid
  }

  /**
   * Submit leave request via reactive form
   * Builds LeaveRequest object from form values and sends to service
   */
  onSubmit(): void {
    if (this.leaveForm.valid) {
      const formValue = this.leaveForm.value;
      const employee = this.employees.find(e => e.id === formValue.employeeId);

      const leaveRequest = {
        employeeId: formValue.employeeId,
        employeeName: employee ? employee.name : '',
        leaveType: formValue.leaveType,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        reason: formValue.reason,
        status: 'Pending' as const,
        appliedDate: new Date().toISOString().split('T')[0]
      };

      this.leaveService.applyLeave(leaveRequest).subscribe(() => {
        // MatSnackBar success notification
        this.snackBar.open('Leave request submitted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.leaveForm.reset();
      });
    }
  }
}