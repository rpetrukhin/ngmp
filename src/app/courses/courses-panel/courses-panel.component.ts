import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ROUTES } from 'src/app/consts/routes';

@Component({
  selector: 'app-courses-panel',
  templateUrl: './courses-panel.component.html',
  styleUrls: ['./courses-panel.component.scss'],
})
export class CoursesPanelComponent implements OnInit, OnDestroy {
  @Output() public searched = new EventEmitter<string>();

  public searchText: string;

  private subject: Subject<string> = new Subject();

  public constructor(private router: Router) {}

  public ngOnInit() {
    this.subject.pipe(debounceTime(700)).subscribe(searchText => {
      if (searchText.length >= 3) {
        this.searched.emit(searchText);
      } else {
        this.searched.emit('');
      }
    });
  }

  public ngOnDestroy() {
    this.subject.unsubscribe();
  }

  public onKeyUp(event: KeyboardEvent) {
    this.subject.next((<HTMLInputElement>event.target).value);
  }

  public addCourse() {
    this.router.navigate([ROUTES.addCourse]);
  }
}
