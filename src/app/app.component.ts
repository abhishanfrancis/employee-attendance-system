// src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Attendance & Leave Management';
  sidenavOpened = true;

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Employees', icon: 'people', route: '/employees' },
    { label: 'Attendance', icon: 'event_available', route: '/attendance' },
    { label: 'Leave Request', icon: 'event_busy', route: '/leave-request' },
    { label: 'Leave Approval', icon: 'approval', route: '/leave-approval' }
  ];

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}