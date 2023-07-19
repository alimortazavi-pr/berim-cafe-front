import { PayloadAction } from "@reduxjs/toolkit";

//Interfaces
import {
  ICafesState,
  ICafe,
} from "@/common/interfaces/cafes.interface";

//Tools

const reducers = {
  setCafes: (
    state: ICafesState,
    action: PayloadAction<ICafe[]>
  ): ICafesState => {
    return {
      ...state,
      cafes: [...action.payload],
    };
  },
  setSelectedCafe: (
    state: ICafesState,
    action: PayloadAction<ICafe | undefined>
  ): ICafesState => {
    return {
      ...state,
      selectedCafe: action.payload,
    };
  },
};

export default reducers;
