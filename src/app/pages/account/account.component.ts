import { LoginService } from './../../core/account/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserLogin } from 'src/app/core/model/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  typeAccount: 'login' | 'cadastro' = 'login';
  promo = false;

  formCadastro: FormGroup;
  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authServeice: LoginService,
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
  }

  ngOnInit(): void {
  }

  submit(event?: any) {
    console.log('promo ', this.promo)
    console.log(this.formCadastro)
  }

  login() {
    this.authServeice.loginUser(this.formLogin.value)
  }



}
