export default class User {
  constructor(
    public cnpj: string,
    public email: string,
    public phone: string,
    public name?: string,
  ) {}
}

export interface UserLogin {
    email: string,
    password: string,
}
