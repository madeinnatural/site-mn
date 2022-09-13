import { GlobalAlertService } from './../global-alert.service';
import { GlobalEventService } from './global.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {

  constructor(
    public globalEventService: GlobalEventService,
    public globalAlertService: GlobalAlertService
  ) {}
}
