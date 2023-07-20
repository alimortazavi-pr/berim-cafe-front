import { useRouter } from "next/router";
import { FC } from "react";
import Link from "next/link";
import { Dropdown, useModal } from "@nextui-org/react";

//Types
import { tabBarProps } from "@/common/types/layouts.type";

//Redux
// import { logOut } from "@/store/auth/actions";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { isAuthSelector } from "@/store/auth/selectors";

//Components
// import GetMobileModal from "../auth/GetMobileModal";

//Tools
import {
  Building,
  Home,
  LoginCurve,
  LogoutCurve,
  Menu,
  MenuBoard,
  Stickynote,
  User,
} from "iconsax-react";
import NoteBookModal from "../menu/NoteBookModal";

const TabBar: FC<tabBarProps> = ({ cafe }) => {
  //Redux
  // const dispatch = useAppDispatch();
  // const isAuth = useAppSelector(isAuthSelector);

  //Next
  const router = useRouter();

  //NextUI
  const {
    setVisible: setVisibleGetMobileModal,
    bindings: bindingsGetMobileModal,
  } = useModal();
  const {
    setVisible: setVisibleNoteBookModal,
    bindings: bindingsNoteBookModal,
  } = useModal();

  //Functions
  // async function logOutFunc() {
  //   await dispatch(logOut());
  // }

  return (
    <div className="fixed bottom-0 left-0 w-screen flex justify-center lg:hidden">
      <div className="w-full md:w-8/12 flex justify-around items-center bg-white shadow rounded-t-3xl py-3">
        <Link
          href={"/"}
          className={`${
            router.pathname === "/" ? "text-violet-600" : "text-zinc-400"
          } flex flex-col items-center gap-1`}
        >
          <Home
            className="w-7 h-fit"
            variant={router.pathname === "/" ? "Bulk" : "Linear"}
          />
          <span className="text-sm leading-none">خانه</span>
        </Link>
        <Link
          href={`/${router.query.username}/menu`}
          className={`${
            router.pathname.includes("menu")
              ? "text-violet-600"
              : "text-zinc-400"
          } flex flex-col items-center gap-1`}
        >
          <MenuBoard
            className="w-7 h-fit"
            variant={router.pathname.includes("menu") ? "Bulk" : "Linear"}
          />
          <span className="text-sm leading-none">منو</span>
        </Link>
        <div
          className={`text-zinc-400 flex flex-col items-center gap-1 cursor-pointer`}
          onClick={() => setVisibleNoteBookModal(true)}
        >
          <Stickynote className="w-7 h-fit" />
          <span className="text-sm leading-none">دفترچه</span>
        </div>
        <Dropdown placement="top-left">
          <Dropdown.Trigger>
            <div className={`text-zinc-400 flex flex-col items-center gap-1 cursor-pointer`}>
              <Menu className="w-7 h-fit" />
              <span className="text-sm leading-none">بیشتر</span>
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu color="secondary" aria-label="TabBar Actions">
            {/* {isAuth ? (
              <Dropdown.Item
                css={{ py: "20px", my: "5px" }}
                className=""
                key="profile"
              >
                <Link
                  href={`/profile`}
                  className="flex items-end gap-1 text-gray-800 font-medium"
                >
                  <User className="w-5 h-fit" variant={"Bulk"} />
                  <span className="leading-none">پروفایل من</span>
                </Link>
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                css={{ py: "20px", my: "5px" }}
                className=""
                key="user_auth"
              >
                <div
                  className="flex items-end gap-1 text-gray-800 font-medium"
                  onClick={() => {
                    setVisibleGetMobileModal(true);
                  }}
                >
                  <LoginCurve className="w-5 h-fit" variant={"Bulk"} />
                  <span className="leading-none">ثبت‌نام | ورود </span>
                </div>
              </Dropdown.Item>
            )} */}

            <Dropdown.Item
              css={{ py: "20px", my: "5px" }}
              className=""
              key="cafe_auth"
            >
              <a
                target="_blank"
                href="https://panel.berimcafe.org"
                className="flex items-end gap-1 text-gray-800 font-medium"
              >
                <Building className="w-5 h-fit" variant={"Bulk"} />
                <span className="leading-none">ورود به بخش مدیریت کافه</span>
              </a>
            </Dropdown.Item>
            {/* <Dropdown.Item
              css={{
                py: "20px",
                my: "5px",
                display: isAuth ? "flex" : "none",
              }}
              className=""
              key="logout"
              color="error"
            >
              <div
                className="flex items-end gap-1 text-red-600"
                onClick={logOutFunc}
              >
                <LogoutCurve className="w-5 h-fit" variant={"Bulk"} />
                <span className="leading-none">خروج از حساب کاربری</span>
              </div>
            </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {/* <GetMobileModal
        setVisible={setVisibleGetMobileModal}
        bindings={bindingsGetMobileModal}
      /> */}
      <NoteBookModal
        setVisible={setVisibleNoteBookModal}
        bindings={bindingsNoteBookModal}
        cafe={cafe}
      />
    </div>
  );
};

export default TabBar;
