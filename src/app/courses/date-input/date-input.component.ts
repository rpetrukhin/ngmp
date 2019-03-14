import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor {
  private _value = '';

  private onChange: (value: string) => void = this.emptyFunction;

  private emptyFunction(): void {}

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this.writeValue(value);
  }

  public writeValue(value: string) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {}
}
