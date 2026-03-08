# Employee Attendance & Leave Management System

A modern, responsive web application built with **Angular 18** and **TypeScript** for managing employee attendance and leave requests. Features a polished Material UI, role-based HR access, JSON Server mock API, reactive & template-driven forms, custom pipes, directives, and route guards.

## Features

- **Dashboard** — Aggregated statistics (employees, present/absent today, pending/approved leaves) with quick-action cards
- **Employee Management** — Full CRUD, department filtering via custom pipe, template-driven registration form
- **Employee Detail** — Individual profile view with attendance & leave history (route param `:id`)
- **Attendance Tracking** — Reactive form to mark daily attendance; status filter, highlight-absent directive on table rows
- **Leave Requests** — Reactive form with cross-field date-range validation and minLength checks
- **Leave Approval (HR)** — Protected by `hrGuard` route guard; approve/reject via PATCH requests
- **HR Mode Toggle** — Slide toggle in toolbar stores preference in `localStorage`; guard reads it at navigation time

## Technologies Used

| Layer | Technology |
|---|---|
| Framework | Angular 18.2 (Standalone Components) |
| Language | TypeScript 5.5 |
| UI Library | Angular Material 18 |
| HTTP / API | `HttpClient` → JSON Server (mock REST on port 3000) |
| Forms | Reactive Forms + Template-driven Forms |
| State | RxJS Observables, BehaviorSubject, forkJoin |
| Routing | Angular Router with functional `CanActivateFn` guard |
| Custom Pipes | `EmployeeFilterPipe`, `AttendanceStatusFilterPipe` |
| Custom Directive | `HighlightAbsentDirective` (attribute directive) |

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/abhishanfrancis/employee-attendance-system.git
cd employee-attendance-system
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the JSON Server** (mock REST API on port 3000):
```bash
npm run start:api
```

4. **Start the Angular dev server** (in a separate terminal):
```bash
ng serve
```

5. **Open the app:**
```
http://localhost:4200
```

> **Note:** Both the JSON Server (port 3000) and Angular dev server (port 4200) must be running simultaneously.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/              # Stats overview + quick actions
│   │   ├── employee-list/          # CRUD table + template-driven add form
│   │   ├── employee-detail/        # Profile view (route param :id)
│   │   ├── attendance-tracker/     # Reactive form + records table
│   │   ├── leave-request/          # Reactive form with cross-field validation
│   │   └── leave-approval/         # HR-only approval panel
│   ├── models/
│   │   ├── employee.model.ts       # Employee, DashboardStats interfaces
│   │   ├── attendance.model.ts     # AttendanceRecord interface
│   │   └── leave.model.ts          # LeaveRequest interface
│   ├── services/
│   │   ├── employee.service.ts     # HttpClient CRUD for /employees
│   │   ├── attendance.service.ts   # HttpClient CRUD for /attendance
│   │   └── leave.service.ts        # HttpClient CRUD + PATCH for /leaves
│   ├── guards/
│   │   └── hr.guard.ts             # CanActivateFn – checks localStorage isHR
│   ├── pipes/
│   │   ├── employee-filter.pipe.ts           # Filter employees by department
│   │   └── attendance-status-filter.pipe.ts  # Filter attendance by status
│   ├── directives/
│   │   └── highlight-absent.directive.ts     # Highlight absent/late rows
│   ├── app.component.*             # Root shell (toolbar + sidenav + router-outlet)
│   ├── app.config.ts               # provideRouter, provideHttpClient, provideAnimations
│   └── app.routes.ts               # Route definitions with hrGuard
├── styles.css                      # Global theme, Material overrides
└── index.html
db.json                             # JSON Server mock database
```

## Features in Detail

### Dashboard
- Aggregated stats via `forkJoin` (employees, attendance, leaves)
- Gradient stat cards with icons
- Quick-action cards linking to each module

### Employee List
- **Template-driven form** (FormsModule + ngModel) for adding employees
- Department filter dropdown using custom `EmployeeFilterPipe`
- MatTable with view-detail and delete actions
- Built-in `DatePipe` and `UpperCasePipe` in template

### Employee Detail (`/employees/:id`)
- Reads route parameter via `ActivatedRoute`
- Displays attendance history with `HighlightAbsentDirective`
- Displays leave history with status badges

### Attendance Tracker
- **Reactive form** (FormBuilder + Validators) for marking attendance
- Status filter with custom `AttendanceStatusFilterPipe`
- `[appHighlightAbsent]` directive colors absent/late rows

### Leave Request
- Reactive form with `Validators.required`, `Validators.minLength(10)`
- **Custom cross-field validator** `dateRangeValidator` (end ≥ start)
- Employee selection via MatSelect

### Leave Approval (HR Module)
- Protected by `hrGuard` functional route guard
- Toggle HR mode via `MatSlideToggle` in the toolbar
- Approve / Reject buttons send PATCH to update leave status
- `MatSnackBar` success/error notifications

### Route Guard
- `hrGuard` (CanActivateFn) checks `localStorage.getItem('isHR') === 'true'`
- Denied users see a snackbar message and are redirected to `/dashboard`

## API Endpoints (JSON Server)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | List all employees |
| GET | `/employees/:id` | Get employee by ID |
| POST | `/employees` | Add new employee |
| DELETE | `/employees/:id` | Delete employee |
| GET | `/attendance` | List all attendance records |
| GET | `/attendance?employeeId=:id` | Attendance by employee |
| GET | `/attendance?date=:date` | Attendance by date |
| POST | `/attendance` | Mark attendance |
| GET | `/leaves` | List all leave requests |
| GET | `/leaves?employeeId=:id` | Leaves by employee |
| GET | `/leaves?status=Pending` | Pending leaves |
| POST | `/leaves` | Apply for leave |
| PATCH | `/leaves/:id` | Update leave status |

## Scripts

| Command | Description |
|---|---|
| `ng serve` | Start Angular dev server on port 4200 |
| `npm run start:api` | Start JSON Server on port 3000 |
| `ng build` | Production build to `dist/` |
| `ng test` | Run unit tests via Karma |

## Future Enhancements

- [ ] Connect to a real backend API
- [ ] JWT authentication and authorization
- [ ] Role-based access control (Admin / Manager / Employee)
- [ ] Reports and analytics with charts
- [ ] Export data to Excel / PDF
- [ ] Email notifications for leave status changes
- [ ] Calendar view for attendance
- [ ] Employee profile photo upload
- [ ] Multi-language (i18n) support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
