// src/app/pipes/employee-filter.pipe.ts
// Custom Pipe - Filters employees by department name
// Usage: *ngFor="let emp of employees | employeeFilter:'IT'"

import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'employeeFilter',
  standalone: true, // Standalone pipe (Angular 18 pattern)
  pure: true        // Pure pipe - only recalculates when input reference changes
})
export class EmployeeFilterPipe implements PipeTransform {

  /**
   * Filters an array of employees by department name
   * @param employees - The array of Employee objects to filter
   * @param department - The department name to filter by (case-insensitive)
   * @returns Filtered array of employees matching the department, or all if no filter
   *
   * Example:
   *   {{ employees | employeeFilter:'IT' }}
   *   {{ employees | employeeFilter:selectedDepartment }}
   */
  transform(employees: Employee[], department: string): Employee[] {
    if (!employees || !department || department === 'All') {
      return employees; // Return all employees if no filter applied
    }
    // Case-insensitive department matching
    return employees.filter(emp =>
      emp.department.toLowerCase() === department.toLowerCase()
    );
  }
}
