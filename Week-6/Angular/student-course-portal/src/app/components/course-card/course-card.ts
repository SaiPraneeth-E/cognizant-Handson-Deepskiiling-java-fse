import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Course } from '../../services/course';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { HighlightDirective } from '../../directives/highlight';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe, HighlightDirective],
  template: `
    <div class="card" [appHighlight]="'#e8f0fe'" [class.enrolled]="course.enrolled">
      <div class="card-header">
        <span class="category-badge">{{ course.category }}</span>
        <span class="grade-badge" [class]="'grade-' + getGradeClass(course.grade)">{{ course.grade }}</span>
      </div>
      <h3 class="course-title">{{ course.title }}</h3>
      <p class="instructor">👨‍🏫 {{ course.instructor }}</p>
      <p class="description">{{ course.description }}</p>
      <div class="card-footer">
        <span class="credits">🎓 {{ course.credits | creditLabel }}</span>
        <div class="actions">
          <a [routerLink]="['/courses', course.id]" class="btn btn-outline">Details</a>
          <button
            class="btn"
            [class.btn-danger]="course.enrolled"
            [class.btn-primary]="!course.enrolled"
            (click)="onEnroll()">
            {{ course.enrolled ? 'Unenroll' : 'Enroll' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      border: 1px solid #e0e0e0;
      transition: all 0.3s ease;
      cursor: default;
    }
    .card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.12); transform: translateY(-2px); }
    .card.enrolled { border-left: 4px solid #4caf50; }
    .card-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
    .category-badge { background: #e3f2fd; color: #1565c0; padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .grade-badge { padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
    .grade-a { background: #e8f5e9; color: #2e7d32; }
    .grade-b { background: #fff8e1; color: #f57f17; }
    .grade-c { background: #fce4ec; color: #b71c1c; }
    .course-title { font-size: 1rem; font-weight: 700; color: #212121; margin: 0 0 6px; }
    .instructor { color: #757575; font-size: 0.85rem; margin: 0 0 8px; }
    .description { color: #616161; font-size: 0.82rem; line-height: 1.4; margin: 0 0 16px; }
    .card-footer { display: flex; justify-content: space-between; align-items: center; }
    .credits { font-size: 0.8rem; color: #1565c0; font-weight: 600; }
    .actions { display: flex; gap: 8px; }
    .btn { padding: 6px 14px; border-radius: 6px; border: none; cursor: pointer; font-size: 0.82rem; font-weight: 600; transition: all 0.2s; text-decoration: none; }
    .btn-primary { background: #1565c0; color: white; }
    .btn-primary:hover { background: #0d47a1; }
    .btn-danger { background: #f44336; color: white; }
    .btn-danger:hover { background: #c62828; }
    .btn-outline { background: transparent; color: #1565c0; border: 1.5px solid #1565c0; }
    .btn-outline:hover { background: #e3f2fd; }
  `]
})
export class CourseCard {
  @Input() course!: Course;
  @Output() enrollChange = new EventEmitter<{ id: number; enroll: boolean }>();

  onEnroll(): void {
    this.enrollChange.emit({ id: this.course.id, enroll: !this.course.enrolled });
    this.course.enrolled = !this.course.enrolled;
  }

  getGradeClass(grade: string): string {
    if (grade.startsWith('A')) return 'a';
    if (grade.startsWith('B')) return 'b';
    return 'c';
  }
}
