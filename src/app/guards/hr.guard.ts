// src/app/guards/hr.guard.ts
// Route Guard - Restricts access to HR-only modules (e.g., leave-approval)
// Uses Angular's CanActivateFn functional guard pattern (Angular 18+)

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * HR Route Guard
 * Checks if the current user has HR role before allowing access.
 * In a real application, this would check an AuthService for user roles.
 * For demo purposes, we check localStorage for an 'isHR' flag.
 *
 * Usage in routes:
 *   { path: 'leave-approval', component: LeaveApprovalComponent, canActivate: [hrGuard] }
 */
export const hrGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  // Check if user has HR role (stored in localStorage for demo)
  const isHR = localStorage.getItem('isHR') === 'true';

  if (isHR) {
    return true; // Allow access to HR modules
  }

  // Deny access and show notification
  snackBar.open('Access Denied: HR privileges required. Toggle HR mode in the sidebar.', 'Close', {
    duration: 4000,
    panelClass: ['error-snackbar']
  });

  // Redirect to dashboard
  router.navigate(['/dashboard']);
  return false;
};
