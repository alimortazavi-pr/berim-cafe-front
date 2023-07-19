import { Dispatch, SetStateAction } from "react";
import { ICafe } from "../interfaces/cafes.interface";
import { ICategory } from "../interfaces/categories.interface";
import { IItem } from "../interfaces/menu.interface";

export type menuProps = {
  categories: ICategory[];
  cafe: ICafe;
};

export type noteBookModalProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
  cafe: ICafe;
};

export type itemsListProps = {
  categories: ICategory[];
  cafe: ICafe;
};

export type singleItemProps = {
  cafe: ICafe;
  item: IItem;
};
