
export interface AddressModel {
  id: string
  cep: string
  street: string
  number: string
  city: string
  state: string
}

export interface AccountModel {
  id: string
  name: string
  email: string
  password: string
  phone: string
  cpfCnpj: string
  accessToken?: string
  role?: string
  passwordResetToken?: string
  passwordResetExpires?: Date
}
