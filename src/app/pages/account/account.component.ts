import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  typeAccount: 'login' | 'cadastro' = 'login';
  promo = false;

  formCadastro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formCadastro = formBuilder.group({
      name: [],
      email: [],
      cnpj: [],
      phone: [],
      senha: [],
    });
  }

  ngOnInit(): void {
  }

  submit(event?: any) {
    console.log('promo ', this.promo)
    console.log(this.formCadastro)
  }



}
