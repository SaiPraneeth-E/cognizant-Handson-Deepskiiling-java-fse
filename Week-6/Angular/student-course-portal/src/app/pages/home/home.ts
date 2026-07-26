import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService, Course } from '../../services/course';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CourseSummaryWidget],
  template: `
    <div class="home-page">
      <div class="hero">
        <div class="hero-text">
          <h1>Welcome to Student Course Portal 🎓</h1>
          <p>Explore, enroll, and manage your academic journey — all in one place.</p>
          <a routerLink="/courses" class="cta-btn">Browse Courses →</a>
        </div>
      </div>

      <app-course-summary-widget></app-course-summary-widget>

      <div class="search-section">
        <h2>Quick Search</h2>
        <input
          class="search-input"
          type="text"
          [(ngModel)]="searchQuery"
          placeholder="Search courses by title or instructor..."
          (ngModelChange)="onSearchChange()"
        />
        <p *ngIf="searchQuery" class="search-hint">Showing results for: <strong>{{ searchQuery }}</strong></p>
      </div>

      <div class="featured-courses">
        <h2>Featured Courses</h2>
        <div class="courses-grid">
          <div class="mini-card" *ngFor="let course of filteredCourses; trackBy: trackById" [class.enrolled]="course.enrolled">
            <h4>{{ course.title }}</h4>
            <p>{{ course.instructor }}</p>
            <a [routerLink]="['/courses', course.id]" class="view-btn">View →</a>
          </div>
        </div>
        <p *ngIf="filteredCourses.length === 0" class="no-results">No courses match your search.</p>
      </div>

      <div class="lifecycle-log" *ngIf="logs.length">
        <h3>🔄 Lifecycle Events (Dev Mode)</h3>
        <ul>
          <li *ngFor="let log of logs">{{ log }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .home-page { animation: fadeIn 0.4s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .hero { background: linear-gradient(135deg, #e3f2fd, #bbdefb); border-radius: 16px; padding: 40px; margin-bottom: 24px; }
    .hero-text h1 { margin: 0 0 8px; font-size: 2rem; color: #1a237e; }
    .hero-text p { color: #424242; margin: 0 0 20px; font-size: 1.05rem; }
    .cta-btn { background: #1565c0; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; transition: background 0.2s; }
    .cta-btn:hover { background: #0d47a1; }
    .search-section { margin-bottom: 24px; }
    .search-section h2, .featured-courses h2 { color: #212121; margin-bottom: 12px; }
    .search-input { width: 100%; padding: 12px 16px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1rem; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
    .search-input:focus { border-color: #1565c0; }
    .search-hint { color: #757575; font-size: 0.9rem; margin-top: 6px; }
    .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .mini-card { background: white; border-radius: 10px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); border: 1px solid #e0e0e0; transition: transform 0.2s; }
    .mini-card:hover { transform: translateY(-3px); }
    .mini-card.enrolled { border-left: 4px solid #4caf50; }
    .mini-card h4 { margin: 0 0 6px; font-size: 0.95rem; color: #1a237e; }
    .mini-card p { color: #757575; font-size: 0.82rem; margin: 0 0 12px; }
    .view-btn { color: #1565c0; font-size: 0.82rem; font-weight: 600; text-decoration: none; }
    .no-results { color: #757575; font-style: italic; }
    .lifecycle-log { margin-top: 24px; background: #f5f5f5; border-radius: 8px; padding: 16px; }
    .lifecycle-log h3 { margin: 0 0 10px; font-size: 0.95rem; color: #424242; }
    .lifecycle-log ul { margin: 0; padding-left: 20px; }
    .lifecycle-log li { font-size: 0.82rem; color: #616161; }
  `]
})
export class Home implements OnInit, OnDestroy {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery = '';
  logs: string[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.logs.push(`[${new Date().toLocaleTimeString()}] ngOnInit called - loading courses`);
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  ngOnDestroy(): void {
    this.logs.push(`[${new Date().toLocaleTimeString()}] ngOnDestroy called`);
  }

  onSearchChange(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredCourses = this.courses.filter(c =>
      c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
    );
  }

  trackById(index: number, course: Course): number {
    return course.id;
  }
}
