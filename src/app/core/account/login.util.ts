// DADOS RETORNADOS PELO LOGIN
export type LoginResponse = {
  auth_token: string;
  id: number;
  facebook_id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  menu_avatar: string;
  profile_avatar: string;
  cpf: string;
  phone: string;
  birthdate: string;
  purchase_tax: number;
  has_notification: boolean;
  know: number;
}

export enum LoginStatus {
 ok = 'ok',
 loginError = 'login',
 passwordError = 'senha',
 error = 'error',
 noPasswordError = "sem_senha"
}
