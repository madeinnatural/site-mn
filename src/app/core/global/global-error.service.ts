import { GlobalEventService } from './global.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {

  constructor(
    public globalEventService: GlobalEventService
  ) {
    this.globalEventService.errorPurchase.subscribe( (error) => {
      console.log(error)
    })
  }
}
