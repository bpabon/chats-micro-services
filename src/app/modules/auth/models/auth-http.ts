export interface AuthHttp {
}
export interface LoginHttp{
  email: string,
  password: string
}
export interface SuccessRegisterInterface{
  msg: string
}
export interface SuccessLoginInterface{
  msg: string,
  token: string
}

