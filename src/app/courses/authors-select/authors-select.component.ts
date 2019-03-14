import {
  Component,
  forwardRef,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  ValidationErrors,
  NG_VALIDATORS,
} from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Author } from 'src/app-entities/classes/author.model';

@Component({
  selector: 'app-authors-select',
  templateUrl: './authors-select.component.html',
  styleUrls: ['./authors-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorsSelectComponent),
      multi: true,
    },
  ],
})
export class AuthorsSelectComponent implements ControlValueAccessor, Validator {
  @Input() listOfAuthors: Array<Author> = [];
  @ViewChild('input') inputElement: ElementRef;

  private _value = '';
  private onChange: (value: string) => void = this.emptyFunction;
  private onTouched: () => void = this.emptyFunction;

  public isValid = true;
  public isTouched = false;
  public deleteIcon = faTrashAlt;
  public filteredListOfAuthors: Array<Author> = [];
  public selectedAuthors: Array<Author> = [];

  private emptyFunction(): void {}

  public constructor(private elRef: ElementRef) {}

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    const transformedValue = value.toLowerCase();
    if (transformedValue) {
      this.filteredListOfAuthors = this.listOfAuthors.filter(
        author =>
          author.name.toLowerCase().match(transformedValue) &&
          !this.selectedAuthors.find(
            selectedAuthor => selectedAuthor.id === author.id
          )
      );
      this.filteredListOfAuthors.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name === b.name) {
          return 0;
        } else {
          return -1;
        }
      });
    } else {
      this.filteredListOfAuthors = [];
    }
  }

  public selectAuthor(author: Author): void {
    this.value = '';
    this.selectedAuthors.push(author);
    this.onChange(JSON.stringify(this.selectedAuthors));
    this.filteredListOfAuthors = this.filteredListOfAuthors.filter(
      filteredAuthor =>
        !this.selectedAuthors.find(
          selectedAuthor => selectedAuthor.id === filteredAuthor.id
        )
    );
    this.focusOnInput();
  }

  public focusOnInput(): void {
    this.inputElement.nativeElement.focus();
  }

  public backspaceOnInput(event: KeyboardEvent): void {
    if (
      !this.value &&
      this.selectedAuthors.length &&
      event.code === 'Backspace'
    ) {
      const selectedAuthorElements = this.elRef.nativeElement.querySelectorAll(
        '.selectedAuthor'
      );
      const lastSelectedAuthorElement =
        selectedAuthorElements[selectedAuthorElements.length - 1];
      lastSelectedAuthorElement.focus();
    }
  }

  public deleteAuthor(author: Author): void {
    this.selectedAuthors = this.selectedAuthors.filter(
      selectedAuthor => selectedAuthor.id !== author.id
    );
    this.onChange(JSON.stringify(this.selectedAuthors));
    this.focusOnInput();
  }

  public controlSelectedAuthors(event: KeyboardEvent, author: Author): void {
    if (event.code === 'Backspace') {
      this.deleteAuthor(author);
    }

    if (event.code === 'ArrowLeft') {
      event.preventDefault();
      const selectedAuthorElements = this.elRef.nativeElement.querySelectorAll(
        '.selectedAuthor'
      );
      const idxOfSelectedAuthorElement = Number(
        (<HTMLElement>event.target).classList[1].split('-')[1]
      );
      if (idxOfSelectedAuthorElement !== 0) {
        const leftOfSelectedAuthorElement =
          selectedAuthorElements[idxOfSelectedAuthorElement - 1];
        leftOfSelectedAuthorElement.focus();
      }
    }

    if (event.code === 'ArrowRight') {
      event.preventDefault();
      const selectedAuthorElements = this.elRef.nativeElement.querySelectorAll(
        '.selectedAuthor'
      );
      const idxOfSelectedAuthorElement = Number(
        (<HTMLElement>event.target).classList[1].split('-')[1]
      );
      if (idxOfSelectedAuthorElement !== selectedAuthorElements.length - 1) {
        const rightOfSelectedAuthorElement =
          selectedAuthorElements[idxOfSelectedAuthorElement + 1];
        rightOfSelectedAuthorElement.focus();
      }
    }

    if (event.code === 'Escape') {
      this.focusOnInput();
    }
  }

  public onBlur(): void {
    if (!this.isTouched) {
      this.isTouched = true;
      this.onTouched();
    }
  }

  public writeValue(value: string): void {
    if (value && value !== JSON.stringify(this.selectedAuthors)) {
      this.selectedAuthors = JSON.parse(value);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public validate(): ValidationErrors | null {
    if (this.selectedAuthors.length) {
      this.isValid = true;
      return null;
    } else {
      this.isValid = false;
      return { error: 'You need to choose at least one author' };
    }
  }
}
