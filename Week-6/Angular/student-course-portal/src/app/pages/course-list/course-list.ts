import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard],
  template: `
    <div class="course-list-page">
      <div class="page-header">
        <h2>📚 All Courses</h2>
        <p>Browse and enroll in available courses</p>
      </div>

      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
        <p>Loading courses...</p>
      </div>

      <div class="courses-grid" *ngIf="!loading">
        <app-course-card
          *ngFor="let course of courses; trackBy: trackById"
          [course]="course"
          (enrollChange)="onEnrollChange($event)">
        </app-course-card>
      </div>
    </div>
  `,
  styles: [`
    .course-list-page { animation: fadeIn 0.4s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .page-header { margin-bottom: 24px; }
    .page-header h2 { margin: 0; color: #1a237e; font-size: 1.6rem; }
    .page-header p { color: #757575; margin: 4px 0 0; }
    .loading { text-align: center; padding: 40px; color: #757575; }
    .spinner { width: 40px; height: 40px; border: 4px solid #e0e0e0; border-top-color: #1565c0; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 12px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
  `]
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  loading = true;

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.courseService.getCourses().subscribe(courses => {
        this.courses = courses;
        this.loading = false;
      });
    }, 600);
  }

  onEnrollChange(event: { id: number; enroll: boolean }): void {
    if (event.enroll) {
      this.enrollmentService.enroll(event.id);
    } else {
      this.enrollmentService.unenroll(event.id);
    }
  }

  trackById(index: number, course: Course): number {
    return course.id;
  }
}
