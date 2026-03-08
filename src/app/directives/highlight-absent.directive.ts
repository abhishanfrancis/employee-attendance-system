// src/app/directives/highlight-absent.directive.ts
// Custom Directive - Highlights absent employees with a red background
// Usage: <tr [appHighlightAbsent]="record.status">

import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightAbsent]',
  standalone: true // Standalone directive (Angular 18 pattern)
})
export class HighlightAbsentDirective implements OnChanges {

  /**
   * Input binding for attendance status
   * When the status is 'Absent', applies a red background highlight
   * When the status is 'Late', applies an amber warning highlight
   *
   * Example usage in template:
   *   <tr [appHighlightAbsent]="record.status">...</tr>
   *   <div [appHighlightAbsent]="employee.todayStatus">...</div>
   */
  @Input('appHighlightAbsent') status: string = '';

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']) {
      this.applyHighlight();
    }
  }

  /**
   * Applies background color based on attendance status
   * - Absent: Red background (#ffebee) with red left border
   * - Late: Amber background (#fff8e1) with amber left border
   * - Other statuses: No highlight (transparent)
   */
  private applyHighlight(): void {
    const element = this.el.nativeElement;

    // Reset styles
    element.style.backgroundColor = '';
    element.style.borderLeft = '';

    switch (this.status?.toLowerCase()) {
      case 'absent':
        element.style.backgroundColor = '#ffebee'; // Light red
        element.style.borderLeft = '4px solid #f44336'; // Red accent
        break;
      case 'late':
        element.style.backgroundColor = '#fff8e1'; // Light amber
        element.style.borderLeft = '4px solid #ffc107'; // Amber accent
        break;
      default:
        element.style.backgroundColor = 'transparent';
        element.style.borderLeft = 'none';
        break;
    }
  }
}
