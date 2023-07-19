import { ICategory } from "./categories.interface";

export interface IMenuState {
  items: IItem[];
  noteBookItems: IItem[];
  noteBookItemsIds: string[];
}

export interface IItem {
  _id?: string;
  cafe: string;
  category: ICategory;
  title: string;
  description?: string;
  price: string;
  thumbnailImage?: string;
  deleted: boolean;
}
