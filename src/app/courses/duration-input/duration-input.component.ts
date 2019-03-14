import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  ValidationErrors,
  NG_VALIDATORS,
} from '@angular/forms';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    },
  ],
})
export class DurationInputComponent implements ControlValueAccessor, Validator {
  private _value = null;

  private onChange: (value: number) => void = this.emptyFunction;
  private onTouched: () => void = this.emptyFunction;

  public isValid = true;
  public isTouched = false;

  private emptyFunction(): void {}

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this.writeValue(value);
  }

  public writeValue(value: number) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public validate(): ValidationErrors | null {
    if (Number.isInteger(+this._value)) {
      this.isValid = true;
      return null;
    } else {
      this.isValid = false;
      return { error: 'Not a number' };
    }
  }

  public onBlur(): void {
    this.isTouched = true;
    this.onTouched();
  }
}
