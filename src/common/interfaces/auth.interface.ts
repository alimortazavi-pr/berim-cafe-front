export interface IAuthState {
  token: null | string;
  didTryAutoLogin: boolean;
  isAuth: boolean;
}

export interface IGetMobileFrom {
  mobile: string;
}

export interface ISignUpForm {
  firstName: string;
  lastName: string;
  mobile: string | number;
  code: string;
}

export interface ISignInForm {
  mobile: string;
  code: string;
}

export interface IRequestCodeForm {
  mobile: string;
}
