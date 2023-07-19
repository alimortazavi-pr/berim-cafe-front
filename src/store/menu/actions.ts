import { AppThunk } from "@/store";

//Actions of other store

//Reducer
import { menuReducer } from "@/store/menu";

//Actions from reducer
export const { setItems, addNoteBookItem, setNoteBookItemsIds } =
  menuReducer.actions;

//Interfaces

//Tools
import api from "@/common/api";

//Actions from actions
export function getAllItemsOfMenu(): AppThunk {
  return async (dispatch, getState) => {
    try {
      const res = await api.get(`/menu/items`);
      await dispatch(setItems(res.data.items));
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function getItemsOfCategory(categoryId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      const res = await api.get(`/menu/items-of-category/${categoryId}`);
      await dispatch(setItems(res.data.items));
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}
