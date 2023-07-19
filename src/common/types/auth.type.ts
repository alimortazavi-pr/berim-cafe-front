import { Dispatch, SetStateAction } from "react";

export type getMobileModalProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
};

export type signUpAndSignInModalProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  setVisibleGetMobile: Dispatch<SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
  mobile: string;
  counter: {
    value: number;
    status: boolean;
  };
  requestCode: (mobile: string) => Promise<void>;
};
