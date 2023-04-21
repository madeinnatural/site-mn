import { ToastService } from 'src/app/core/services/toast.service';
import { AccountService } from './../../../core/account/account.service';
import { Submitable, MnFormComponent } from './../../../components/mn-form/mn-form.component';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {

  @ViewChild('form') form?: MnFormComponent;
  success;
  email?: string;
  constructor(
    public router         :Router,
    public accountService :AccountService,
    public toast          :ToastService,
  ) {
    this.success = false;
  }

  onSubmit: Submitable = {
    submit: () => {
      return new Promise( async (resolve, reject) => {
        this.email =  this.form?.inputs[0].value;
        if (!this.email) {
          this.toast.openSnackBar('Email não informado', 'error-snackbar');
          resolve(false);
          return;
        }
        this.accountService.recoveryPassword(this.email).subscribe({
          next: (data) => {
            let message = 'Erro ao enviar email de recuperação de senha';
            if (data) message = 'Email de recuperação de senha enviado com sucesso';
            this.toast.openSnackBar(message, data ? 'success-snackbar' : 'error-snackbar')
            this.router.parseUrl('/success');
          },
          error: (error) => {
            this.success
          },
          complete: () => { }
        });
        this.success = true;
        resolve(true);
      });
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

}
