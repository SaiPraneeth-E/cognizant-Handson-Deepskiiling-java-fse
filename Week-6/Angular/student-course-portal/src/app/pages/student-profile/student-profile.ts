import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService, Course } from '../../services/course';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-page">
      <div class="profile-header">
        <div class="avatar-large">{{ auth.getUserName().charAt(0) }}</div>
        <div class="profile-info">
          <h1>{{ auth.getUserName() }}</h1>
          <p>{{ auth.getRole() }} · student&#64;portal.edu</p>
        </div>
      </div>

      <div class="section">
        <h2>My Enrolled Courses</h2>
        <div class="enrolled-grid" *ngIf="enrolledCourses.length > 0; else noCourses">
          <div class="enrolled-card" *ngFor="let course of enrolledCourses">
            <div class="ec-header">
              <h4>{{ course.title }}</h4>
              <span class="grade-pill" [class]="'grade-' + getGradeClass(course.grade)">{{ course.grade }}</span>
            </div>
            <p class="ec-instructor">{{ course.instructor }}</p>
            <p class="ec-category">{{ course.category }}</p>
            <a [routerLink]="['/courses', course.id]" class="ec-link">View Details →</a>
          </div>
        </div>
        <ng-template #noCourses>
          <div class="empty-state">
            <p>You haven't enrolled in any courses yet.</p>
            <a routerLink="/courses" class="enroll-btn">Browse Courses</a>
          </div>
        </ng-template>
      </div>

      <div class="section stats-section">
        <h2>Academic Stats</h2>
        <div class="stats-row">
          <div class="stat">
            <strong>{{ enrolledCourses.length }}</strong>
            <span>Enrolled</span>
          </div>
          <div class="stat">
            <strong>{{ totalCredits }}</strong>
            <span>Total Credits</span>
          </div>
          <div class="stat">
            <strong>GPA: {{ gpa }}</strong>
            <span>Estimated</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page { animation: fadeIn 0.4s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .profile-header { display: flex; align-items: center; gap: 20px; background: linear-gradient(135deg, #1a237e, #283593); color: white; border-radius: 16px; padding: 32px; margin-bottom: 24px; }
    .avatar-large { width: 72px; height: 72px; border-radius: 50%; background: #42a5f5; font-size: 2rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .profile-info h1 { margin: 0; font-size: 1.5rem; }
    .profile-info p { margin: 4px 0 0; opacity: 0.85; font-size: 0.9rem; }
    .section { margin-bottom: 32px; }
    .section h2 { color: #1a237e; margin-bottom: 16px; font-size: 1.2rem; }
    .enrolled-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .enrolled-card { background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); border: 1px solid #e0e0e0; }
    .ec-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .ec-header h4 { margin: 0; font-size: 0.95rem; color: #1a237e; }
    .grade-pill { padding: 2px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
    .grade-a { background: #e8f5e9; color: #2e7d32; }
    .grade-b { background: #fff8e1; color: #f57f17; }
    .grade-c { background: #fce4ec; color: #b71c1c; }
    .ec-instructor { color: #757575; font-size: 0.82rem; margin: 0 0 4px; }
    .ec-category { color: #1565c0; font-size: 0.78rem; font-weight: 600; margin: 0 0 12px; }
    .ec-link { color: #1565c0; font-size: 0.82rem; text-decoration: none; font-weight: 600; }
    .empty-state { text-align: center; padding: 40px; background: #f5f5f5; border-radius: 10px; }
    .empty-state p { color: #757575; margin-bottom: 16px; }
    .enroll-btn { background: #1565c0; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .stats-section .stats-row { display: flex; gap: 24px; }
    .stat { background: white; border-radius: 10px; padding: 20px 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); text-align: center; }
    .stat strong { display: block; font-size: 1.6rem; color: #1a237e; }
    .stat span { font-size: 0.8rem; color: #757575; }
  `]
})
export class StudentProfile implements OnInit {
  enrolledCourses: Course[] = [];
  totalCredits = 0;
  gpa = '3.7';

  constructor(public auth: AuthService, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getEnrolledCourses().subscribe(courses => {
      this.enrolledCourses = courses;
      this.totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    });
  }

  getGradeClass(grade: string): string {
    if (grade.startsWith('A')) return 'a';
    if (grade.startsWith('B')) return 'b';
    return 'c';
  }
}
