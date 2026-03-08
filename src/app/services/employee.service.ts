// src/app/services/employee.service.ts
// EmployeeService - Manages all employee CRUD operations via HTTP
// Uses Angular Dependency Injection (providedIn: 'root' = singleton)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root' // Singleton service available application-wide via DI
})
export class EmployeeService {
  // Base URL for JSON Server API
  private apiUrl = 'http://localhost:3000/employees';

  // BehaviorSubject to share employee data across components reactively
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * GET all employees from the API
   * Updates the shared BehaviorSubject so subscribers get the latest data
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      tap(employees => this.employeesSubject.next(employees))
    );
  }

  /**
   * GET a single employee by ID
   * Used in employee detail view (/employees/:id)
   */
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  /**
   * POST a new employee
   * JSON Server auto-generates the id
   */
  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  /**
   * PUT - Update an existing employee
   */
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  /**
   * DELETE an employee by ID
   */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}