import { ServerService } from '../../../../core/services/server.service';
import { MnFormComponent } from './../../../../components/mn-form/mn-form.component';
import { HttpClient } from '@angular/common/http';
import { GlobalEventService } from 'src/app/core/services/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Submitable } from 'src/app/components/mn-form/mn-form.component';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { __asyncDelegator } from 'tslib';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
  styleUrls: ['./recovery-form.component.scss']
})
export class RecoveryFormComponent {

  @ViewChild('form') form?: MnFormComponent;
  token: any;

  constructor(
    public router: Router,
    public cookieService: CookieService,
    public globalEventService: GlobalEventService,
    public httpClient: HttpClient,
    public server: ServerService
  ) {
    const queryParams = this.router.getCurrentNavigation()?.extractedUrl.queryParams;
    if (queryParams) {
      const { token } = queryParams;
      this.token = token;
      this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, this.token);
    }
  }

  onSubmit: Submitable = {
    submit: () => {
      return new Promise(async (resolve, reject) => {
        const password = this.form?.inputs[0].value;
        const passwordConfirm = this.form?.inputs[1].value;

        if (!password) throw new Error('Senha não informada');
        if (!passwordConfirm) throw new Error('Confirmação de senha não informada');
        if (password != passwordConfirm) throw new Error('Senhas não conferem');

      });
    }
  }

}
