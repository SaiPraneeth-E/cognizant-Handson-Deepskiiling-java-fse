import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

// Custom synchronous validator: must not contain "COURSE" (case-insensitive)
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const val: string = control.value || '';
  return val.toUpperCase().includes('COURSE') ? { noCourseCode: true } : null;
}

// Custom async validator: simulate checking if email is already registered
function simulateEmailCheck(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const takenEmails = ['admin@portal.com', 'test@test.com'];
    return of(control.value).pipe(
      delay(600),
      map(email => takenEmails.includes(email) ? { emailTaken: true } : null)
    );
  };
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-page">
      <div class="form-header">
        <h2>⚡ Reactive Enrollment Form</h2>
        <p>Advanced form with custom validators, async validation & dynamic form arrays</p>
      </div>

      <div class="form-card" *ngIf="!submitted">
        <form [formGroup]="enrollForm" (ngSubmit)="onSubmit()" novalidate>

          <div class="form-group">
            <label>Full Name *</label>
            <input formControlName="name" class="form-control"
              [class.is-invalid]="isInvalid('name')"
              placeholder="Your full name" />
            <div class="error-msg" *ngIf="isInvalid('name')">
              <span *ngIf="enrollForm.get('name')?.errors?.['required']">Name is required.</span>
              <span *ngIf="enrollForm.get('name')?.errors?.['minlength']">Min 3 characters required.</span>
              <span *ngIf="enrollForm.get('name')?.errors?.['noCourseCode']">Name cannot contain "COURSE".</span>
            </div>
          </div>

          <div class="form-group">
            <label>Email Address *</label>
            <input formControlName="email" type="email" class="form-control"
              [class.is-invalid]="isInvalid('email')"
              placeholder="student@example.com" />
            <div class="checking-msg" *ngIf="enrollForm.get('email')?.pending">⏳ Checking email...</div>
            <div class="error-msg" *ngIf="isInvalid('email')">
              <span *ngIf="enrollForm.get('email')?.errors?.['required']">Email is required.</span>
              <span *ngIf="enrollForm.get('email')?.errors?.['email']">Invalid email format.</span>
              <span *ngIf="enrollForm.get('email')?.errors?.['emailTaken']">This email is already registered.</span>
            </div>
          </div>

          <div class="form-group">
            <label>Primary Course *</label>
            <select formControlName="primaryCourse" class="form-control" [class.is-invalid]="isInvalid('primaryCourse')">
              <option value="">-- Select --</option>
              <option value="Angular Fundamentals">Angular Fundamentals</option>
              <option value="Spring Boot Essentials">Spring Boot Essentials</option>
              <option value="Microservices Architecture">Microservices Architecture</option>
              <option value="React & Redux">React & Redux</option>
            </select>
            <div class="error-msg" *ngIf="isInvalid('primaryCourse')">Please select a course.</div>
          </div>

          <!-- Dynamic FormArray for additional courses -->
          <div class="form-group">
            <div class="array-header">
              <label>Additional Courses</label>
              <button type="button" class="btn-add" (click)="addCourse()">+ Add</button>
            </div>
            <div formArrayName="additionalCourses">
              <div *ngFor="let ctrl of additionalCourses.controls; let i = index" class="array-row">
                <input [formControlName]="i" class="form-control" placeholder="Course name {{ i + 1 }}" />
                <button type="button" class="btn-remove" (click)="removeCourse(i)">✕</button>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="enrollForm.invalid || enrollForm.pending">
              <span *ngIf="enrollForm.pending">Validating...</span>
              <span *ngIf="!enrollForm.pending">Submit</span>
            </button>
            <button type="button" class="btn btn-outline" (click)="onReset()">Reset</button>
          </div>

          <div class="form-debug">
            <h4>🔍 Form State (Debug)</h4>
            <p>Valid: <strong>{{ enrollForm.valid }}</strong> | Dirty: <strong>{{ enrollForm.dirty }}</strong> | Pending: <strong>{{ enrollForm.pending }}</strong></p>
            <pre>{{ enrollForm.value | json }}</pre>
          </div>
        </form>
      </div>

      <div class="success-card" *ngIf="submitted">
        <div class="success-icon">✅</div>
        <h3>Reactive Form Submitted!</h3>
        <p>Welcome, <strong>{{ submittedData?.name }}</strong>!</p>
        <p>Primary Course: <strong>{{ submittedData?.primaryCourse }}</strong></p>
        <button class="btn btn-primary" (click)="submitted = false; onReset()">Submit Another</button>
      </div>
    </div>
  `,
  styles: [`
    .form-page { max-width: 640px; margin: 0 auto; animation: fadeIn 0.4s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .form-header { margin-bottom: 24px; }
    .form-header h2 { margin: 0; color: #1a237e; }
    .form-header p { color: #757575; margin: 4px 0 0; }
    .form-card { background: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .form-group { margin-bottom: 20px; }
    label { display: block; font-weight: 600; color: #424242; margin-bottom: 6px; font-size: 0.9rem; }
    .form-control { width: 100%; padding: 10px 14px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 0.95rem; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
    .form-control:focus { border-color: #1565c0; }
    .form-control.is-invalid { border-color: #f44336; }
    .error-msg { color: #f44336; font-size: 0.8rem; margin-top: 4px; }
    .checking-msg { color: #f57f17; font-size: 0.8rem; margin-top: 4px; }
    .array-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .array-row { display: flex; gap: 8px; margin-bottom: 8px; }
    .btn-add { background: #e3f2fd; color: #1565c0; border: none; border-radius: 6px; padding: 4px 12px; font-weight: 700; cursor: pointer; }
    .btn-remove { background: #fce4ec; color: #f44336; border: none; border-radius: 6px; padding: 6px 12px; cursor: pointer; font-weight: 700; flex-shrink: 0; }
    .form-actions { display: flex; gap: 12px; margin-top: 24px; }
    .btn { padding: 10px 24px; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-primary { background: #1565c0; color: white; }
    .btn-primary:hover:not(:disabled) { background: #0d47a1; }
    .btn-primary:disabled { background: #90caf9; cursor: not-allowed; }
    .btn-outline { background: transparent; color: #1565c0; border: 2px solid #1565c0; }
    .btn-outline:hover { background: #e3f2fd; }
    .form-debug { margin-top: 20px; padding: 16px; background: #f8f9fa; border-radius: 8px; }
    .form-debug h4 { margin: 0 0 8px; font-size: 0.9rem; color: #424242; }
    .form-debug p { font-size: 0.82rem; margin: 0 0 8px; }
    .form-debug pre { font-size: 0.78rem; color: #616161; white-space: pre-wrap; margin: 0; }
    .success-card { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); text-align: center; }
    .success-icon { font-size: 3rem; margin-bottom: 16px; }
    .success-card h3 { color: #2e7d32; font-size: 1.4rem; margin: 0 0 12px; }
    .success-card p { color: #616161; margin: 4px 0; }
    .success-card .btn { margin-top: 20px; }
  `]
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;
  submittedData: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), noCourseCode]],
      email: ['', [Validators.required, Validators.email], [simulateEmailCheck()]],
      primaryCourse: ['', Validators.required],
      additionalCourses: this.fb.array([])
    });
  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control(''));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  isInvalid(field: string): boolean {
    const ctrl = this.enrollForm.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      this.submittedData = this.enrollForm.value;
      this.submitted = true;
    } else {
      this.enrollForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.enrollForm.reset();
    this.additionalCourses.clear();
    this.submitted = false;
    this.submittedData = null;
  }
}
