import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { IProfileState } from "@/common/interfaces/profile.interface";

//Reducers
import reducers from "@/store/profile/reducers";

const initialState: IProfileState = {
  user: undefined,
};

export const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers,
});

export default profileReducer.reducer;
