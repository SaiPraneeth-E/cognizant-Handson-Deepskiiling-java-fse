import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService, Course } from '../../services/course';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  template: `
    <div class="detail-page" *ngIf="course; else notFound">
      <a routerLink="/courses" class="back-link">← Back to Courses</a>

      <div class="detail-card">
        <div class="detail-header">
          <div>
            <span class="category">{{ course.category }}</span>
            <h1>{{ course.title }}</h1>
          </div>
          <span class="grade-badge grade-{{ getGradeClass(course.grade) }}">{{ course.grade }}</span>
        </div>

        <div class="detail-body">
          <div class="info-row">
            <span class="label">Instructor:</span>
            <span>{{ course.instructor }}</span>
          </div>
          <div class="info-row">
            <span class="label">Credits:</span>
            <span>{{ course.credits | creditLabel }}</span>
          </div>
          <div class="info-row">
            <span class="label">Status:</span>
            <span class="status" [class.enrolled]="course.enrolled">{{ course.enrolled ? '✅ Enrolled' : '⭕ Not Enrolled' }}</span>
          </div>
          <div class="description-block">
            <h3>About this Course</h3>
            <p>{{ course.description }}</p>
          </div>
        </div>

        <div class="actions">
          <button
            class="btn"
            [class.btn-danger]="course.enrolled"
            [class.btn-primary]="!course.enrolled"
            (click)="toggleEnrollment()">
            {{ course.enrolled ? '❌ Unenroll' : '✅ Enroll Now' }}
          </button>
        </div>

        <div class="enroll-msg" *ngIf="message" [class.success]="course.enrolled" [class.info]="!course.enrolled">
          {{ message }}
        </div>
      </div>
    </div>

    <ng-template #notFound>
      <div class="not-found">
        <h2>Course not found</h2>
        <a routerLink="/courses">Go back to courses</a>
      </div>
    </ng-template>
  `,
  styles: [`
    .detail-page { animation: fadeIn 0.4s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .back-link { color: #1565c0; text-decoration: none; font-size: 0.9rem; display: inline-block; margin-bottom: 16px; }
    .detail-card { background: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .detail-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .category { background: #e3f2fd; color: #1565c0; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
    h1 { margin: 8px 0 0; font-size: 1.6rem; color: #1a237e; }
    .grade-badge { padding: 6px 16px; border-radius: 8px; font-size: 1.1rem; font-weight: 800; }
    .grade-a { background: #e8f5e9; color: #2e7d32; }
    .grade-b { background: #fff8e1; color: #f57f17; }
    .grade-c { background: #fce4ec; color: #b71c1c; }
    .info-row { display: flex; gap: 16px; margin-bottom: 12px; font-size: 0.95rem; }
    .label { font-weight: 600; color: #424242; min-width: 90px; }
    .status.enrolled { color: #2e7d32; font-weight: 600; }
    .description-block { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
    .description-block h3 { margin: 0 0 8px; color: #424242; }
    .description-block p { color: #616161; line-height: 1.6; }
    .actions { margin-top: 24px; }
    .btn { padding: 10px 24px; border: none; border-radius: 8px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-primary { background: #1565c0; color: white; }
    .btn-primary:hover { background: #0d47a1; }
    .btn-danger { background: #f44336; color: white; }
    .btn-danger:hover { background: #c62828; }
    .enroll-msg { margin-top: 12px; padding: 10px 16px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; }
    .enroll-msg.success { background: #e8f5e9; color: #2e7d32; }
    .enroll-msg.info { background: #fff8e1; color: #f57f17; }
    .not-found { text-align: center; padding: 60px; color: #757575; }
  `]
})
export class CourseDetail implements OnInit {
  course: Course | undefined;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe(course => this.course = course);
  }

  toggleEnrollment(): void {
    if (!this.course) return;
    if (this.course.enrolled) {
      this.enrollmentService.unenroll(this.course.id);
      this.course.enrolled = false;
      this.message = 'You have unenrolled from this course.';
    } else {
      this.enrollmentService.enroll(this.course.id);
      this.course.enrolled = true;
      this.message = 'Successfully enrolled! See you in class. 🎉';
    }
    setTimeout(() => this.message = '', 3000);
  }

  getGradeClass(grade: string): string {
    if (grade.startsWith('A')) return 'a';
    if (grade.startsWith('B')) return 'b';
    return 'c';
  }
}
