import { Injectable } from "@angular/core";
import { ServerService } from "./server.service";
import { PayloadLogin, PayloadPersonal } from "src/app/states-handler/store/account.store";
import { AddressModel } from "../domain/model/account/account";
import { ToastService } from "./toast.service";

@Injectable({providedIn: 'root'})
export class ProfileService {
  constructor(
    private server: ServerService,
    private toast: ToastService

    ) {}

  updatePersonalInformation(data: PayloadPersonal) {
    return new Promise((resolve, reject) => {
      this.server.submit('update-personal-information', data, { type: 'POST' })
      .then((res: any) => {
        this.toast.openSnackBar('Dados atualizados com sucesso!', 'success-snackbar');
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      })
    });
  }

  updateAddress(data: {
    dataAddress: AddressModel
  }) {
    return this.server.submit('update-address', data, { type: 'POST' });
  }

  updateLoginInformation(data: PayloadLogin) {
    return new Promise((resolve, reject) => {
      this.server.submit('update-personal-login', data, { type: 'POST' })
      .then((res: any) => {
        this.toast.openSnackBar('Dados atualizados com sucesso!', 'success-snackbar');
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      })
    });
  }

}
