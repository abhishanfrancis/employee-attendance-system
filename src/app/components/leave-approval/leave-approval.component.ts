// src/app/components/leave-approval/leave-approval.component.ts
// Leave Approval Component - HR admin panel for approving/rejecting leave requests
// Protected by hrGuard route guard (only accessible with HR privileges)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LeaveRequest } from '../../models/employee.model';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  displayedColumns: string[] = ['employeeName', 'leaveType', 'startDate', 'endDate', 'reason', 'status', 'actions'];

  constructor(
    private leaveService: LeaveService,
    private snackBar: MatSnackBar // MatSnackBar for notifications
  ) { }

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  /**
   * Load all leave requests from the service
   */
  loadLeaveRequests(): void {
    this.leaveService.getLeaveRequests().subscribe(
      data => this.leaveRequests = data
    );
  }

  /**
   * Approve a leave request - Updates status via PATCH
   */
  approveLeave(id: number): void {
    this.leaveService.approveLeave(id).subscribe(() => {
      this.snackBar.open('Leave request approved!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.loadLeaveRequests();
    });
  }

  /**
   * Reject a leave request - Updates status via PATCH
   */
  rejectLeave(id: number): void {
    this.leaveService.rejectLeave(id).subscribe(() => {
      this.snackBar.open('Leave request rejected.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.loadLeaveRequests();
    });
  }
}