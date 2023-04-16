import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Submitable } from 'src/app/components/mn-form/mn-form.component';
import { Store } from '@ngrx/store';
import { AccountModel, AddressModel } from 'src/app/core/domain/model/account/account';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent {

  welcomeName: string = '';

  account$ = this.store.select('account').pipe(
    map((account: AccountModel) => {
      this.welcomeName = account.name;
      return account;
    })
  )
  address$ = this.store.select('address');
  constructor(
    public router: Router,
    public store: Store<{account: AccountModel, address: AddressModel}>
  ) {}

  password = '';
  password_confirmation = '';
  passwordMatchValidator() {
    return this.password == this.password_confirmation;
  }

  updateDataAddress: Submitable = {
    submit: () => {
      return new Promise(async (resolve, reject) => {

      });
    }
  }

  updateDataPesonal: Submitable = {
    submit: async () => {

    }
  }

  updateDataLogin: Submitable = {
    submit: async () => {

    }
  }

}
