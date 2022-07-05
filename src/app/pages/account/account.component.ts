import { AccountService } from './../../core/account/account.service';
import { LoginService } from './../../core/account/login.service';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserLogin } from 'src/app/core/model/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  typeAccount: 'login' | 'cadastro' = 'login';
  promo = false;

  formCadastro: FormGroup;
  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: LoginService,
    private accountService: AccountService
  ) {
    this.formCadastro = formBuilder.group({
      name: [],
      email: [],
      cnpj: [],
      phone: [],
      senha: [],
    });

    this.formLogin = formBuilder.group({
      email: [],
      password: []
    });

    accountService.loginActiver(true);

  }

  ngOnInit(): void {
  }

  submit(event?: any) {
  }

  login() {
    this.authService.loginUser(this.formLogin.value)
  }

  ngOnDestroy() {
    this.accountService.loginActiver(false);
  }


}
