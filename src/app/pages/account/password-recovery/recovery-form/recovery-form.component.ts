import User from 'src/app/core/model/User';
import { Submitable } from 'src/app/components/mn-form/mn-form.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
  styleUrls: ['./recovery-form.component.scss']
})
export class RecoveryFormComponent {

  user?: User;

  constructor() { }

  onSubmit: Submitable = {
    submit: () => {
      return new Promise((resolve, reject) => {
        console.log('submit');
        resolve(true);
      });
    }
  }

}
