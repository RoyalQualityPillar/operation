import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDatePipe',
  standalone: false,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string, format: string = 'onlyDate'): string {
    if (!value || typeof value !== 'string') {
      return 'Invalid date';
    }
    console.log('Bharat-' + value);
    const dateTimeParts = value.split(' ');
    if (dateTimeParts.length !== 2) {
      return 'Invalid date';
    }

    const dateParts = dateTimeParts[0].split('-');
    const timeParts = dateTimeParts[1].split(/[:.]/);

    if (dateParts.length !== 3) {
      return 'Invalid date';
    }

    const day = parseInt(dateParts[0], 10);
    const monthIndex = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);

    const hours = parseInt(timeParts[0] || '0', 10);
    const minutes = parseInt(timeParts[1] || '0', 10);
    const seconds = parseInt(timeParts[2] || '0', 10);
    const milliseconds = parseInt(timeParts[3] || '0', 10);

    if (isNaN(day) || isNaN(monthIndex) || isNaN(year)) {
      return 'Invalid date';
    }

    const dateObj = new Date(
      year,
      monthIndex,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    );

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const formattedDate = `${day}-${monthNames[monthIndex]}-${year}`;

    switch (format) {
      case 'onlyDate':
        return formattedDate;
      case 'dateWithHrMin':
        return `${formattedDate} ${this.pad(hours)}:${this.pad(minutes)}`;
      case 'dateWithHrMinSec':
        return `${formattedDate} ${this.pad(hours)}:${this.pad(
          minutes
        )}:${this.pad(seconds)}`;
      case 'dateWithHrMinSecMs':
        return `${formattedDate} ${this.pad(hours)}:${this.pad(
          minutes
        )}:${this.pad(seconds)}.${milliseconds}`;
      default:
        return 'Invalid format';
    }
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0'); // Ensures 2-digit format
  }
}
