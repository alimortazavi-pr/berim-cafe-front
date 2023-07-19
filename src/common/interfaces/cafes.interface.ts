import { cafeStatusEnum } from "../enums/cafe-status.enum";

export interface ICafesState {
  cafes: ICafe[];
  selectedCafe?: ICafe;
}

export interface ICafe {
  _id?: string;
  ownerName: string;
  name: string;
  authMobile: string;
  province: string;
  city: string;
  logo?: string;
  phones: string[];
  workingHours: ISingleWorkingHour[];
  address: string;
  about: string;
  location: [number, number];
  rate: number;
  hasVipRoom: boolean;
  notification: boolean;
  status: cafeStatusEnum;
  images: string[];
  token?: string;
}

export interface ISingleWorkingHour {
  from: string;
  to: string;
}
