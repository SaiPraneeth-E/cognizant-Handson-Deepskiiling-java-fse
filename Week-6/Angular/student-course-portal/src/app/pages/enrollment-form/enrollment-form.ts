import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-page">
      <div class="form-header">
        <h2>📝 Template-Driven Enrollment Form</h2>
        <p>Register for a course using our standard enrollment form</p>
      </div>

      <div class="form-card" *ngIf="!submitted">
        <form #enrollForm="ngForm" (ngSubmit)="onSubmit(enrollForm)" novalidate>

          <div class="form-group">
            <label for="studentName">Full Name *</label>
            <input id="studentName" type="text" name="studentName" class="form-control"
              [(ngModel)]="model.studentName"
              required minlength="3"
              #studentName="ngModel"
              [class.is-invalid]="studentName.invalid && studentName.touched"
              placeholder="e.g. Sai Praneeth E" />
            <div class="error-msg" *ngIf="studentName.invalid && studentName.touched">
              <span *ngIf="studentName.errors?.['required']">Name is required.</span>
              <span *ngIf="studentName.errors?.['minlength']">Name must be at least 3 characters.</span>
            </div>
          </div>

          <div class="form-group">
            <label for="studentEmail">Email Address *</label>
            <input id="studentEmail" type="email" name="studentEmail" class="form-control"
              [(ngModel)]="model.studentEmail"
              required email
              #studentEmail="ngModel"
              [class.is-invalid]="studentEmail.invalid && studentEmail.touched"
              placeholder="e.g. student@example.com" />
            <div class="error-msg" *ngIf="studentEmail.invalid && studentEmail.touched">
              <span *ngIf="studentEmail.errors?.['required']">Email is required.</span>
              <span *ngIf="studentEmail.errors?.['email']">Please enter a valid email.</span>
            </div>
          </div>

          <div class="form-group">
            <label for="courseId">Select Course *</label>
            <select id="courseId" name="courseId" class="form-control"
              [(ngModel)]="model.courseId"
              required
              #courseId="ngModel"
              [class.is-invalid]="courseId.invalid && courseId.touched">
              <option value="">-- Select a Course --</option>
              <option value="1">Angular Fundamentals</option>
              <option value="2">Spring Boot Essentials</option>
              <option value="3">Microservices Architecture</option>
              <option value="4">Database Design & SQL</option>
              <option value="5">React & Redux</option>
              <option value="6">DevOps & CI/CD</option>
            </select>
            <div class="error-msg" *ngIf="courseId.invalid && courseId.touched">
              <span *ngIf="courseId.errors?.['required']">Please select a course.</span>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Message (Optional)</label>
            <textarea id="message" name="message" class="form-control" rows="3"
              [(ngModel)]="model.message"
              placeholder="Any special requirements?"></textarea>
          </div>

          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" name="agree" [(ngModel)]="model.agree" required #agree="ngModel" />
              I agree to the terms and conditions *
            </label>
            <div class="error-msg" *ngIf="agree.invalid && agree.touched">
              You must agree to continue.
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="enrollForm.invalid">
              Submit Enrollment
            </button>
            <button type="button" class="btn btn-outline" (click)="onReset(enrollForm)">
              Reset
            </button>
          </div>

          <div class="form-status">
            <p>Form Valid: <strong>{{ enrollForm.valid ? '✅ Yes' : '❌ No' }}</strong></p>
            <p>Form Dirty: <strong>{{ enrollForm.dirty ? 'Yes' : 'No' }}</strong></p>
          </div>
        </form>
      </div>

      <div class="success-card" *ngIf="submitted">
        <div class="success-icon">🎉</div>
        <h3>Enrollment Submitted!</h3>
        <p>Thank you, <strong>{{ model.studentName }}</strong>!</p>
        <p>Confirmation sent to <strong>{{ model.studentEmail }}</strong></p>
        <button class="btn btn-primary" (click)="submitted = false">Submit Another</button>
      </div>
    </div>
  `,
  styles: [`
    .form-page { max-width: 600px; margin: 0 auto; animation: fadeIn 0.4s ease; }
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
    .checkbox-group label { display: flex; align-items: center; gap: 8px; font-weight: 500; cursor: pointer; }
    .form-actions { display: flex; gap: 12px; margin-top: 24px; }
    .btn { padding: 10px 24px; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-primary { background: #1565c0; color: white; }
    .btn-primary:hover:not(:disabled) { background: #0d47a1; }
    .btn-primary:disabled { background: #90caf9; cursor: not-allowed; }
    .btn-outline { background: transparent; color: #1565c0; border: 2px solid #1565c0; }
    .btn-outline:hover { background: #e3f2fd; }
    .form-status { margin-top: 16px; padding: 12px 16px; background: #f5f5f5; border-radius: 8px; font-size: 0.82rem; }
    .form-status p { margin: 2px 0; }
    .success-card { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); text-align: center; }
    .success-icon { font-size: 3rem; margin-bottom: 16px; }
    .success-card h3 { color: #2e7d32; font-size: 1.4rem; margin: 0 0 12px; }
    .success-card p { color: #616161; margin: 4px 0; }
    .success-card .btn { margin-top: 20px; }
  `]
})
export class EnrollmentForm {
  submitted = false;
  model = {
    studentName: '',
    studentEmail: '',
    courseId: '',
    message: '',
    agree: false
  };

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.submitted = true;
    }
  }

  onReset(form: NgForm): void {
    form.reset();
    this.model = { studentName: '', studentEmail: '', courseId: '', message: '', agree: false };
  }
}
