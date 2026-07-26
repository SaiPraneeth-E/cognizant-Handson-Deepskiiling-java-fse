import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="widget">
      <h3 class="widget-title">📊 My Course Summary</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">{{ totalCourses }}</span>
          <span class="stat-label">Total Courses</span>
        </div>
        <div class="stat-card enrolled">
          <span class="stat-value">{{ enrolledCount }}</span>
          <span class="stat-label">Enrolled</span>
        </div>
        <div class="stat-card available">
          <span class="stat-value">{{ totalCourses - enrolledCount }}</span>
          <span class="stat-label">Available</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .widget { background: linear-gradient(135deg, #1a237e, #283593); color: white; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .widget-title { margin: 0 0 16px; font-size: 1rem; font-weight: 700; }
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .stat-card { background: rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; text-align: center; }
    .stat-value { display: block; font-size: 1.8rem; font-weight: 800; }
    .stat-label { font-size: 0.75rem; opacity: 0.8; }
    .stat-card.enrolled { background: rgba(76,175,80,0.3); }
    .stat-card.available { background: rgba(66,165,245,0.3); }
  `]
})
export class CourseSummaryWidget implements OnInit {
  totalCourses = 0;
  enrolledCount = 0;

  constructor(private enrollmentService: EnrollmentService, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => this.totalCourses = courses.length);
    this.enrolledCount = this.enrollmentService.getEnrolledCount();
  }
}
