import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  didTryAutoLoginSelector,
  isAuthSelector,
} from "@/store/auth/selectors";
import { autoLogin } from "@/store/auth/actions";

//Components
import NavBar from "./layouts/NavBar";

//Tools
import Cookies from "js-cookie";

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => {
  //Redux
  const dispatch = useAppDispatch();
  const didTryAutoLogin = useAppSelector(didTryAutoLoginSelector);
  const isAuth = useAppSelector(isAuthSelector);

  //Next
  const router = useRouter();

  //Effects
  useEffect(() => {
    autoLoginFunc();
  }, [dispatch, didTryAutoLogin]);

  //Functions
  async function autoLoginFunc() {
    const userAuthorization = Cookies.get("userAuthorization");
    if (userAuthorization && !didTryAutoLogin) {
      const transformedData = JSON.parse(userAuthorization);
      try {
        await dispatch(autoLogin(transformedData.token));
      } catch (err: any) {
        console.log(err);
      }
    }
  }

  return <div className="w-screen">{children}</div>;
};

export default GlobalLayout;
