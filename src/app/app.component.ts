import { Component } from '@angular/core';
import { COURSES } from 'src/db-data';
import { Course } from './model/course';
import { Inject } from '@angular/core';
import { Injector } from '@angular/core';
import { CONFIG_TOKEN, AppConfig } from './config';
import { createCustomElement } from '@angular/elements';
import { CourseTitleComponent } from './course-title/course-title.component';
import { CoursesService } from './courses/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Application';

  onKeyUp = (title: string) => {
    this.title = title;
  }

  courses: Course[] = COURSES;

  coursesTotal = this.courses.length;

  startDate = new Date(2000, 0, 1);

  constructor(
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private injector: Injector) {

  }

  ngOnInit() {
    const htmlElement = createCustomElement(CourseTitleComponent, {injector:this.injector});
    customElements.define('course-title', htmlElement);
  }

  onEditCourse() {
    this.courses[1].category = 'ADVANCED';
  }

  save(course: Course) {
    this.coursesService.saveCourse(course)
    .subscribe(
        () => console.log('Course Saved!')
    ); 
  }
}
