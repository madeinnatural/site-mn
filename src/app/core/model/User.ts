export default class User {
  constructor(
    public id: string,
    public cnpj: string,
    public email: string,
    public phone: string,
    public name: string,
    public adresses_main: string,
    public adresses: string,
  ) {}
}

export interface UserLogin {
    email: string,
    password: string,
}

export interface UserRegister {
   email: string,
   name: string ,
   lastname: string,
   cpf_cnpj: string,
   phone: string,
   password: string,
   promo_active: boolean
}
