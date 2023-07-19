import { tailwindColorsType } from "../types/layouts.type";
import { IItem } from "./menu.interface";

export interface ICategoriesState {
  categories: ICategory[];
  selectedCategory?: ICategory;
}

export interface ICategory {
  _id?: string;
  cafe: string;
  title: string;
  color: tailwindColorsType;
  icon: string;
  deleted: boolean;
  items: IItem[];
}
