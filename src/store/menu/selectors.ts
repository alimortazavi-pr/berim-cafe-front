import { RootState } from "@/store/index";

//Interfaces
import { IItem } from "@/common/interfaces/menu.interface";

export function itemsSelector(state: RootState): IItem[] {
  return state.menu.items;
}

export function noteItemsSelector(state: RootState): IItem[] {
  return state.menu.noteBookItems;
}

export function noteItemsIdsSelector(state: RootState): string[] {
  return state.menu.noteBookItemsIds;
}
