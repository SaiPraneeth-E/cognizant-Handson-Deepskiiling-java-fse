import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  transform(credits: number): string {
    if (credits <= 0) return 'No Credits';
    if (credits === 1) return '1 Credit';
    if (credits <= 3) return `${credits} Credits`;
    if (credits === 4) return `${credits} Credits (Heavy Load)`;
    return `${credits} Credits (Full Semester)`;
  }
}
