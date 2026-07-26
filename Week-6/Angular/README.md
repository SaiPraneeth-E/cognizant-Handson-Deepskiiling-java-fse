# Week-6 Angular Hands-On - Student Course Portal

## Project Overview

This project is my Angular Hands-On submission for Digital Nurture 5.0, Week 6. I built a **Student Course Portal** that demonstrates all the core Angular concepts I learned during the training week. The app lets students browse courses, enroll/unenroll, view their profile, and fill out enrollment forms — both template-driven and reactive.

## Tech Stack

- **Angular** v21.2.7 (standalone components, no NgModules)
- **Angular CLI** for project scaffolding and building
- **TypeScript**
- **RxJS** for observables
- **Node.js** v22.23.1 / **npm** v11.6.2

## Project Structure

```
student-course-portal/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/            # Navigation bar (routerLink, auth user)
│   │   │   ├── course-card/       # Reusable course card (Input/Output, custom pipe & directive)
│   │   │   ├── course-summary-widget/  # Stats widget using services
│   │   │   └── notification/      # Component-level DI scoping demo
│   │   ├── pages/
│   │   │   ├── home/              # Landing page (ngOnInit, ngOnDestroy, ngModel search)
│   │   │   ├── course-list/       # Course list (ngFor + trackBy, loading spinner)
│   │   │   ├── course-detail/     # Route-parameterized detail (ActivatedRoute)
│   │   │   ├── student-profile/   # Enrolled courses & stats (canActivate guard)
│   │   │   ├── enrollment-form/   # Template-driven form (validators, reset)
│   │   │   ├── reactive-enrollment-form/  # Reactive form (FormBuilder, FormArray, async validator)
│   │   │   └── not-found/         # 404 wildcard route
│   │   ├── services/
│   │   │   ├── course.ts          # Root singleton service with HttpClient
│   │   │   ├── enrollment.ts      # Service-to-service DI
│   │   │   ├── auth.ts            # Authentication state
│   │   │   └── notification.ts    # Component-level scoping (no providedIn)
│   │   ├── directives/
│   │   │   └── highlight.ts       # Custom attribute directive (HostListener)
│   │   ├── pipes/
│   │   │   └── credit-label-pipe.ts  # Custom pipe (credit count to label)
│   │   ├── guards/
│   │   │   └── auth-guard.ts      # Functional canActivate guard
│   │   ├── interceptors/
│   │   │   └── auth.ts            # Functional HTTP interceptor (Bearer token)
│   │   ├── app.routes.ts          # Lazy-loaded routes with guards
│   │   ├── app.config.ts          # App config (provideHttpClient, provideRouter)
│   │   └── app.ts                 # Root component
│   ├── styles.css                 # Global styles (Inter font, reset)
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
└── ...
```

## Angular Concepts Covered

| # | Concept | Where Used |
|---|---------|------------|
| 1 | Components & Standalone API | All components |
| 2 | Data Binding (Property, Event, Two-way) | home, course-card |
| 3 | Directives (@Input, @Output, HostListener) | course-card, highlight.ts |
| 4 | Structural Directives (*ngFor, *ngIf, trackBy) | home, course-list |
| 5 | Custom Pipe | credit-label-pipe.ts |
| 6 | Lifecycle Hooks (ngOnInit, ngOnDestroy) | home, course-list, profile |
| 7 | Services & Dependency Injection | course.ts, enrollment.ts |
| 8 | HTTP Client (provideHttpClient) | course.ts, app.config.ts |
| 9 | Routing (lazy loading, parameterized routes) | app.routes.ts |
| 10 | Route Guards (canActivate) | auth-guard.ts |
| 11 | HTTP Interceptors | interceptors/auth.ts |
| 12 | Template-Driven Forms | enrollment-form |
| 13 | Reactive Forms + FormArray | reactive-enrollment-form |
| 14 | Custom Validators (sync + async) | reactive-enrollment-form |

## How to Run

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Open browser at
http://localhost:4200
```

## Screenshots

All screenshots are available in the `screenshots/` folder. They capture:
- Node, NPM, Angular CLI versions
- Project creation
- Application running in browser
- All pages: Home, Courses, Profile, Enrollment Forms
- Terminal commands

## What I Learned

Building this project helped me understand how Angular's dependency injection tree works, how standalone components differ from NgModule-based ones, and how reactive forms are more powerful for complex validation scenarios than template-driven forms. The routing configuration with lazy loading was particularly interesting since it helps keep the initial bundle size small.

---
*Submitted by: Sai Praneeth E | Digital Nurture 5.0 | Week 6 Angular Hands-On*
