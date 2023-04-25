import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Submitable } from 'src/app/components/mn-form/mn-form.component';
import { Store } from '@ngrx/store';
import { AccountModel, AddressModel } from 'src/app/core/domain/model/account/account';
import { map } from 'rxjs';
import { updatePersonalInformation, updatePersonalLogin } from 'src/app/states-handler/store/account.store';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent {

  welcomeName: string = '';

  personalInfo = {
    name: '',
    phone: '',
    cpfCnpj: '',
  }

  persinalLogin = {
    email: '',
    password: '',
  }

  address: AddressModel[] = [];

  account$ = this.store.select('account').pipe(
    map((account: AccountModel) => {
      this.welcomeName = account.name;
      this.personalInfo = {
        name: account.name,
        phone: account.phone,
        cpfCnpj: account.cpfCnpj,
      }
      this.persinalLogin = {
        email: account.email,
        password: account.password,
      }
      console.log(account);
      if (account.address) this.address = account.address;
      return account;
    })
  )

  address$ = this.store.select('address');
  constructor(
    public router: Router,
    public store: Store<{ account: AccountModel, address: AddressModel}>
  ) {}

  password = '';
  password_confirmation = '';
  passwordMatchValidator() {
    return this.password == this.password_confirmation;
  }

  changePersonalInfo(event: any, taget: 'name' | 'phone' | 'cpfCnpj') {
    this.personalInfo[taget] = event.target.value;
  }

  changePersonalLogin(event: any, taget: 'email' | 'password') {
    this.persinalLogin[taget] = event.target.value;
  }

  changePersonalAddress(event: any, index: number, taget: 'street' | 'number' | 'district' | 'city' | 'state' | 'zipCode' ) {
    this.address[index][taget] = event.target.value;
  }

  updateDataAddress: Submitable = {
    submit: () => {
      return new Promise(async (resolve, reject) => {
        resolve(true);
      })
    }
  }

  updateDataPesonal: Submitable = {
    submit: async () => {
      return new Promise(async (resolve, reject) => {
        this.store.dispatch(updatePersonalInformation({payload: this.personalInfo }))
        resolve(true);
      });
    }
  }

  updateDataLogin: Submitable = {
    submit: async () => {
      return new Promise(async (resolve, reject) => {
        this.store.dispatch(updatePersonalLogin({ payload: this.persinalLogin }))
        resolve(true);
      });
    }
  }

}
