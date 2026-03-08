// src/app/components/employee-list/employee-list.component.ts
// Employee List Component - Displays employee table with department filtering
// Includes a Template-Driven Form for adding new employees

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Template-driven forms
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeFilterPipe } from '../../pipes/employee-filter.pipe';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,           // Required for template-driven forms (ngModel)
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    EmployeeFilterPipe     // Custom pipe for department filtering
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'position', 'joinDate', 'actions'];

  // Department filter options
  departments: string[] = ['All', 'IT', 'HR', 'Marketing', 'Finance', 'Operations'];
  selectedDepartment: string = 'All';

  // Template-driven form model for adding new employees
  showAddForm = false;
  newEmployee = {
    name: '',
    email: '',
    department: '',
    position: '',
    joinDate: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar // Material snackbar for notifications
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  /**
   * Load all employees from the service
   */
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.applyFilter();
    });
  }

  /**
   * Apply department filter using the custom EmployeeFilterPipe logic
   */
  applyFilter(): void {
    if (!this.selectedDepartment || this.selectedDepartment === 'All') {
      this.filteredEmployees = [...this.employees];
    } else {
      this.filteredEmployees = this.employees.filter(
        emp => emp.department.toLowerCase() === this.selectedDepartment.toLowerCase()
      );
    }
  }

  /**
   * Toggle the add employee form visibility
   */
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  /**
   * Submit new employee via template-driven form
   * Uses ngModel bindings on the newEmployee object
   */
  onAddEmployee(): void {
    const employee: Omit<Employee, 'id'> = {
      name: this.newEmployee.name,
      email: this.newEmployee.email,
      department: this.newEmployee.department,
      position: this.newEmployee.position,
      joinDate: this.newEmployee.joinDate
    };

    this.employeeService.addEmployee(employee).subscribe(() => {
      // MatSnackBar notification for success feedback
      this.snackBar.open('Employee added successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.resetForm();
      this.loadEmployees();
    });
  }

  /**
   * Delete an employee by ID
   */
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.snackBar.open('Employee deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.loadEmployees();
      });
    }
  }

  /**
   * Reset the template-driven form
   */
  private resetForm(): void {
    this.newEmployee = { name: '', email: '', department: '', position: '', joinDate: '' };
    this.showAddForm = false;
  }
}