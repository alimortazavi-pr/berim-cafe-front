import { AppThunk } from "@/store";

//Actions of other store

//Reducer
import { reservationsReducer } from "@/store/reservations";

//Actions from reducer
export const { setReservations } = reservationsReducer.actions;

//Interfaces

//Tools
import api from "@/common/api";

//Actions from actions
export function getReservations(): AppThunk {
  return async (dispatch, getState) => {
    try {
      const res = await api.get(`/reservations`);
      await dispatch(setReservations(res.data.reservations));
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}
