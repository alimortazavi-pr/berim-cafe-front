import { PayloadAction } from "@reduxjs/toolkit";

//Interfaces
import { IProfile, IProfileState } from "@/common/interfaces/profile.interface";

//Tools

const reducers = {
  setProfile: (
    state: IProfileState,
    action: PayloadAction<IProfile>
  ): IProfileState => {
    return {
      ...state,
      user: {
        ...action.payload,
      },
    };
  },
};

export default reducers;
