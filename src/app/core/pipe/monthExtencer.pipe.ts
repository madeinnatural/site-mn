import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesPorExtenso'
})
export class MesPorExtensoPipe implements PipeTransform {

  transform(mes: number): string {
    return 'Janeiro'
  }

}
