import { UserLogin } from './../../../core/model/User';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input('type') current_type: 'login' | 'registration' = 'login';

  @Output('changeType') changeType = new EventEmitter<'login' | 'registration'>();
  @Output('login') login = new EventEmitter<UserLogin>();

  formLogin: FormGroup;

  get type () {
    return this.current_type;
  }

  set type (current_type: 'login' | 'registration') {
    this.changeType.emit(current_type);
    this.current_type = current_type;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.formLogin = formBuilder.group({
      email: [],
      password: []
    });

  }

  ngOnInit() {}

  startLogin() {
    const { password, email } = this.formLogin.value;

    if ( !password || !email ) {
      throw new Error('Email ou senha não podem ser nulos.')
    } else {
      this.login.emit({password, email});
    }
  }

}
