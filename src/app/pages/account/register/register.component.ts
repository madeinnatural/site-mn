import { UserRegister } from './../../../core/model/User';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  promo = false;

  @Input('type') current_type: 'login' | 'registration' = 'login';

  @Output('changeType') changeType = new EventEmitter<'login' | 'registration'>();
  @Output('register') register = new EventEmitter<UserRegister>();

  get type () {
    return this.current_type;
  }

  set type (current_type: 'login' | 'registration') {
    this.changeType.emit(current_type);
    this.current_type = current_type;
  }

  formCadastro: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formCadastro = formBuilder.group({
      name: [],
      lastname: [],
      email: [],
      cpf_cnpj: [],
      phone: [],
      password: [],
      promo_active: [false],
    });
  }

  ngOnInit() {
  }

  submit() {
    if (!this.formCadastro) {
      throw new Error ('Dados de cadastro precisam ser preenchidos.');
    } else {
      const { name , lastname , email , cpf_cnpj , phone , password , promo_active } = this.formCadastro.value;

      this.register.emit({ name , email , cpf_cnpj , phone , password , promo_active , lastname })
    }
  }

}
