// src/app/components/leave-approval/leave-approval.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { LeaveRequest } from '../../models/employee.model';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  displayedColumns: string[] = ['employeeName', 'leaveType', 'startDate', 'endDate', 'reason', 'status', 'actions'];

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.leaveService.getLeaveRequests().subscribe(
      data => this.leaveRequests = data
    );
  }

  approveLeave(id: number): void {
    this.leaveService.approveLeave(id).subscribe(
      result => {
        alert('Leave request approved!');
        this.loadLeaveRequests();
      }
    );
  }

  rejectLeave(id: number): void {
    this.leaveService.rejectLeave(id).subscribe(
      result => {
        alert('Leave request rejected!');
        this.loadLeaveRequests();
      }
    );
  }
}