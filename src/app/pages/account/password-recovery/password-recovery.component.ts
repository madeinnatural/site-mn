import { AlertoInterface } from './../../../core/model/Alert';
import { GlobalEventService } from 'src/app/core/global/global.service';
import { GlobalAlertService } from './../../../core/global-alert.service';
import { AccountService } from './../../../core/account/account.service';
import { ServerService } from './../../../core/server/server.service';
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

  constructor(
    public router: Router,
    public global: GlobalEventService,
  ) { }


  onSubmit: Submitable = {
    submit: () => {
      return new Promise( async (resolve, reject) => {
        try {
          const email = this.form?.inputs[0].value;
          await this.router.navigate(['/password-recovery/send'], { queryParams: { email } });
          resolve(true);
        } catch (error) {

          const msg: AlertoInterface = {
              type: 'danger',
              text: 'Erro ao enviar email de recuperação de senha',
              duration: 5000
          }

          this.global.goAlert.emit(msg);

          reject(true);
        }
      });
    }
  }

}
