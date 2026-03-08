// src/app/app.routes.ts
// Application Routing Configuration
// Defines all route paths, guards, and component mappings

import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AttendanceTrackerComponent } from './components/attendance-tracker/attendance-tracker.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { LeaveApprovalComponent } from './components/leave-approval/leave-approval.component';
import { hrGuard } from './guards/hr.guard';

export const routes: Routes = [
  // Default redirect to dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Dashboard - Attendance summary view
  { path: 'dashboard', component: DashboardComponent },

  // Employee list - Displays all employees with filter and add form
  { path: 'employees', component: EmployeeListComponent },

  // Employee detail - Route parameter :id for individual employee view
  // Example: /employees/1 shows details for employee with id=1
  { path: 'employees/:id', component: EmployeeDetailComponent },

  // Attendance tracker - Mark and view attendance records
  { path: 'attendance', component: AttendanceTrackerComponent },

  // Leave request - Employee leave application form (Reactive Form)
  { path: 'leave-request', component: LeaveRequestComponent },

  // Leave approval - HR restricted module
  // Protected by hrGuard: only accessible when localStorage 'isHR' === 'true'
  { path: 'leave-approval', component: LeaveApprovalComponent, canActivate: [hrGuard] },

  // Wildcard route - redirect unknown paths to dashboard
  { path: '**', redirectTo: '/dashboard' }
];