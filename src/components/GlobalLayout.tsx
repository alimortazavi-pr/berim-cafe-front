import { FC, ReactNode, useEffect } from "react";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { didTryAutoLoginSelector } from "@/store/auth/selectors";
import { autoLogin } from "@/store/auth/actions";

//Components

//Tools
import Cookies from "js-cookie";

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => {
  //Redux
  const dispatch = useAppDispatch();
  const didTryAutoLogin = useAppSelector(didTryAutoLoginSelector);

  //Next

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
