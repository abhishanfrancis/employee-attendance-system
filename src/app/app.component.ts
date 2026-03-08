// src/app/app.component.ts
// Root Application Component - Navigation bar + sidebar layout
// Uses MatSidenav for sidebar navigation with HR mode toggle

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Attendance & Leave Management';
  sidenavOpened = true;
  isHR = false; // HR mode flag for route guard demo

  // Sidebar menu items with label, icon, and route
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Employees', icon: 'people', route: '/employees' },
    { label: 'Attendance', icon: 'event_available', route: '/attendance' },
    { label: 'Leave Request', icon: 'event_busy', route: '/leave-request' },
    { label: 'Leave Approval', icon: 'admin_panel_settings', route: '/leave-approval', hrOnly: true }
  ];

  ngOnInit(): void {
    // Initialize HR mode from localStorage
    this.isHR = localStorage.getItem('isHR') === 'true';
  }

  /**
   * Toggle sidebar open/close
   */
  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  /**
   * Toggle HR mode - controls access to HR-restricted routes
   * Stores preference in localStorage for the hrGuard to check
   * Note: [(ngModel)] already updates this.isHR, so we just persist to localStorage
   */
  toggleHRMode(): void {
    localStorage.setItem('isHR', String(this.isHR));
  }
}