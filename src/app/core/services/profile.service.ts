import { Injectable } from "@angular/core";
import { ServerService } from "./server.service";
import { PayloadLogin, PayloadPersonal } from "src/app/states-handler/store/account.store";
import { AddressModel } from "../domain/model/account/account";

@Injectable({providedIn: 'root'})
export class ProfileService {
  constructor(private server: ServerService ) {}

  updatePersonalInformation(data: PayloadPersonal) {
    return this.server.submit('update-personal-information', data, { type: 'POST' });
  }

  updateAddress(data: {
    dataAddress: AddressModel
  }) {
    return this.server.submit('update-address', data, { type: 'POST' });
  }

  updateLoginInformation(data: PayloadLogin) {
    return this.server.submit('update-login-information', data, { type: 'POST' });
  }

}
