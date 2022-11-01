export default class User {
  constructor(
    public id: number,
    public cnpj: string,
    public email: string,
    public phone: string,
    public name: string,
    public adresses_main: string,
    public adresses: string,
    public password?: string,
    public cpf?: string,
  ) {}
}

export interface UserLogin {
  email: string,
  password: string,
}

export interface UserRegister {
  email: string,
  name: string ,
  cpf_cnpj: string,
  phone: string,
  password: string,
  password_confirmat: string
  promo_active?: boolean
}

export interface RegisterResponse {
  user: User,
  auth_token: string
}
