import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value - hours * 60;
    if (hours === 0) {
      return `${minutes}min`;
    } else {
      return `${hours}h ${minutes}min`;
    }
  }
}
