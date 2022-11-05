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
  cpf: string,
  cnpj: string,
  email: string,
  name: string,
  phone: string,
  password: string,
  promo_active?: boolean
}

export interface RegisterResponse {
  user: User,
  auth_token: string
}
