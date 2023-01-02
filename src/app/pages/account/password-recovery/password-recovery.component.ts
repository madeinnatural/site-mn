import { AlertoInterface } from './../../../core/model/interfaces/Alert';
import { GlobalEventService } from 'src/app/core/services/global.service';
import { GlobalAlertService } from './../../../core/global-alert.service';
import { AccountService } from './../../../core/account/account.service';
import { ServerService } from '../../../core/services/server.service';
import { Submitable, MnFormComponent } from './../../../components/mn-form/mn-form.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {
  @ViewChild('form') form?: MnFormComponent;

  success = false;

  constructor(
    public router: Router,
    public global: GlobalEventService,
    public server: ServerService
  ) { }


  onSubmit: Submitable = {
    submit: () => {
      return new Promise( async (resolve, reject) => {
        try {
          const email = this.form?.inputs[0].value;

          if (!email) throw new Error('Email não informado');

          await this.server.recoveryPassword(email);

          this.success = true;

          resolve(true);
        } catch (error) {
          let message = 'Erro ao enviar email de recuperação de senha';
          if ((error as any).message) message = (error as any).message;
          const msg: AlertoInterface = {
              type:  'success',
              text: message,
              duration: 5000
          }

          this.global.goAlert.emit(msg);

          reject(true);
        }
      });
    }
  }

}
