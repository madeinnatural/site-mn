import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Submitable } from '../../../components/mn-form/mn-form.component';
import { PayloadLogin, PayloadPersonal } from '../../../states-handler/store/account.store';
import { AccountModel, AddressModel } from '../../../core/domain/model/account/account';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent {

  welcomeName: string = '';

  personalInfo: PayloadPersonal = {
    name: '',
    phone: '',
    cpfCnpj: '',
  }
  persinalLogin: PayloadLogin = {
    email: '',
    password: '',
  }

  address: AddressModel[] = [{
    street: '',
    number: '',
    city: '',
    district: '',
    state: '',
    zipCode: ''
  }];

  addressUpdated: AddressModel = {
    street: '',
    number: '',
    city: '',
    district: '',
    state: '',
    zipCode: ''
  }

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
      if (account.address) this.address = account.address;
      return account;
    })
  )
  constructor(
    public store: Store<{ account: AccountModel, address: AddressModel}>,
    public profileService: ProfileService
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
    submit: async () =>  {
      return await this.profileService.updateAddress({
        dataAddress: this.addressUpdated,
      });
    }
  }

  updateDataPesonal: Submitable = {
    submit: async () => {
      if(!this.personalInfo) return Promise.resolve(false);
      return await this.profileService.updatePersonalInformation(this.personalInfo);
    }
  }

  updateDataLogin: Submitable = {
    submit: async () => {
      if(!this.persinalLogin) return Promise.resolve(false);
      return await this.profileService.updateLoginInformation(this.persinalLogin);
    }
  }

}
