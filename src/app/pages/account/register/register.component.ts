import { MnInputComponent } from './../../../components/input/input.component';
import { Router } from '@angular/router';
import { GlobalEventService } from './../../../core/global/global.service';
import { AccountService } from './../../../core/account/account.service';
import { UserRegister } from './../../../core/model/User';
import { Component,Input,OnInit,Output,EventEmitter,ViewChild,} from '@angular/core';
import { Submitable } from 'src/app/components/mn-form/mn-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  @Input('type') current_type: 'login' | 'registration' = 'login';
  @Output('changeType') changeType = new EventEmitter<'login' | 'registration'>();
  @Output('register') register = new EventEmitter<UserRegister>();


  get type() {return this.current_type;}
  set type(current_type: 'login' | 'registration') {
    this.changeType.emit(current_type);
    this.current_type = current_type;
  }

  @ViewChild('form') form: any;
  @ViewChild('email') email?: MnInputComponent;

  formRegister: UserRegister = {
    name:'',
    email:'',
    cpf_cnpj: '',
    phone:'',
    password:'',
    password_confirmat:''
  }

  constructor(
    private accountService: AccountService,
    private globalEventService: GlobalEventService,
    private router: Router
  ) {}

  submit: Submitable = {
    submit: async () => {
      return new Promise((ok, reject) => {
          this.accountService.reginterUser(this.formRegister)
            .subscribe({
              next: (res: any) => {
                this.accountService.logout();
                this.globalEventService.setDataUser(res);
                ok(this.router.navigate(['/']));
              },
              error: (rej: any) => {
                const {errors} = rej.error;
                errors.forEach((element: any) => {if (element.path == 'email') this.email?.postInvalidade(element.message)});
                reject(true);
              },
            });
          return true;
      });
    },
  };
}

