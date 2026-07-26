import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  credits: number;
  category: string;
  description: string;
  grade: string;
  enrolled: boolean;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  private courses: Course[] = [
    { id: 1, title: 'Angular Fundamentals', instructor: 'Dr. John Smith', credits: 4, category: 'Frontend', description: 'Learn core Angular concepts including components, directives, services and routing.', grade: 'A', enrolled: true },
    { id: 2, title: 'Spring Boot Essentials', instructor: 'Prof. Anita Rao', credits: 3, category: 'Backend', description: 'Build robust REST APIs with Spring Boot and JPA integration.', grade: 'B+', enrolled: false },
    { id: 3, title: 'Microservices Architecture', instructor: 'Dr. Kevin Brown', credits: 4, category: 'Architecture', description: 'Design and deploy microservices using Docker and Kubernetes.', grade: 'A-', enrolled: true },
    { id: 4, title: 'Database Design & SQL', instructor: 'Prof. Priya Nair', credits: 3, category: 'Database', description: 'Master relational databases, normalization and advanced SQL queries.', grade: 'B', enrolled: false },
    { id: 5, title: 'React & Redux', instructor: 'Dr. Michael Lee', credits: 4, category: 'Frontend', description: 'Build scalable SPAs with React, Redux, and TypeScript.', grade: 'A+', enrolled: true },
    { id: 6, title: 'DevOps & CI/CD', instructor: 'Prof. Sarah Kumar', credits: 3, category: 'DevOps', description: 'Automate deployments with Jenkins, Docker, and GitHub Actions.', grade: 'B+', enrolled: false },
  ];

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return of(this.courses.find(c => c.id === id));
  }

  getEnrolledCourses(): Observable<Course[]> {
    return of(this.courses.filter(c => c.enrolled));
  }

  enrollCourse(id: number): void {
    const course = this.courses.find(c => c.id === id);
    if (course) course.enrolled = true;
  }

  unenrollCourse(id: number): void {
    const course = this.courses.find(c => c.id === id);
    if (course) course.enrolled = false;
  }

  // Demo HTTP call to external API
  getExternalPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
