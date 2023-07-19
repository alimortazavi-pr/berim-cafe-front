import { AppThunk } from "@/store";

//Actions of other store

//Reducer
import { cafesReducer } from "@/store/cafes";

//Actions from reducer
export const { setCafes, setSelectedCafe } = cafesReducer.actions;

//Interfaces

//Tools
import api from "@/common/api";

//Actions from actions
export function getCafes(): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth && getState().auth.didTryAutoLogin) {
        const res = await api.get(`/cafes`, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setCafes(res.data.cafes));
      } else if (!getState().auth.isAuth && getState().auth.didTryAutoLogin) {
        const res = await api.get(`/cafes`);
        await dispatch(setCafes(res.data.cafes));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}
