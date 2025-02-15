import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalHtml'
})
export class NormalHtmlPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) {
      return '';
    }
    return value.replace(/<\/?[^>]+(>|$)/g, '');
  }

}
