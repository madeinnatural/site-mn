import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'shoString',
})
export class ShortenStringPipe implements PipeTransform {

  transform(value: string, limit: number = 30) {
    if (value.length > limit) {
      return value.substr(0, limit) + '...';
    }
    return value;
  }
}
