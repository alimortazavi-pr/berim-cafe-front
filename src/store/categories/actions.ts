import { AppThunk } from "@/store";

//Actions of other store

//Reducer
import { categoriesReducer } from "@/store/categories";

//Actions from reducer
export const { setCategories, setSelectedCategory } = categoriesReducer.actions;

//Interfaces

//Tools
import api from "@/common/api";

//Actions from actions
export function getCategories(): AppThunk {
  return async (dispatch, getState) => {
    try {
      const res = await api.get(`/categories`);
      await dispatch(setCategories(res.data.categories));
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}
