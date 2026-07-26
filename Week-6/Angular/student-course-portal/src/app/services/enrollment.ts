import { Injectable } from '@angular/core';
import { CourseService, Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledIds: Set<number> = new Set([1, 3, 5]);

  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void {
    this.enrolledIds.add(courseId);
    this.courseService.enrollCourse(courseId);
  }

  unenroll(courseId: number): void {
    this.enrolledIds.delete(courseId);
    this.courseService.unenrollCourse(courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledIds.has(courseId);
  }

  getEnrolledCount(): number {
    return this.enrolledIds.size;
  }
}
