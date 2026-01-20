// src/app/services/employee.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'IT',
      position: 'Software Developer',
      joinDate: new Date('2023-01-15')
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'HR',
      position: 'HR Manager',
      joinDate: new Date('2022-06-20')
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      department: 'IT',
      position: 'Backend Developer',
      joinDate: new Date('2023-03-10')
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@company.com',
      department: 'Marketing',
      position: 'Marketing Executive',
      joinDate: new Date('2023-05-01')
    }
  ];

  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return of(this.employees.find(emp => emp.id === id));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    employee.id = Math.max(...this.employees.map(e => e.id), 0) + 1;
    this.employees.push(employee);
    return of(employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
    }
    return of(employee);
  }

  deleteEmployee(id: number): Observable<boolean> {
    const index = this.employees.findIndex(e => e.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}