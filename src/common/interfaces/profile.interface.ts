export interface IProfileState {
  user?: IProfile;
}

export interface IProfile {
  _id?: string;
  firstName: string;
  lastName: string;
  mobile: string;
  province: string;
  city: string;
  location: [number, number];
  token?: string;
  deleted: boolean;
}

export interface IEditProfileForm {
  firstName: string;
  lastName: string;
  province: string;
  city: string;
}

export interface IChangeMobileForm {
  mobile: string;
  code: string;
}

export interface IChangeLocationForm {
  location: [number, number];
}
