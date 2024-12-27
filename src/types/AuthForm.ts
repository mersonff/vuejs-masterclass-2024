export interface RegisterForm extends LoginForm {
  confirmPassword: string
  username: string
  firstName: string
  lastName: string
}

export interface LoginForm {
  email: string
  password: string
}
