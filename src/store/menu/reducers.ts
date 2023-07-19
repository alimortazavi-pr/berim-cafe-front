import { PayloadAction } from "@reduxjs/toolkit";

//Interfaces
import { IMenuState, IItem } from "@/common/interfaces/menu.interface";

//Tools

const reducers = {
  setItems: (state: IMenuState, action: PayloadAction<IItem[]>): IMenuState => {
    return {
      ...state,
      items: [...action.payload],
    };
  },
  addNoteBookItem: (
    state: IMenuState,
    action: PayloadAction<IItem>
  ): IMenuState => {
    return {
      ...state,
      noteBookItems: [...state.noteBookItems, action.payload],
    };
  },
  setNoteBookItemsIds: (
    state: IMenuState,
    action: PayloadAction<string[]>
  ): IMenuState => {
    return {
      ...state,
      noteBookItemsIds: [...action.payload],
    };
  },
};

export default reducers;
