import { Dispatch, SetStateAction } from "react";
import { ICafe } from "../interfaces/cafes.interface";

export type cafeProps = {
  cafe: ICafe;
};

export type singleImageProps = {
  image: string;
};

export type cafeInformationModalProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
  cafe: ICafe;
};

export type cafeInformationProps = {
  cafe: ICafe;
};
