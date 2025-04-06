import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalHtml',
  standalone: true
})
export class NormalHtmlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
