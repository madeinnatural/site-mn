import { UserRegister } from './../../../../core/model/User';
import { MnFormComponent } from './../../../../components/mn-form/mn-form.component';
import { HttpClient } from '@angular/common/http';
import { GlobalEventService } from 'src/app/core/global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import User from 'src/app/core/model/User';
import { Submitable } from 'src/app/components/mn-form/mn-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import {environment} from '../../../../../environments/environment';

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
      return new Promise((resolve, reject) => {
        const password = this.form?.inputs[0].value;
        const passwordConfirm = this.form?.inputs[1].value;
        console.log(password, passwordConfirm);

        try {
          if (!password) throw new Error('Senha não informada');
          if (!passwordConfirm) throw new Error('Confirmação de senha não informada');
          if (password != passwordConfirm) throw new Error('Senhas não conferem');

          this.httpClient.post<{user: UserRegister, auth_token: string}>(`${environment.baseUrl}/users/recovery`, { password }).subscribe((data) => {

            this.globalEventService.goAlert.emit({
              type: 'success',
              text: 'Senha alterada com sucesso',
              duration: 5000
            });

            this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, data.auth_token);
            this.cookieService.setItem(this.globalEventService.CURRENT_USER_COOKIE, JSON.stringify(data.user));

            this.router.navigate(['/account/login']);
            resolve(true);
          });

          resolve(true);
        } catch (error) {
          this.globalEventService.goAlert.emit({
            type: 'success',
            text: (error as any).message,
            duration: 5000
          });
          reject(true);
        }


      });
    }
  }

}
