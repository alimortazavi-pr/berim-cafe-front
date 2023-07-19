import { RootState } from "@/store/index";

//Interfaces
import { ICafe } from "@/common/interfaces/cafes.interface";

export function cafesSelector(state: RootState): ICafe[] {
  return state.cafes.cafes;
}

export function selectedCafeSelector(
  state: RootState
): ICafe | undefined {
  return state.cafes.selectedCafe;
}
