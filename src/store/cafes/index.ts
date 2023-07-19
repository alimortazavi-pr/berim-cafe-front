import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { ICafesState } from "@/common/interfaces/cafes.interface";

//Reducers
import reducers from "@/store/cafes/reducers";

const initialState: ICafesState = {
  cafes: [],
  selectedCafe: undefined,
};

export const cafesReducer = createSlice({
  name: "cafes",
  initialState,
  reducers,
});

export default cafesReducer.reducer;
