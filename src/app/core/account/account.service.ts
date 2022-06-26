import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  hidderHeaderFooter = new EventEmitter<boolean>();

  constructor() { }

  loginActiver(active: boolean) {
    this.hidderHeaderFooter.emit(active);
  }


}
