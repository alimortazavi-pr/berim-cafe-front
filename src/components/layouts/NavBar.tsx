import { FC } from "react";
import { Button, Dropdown, useModal } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//Types
import { navBarProps } from "@/common/types/layouts.type";
import { ICafe } from "@/common/interfaces/cafes.interface";

//Redux
// import { logOut } from "@/store/auth/actions";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { isAuthSelector } from "@/store/auth/selectors";

//Components
import CafeInformationModal from "../cafes/CafeInformationModal";
import SearchInputNav from "./SearchInputNav";
// import GetMobileModal from "../auth/GetMobileModal";
import NoteBookModal from "../menu/NoteBookModal";

//Tools
import cafeLogoImg from "@/assets/images/cafe-logo.png";
import { MenuIconSvg } from "./TheSvgs";
import {
  Building,
  Home,
  LoginCurve,
  LogoutCurve,
  MenuBoard,
  Stickynote,
  User,
} from "iconsax-react";

const NavBar: FC<navBarProps> = ({ title, cafe }) => {
  //Redux
  // const dispatch = useAppDispatch();
  // const isAuth = useAppSelector(isAuthSelector);

  //Next
  const router = useRouter();

  //NextUI
  const {
    setVisible: setVisibleCafeInformationModal,
    bindings: bindingsCafeInformationModal,
  } = useModal();
  // const {
  //   setVisible: setVisibleGetMobileModal,
  //   bindings: bindingsGetMobileModal,
  // } = useModal();
  const {
    setVisible: setVisibleNoteBookModal,
    bindings: bindingsNoteBookModal,
  } = useModal();

  //Functions
  // async function logOutFunc() {
  //   await dispatch(logOut());
  // }

  return (
    <nav className={`w-full rounded-b-lg duration-1000`}>
      <div className="flex items-center justify-between gap-1 py-5 lg:pb-10 px-3">
        <div className="flex items-center lg:gap-3">
          <div className="text-zinc-800 font-bold text-3xl md:text-4xl !leading-none">
            <span className="leading-none">{title}</span>
          </div>
        </div>
        {router.pathname == "/[username]" ? null : <SearchInputNav />}
        {router.pathname == "/[username]" ? null : (
          <div className="flex items-center gap-3">
            <Button
              auto
              color="default"
              ghost
              className="hidden lg:block"
              icon={<Stickynote className={"w-6 h-6"} />}
              onClick={() => setVisibleNoteBookModal(true)}
            />
            <Dropdown placement="bottom-left">
              <Dropdown.Trigger>
                <Button
                  auto
                  color="secondary"
                  ghost
                  className="hidden lg:block"
                  icon={
                    <div className="w-6 h-6">
                      <MenuIconSvg className={""} filled />
                    </div>
                  }
                />
              </Dropdown.Trigger>
              <Dropdown.Menu color="secondary" aria-label="Navbar Actions">
                <Dropdown.Item
                  css={{ py: "20px", my: "5px" }}
                  className=""
                  key="home"
                >
                  <Link
                    href={"/"}
                    className="flex items-end gap-1 text-gray-800 font-medium"
                  >
                    <Home className="w-5 h-5" variant={"Bulk"} />
                    <span className="leading-none">خانه</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  css={{ py: "20px", my: "5px" }}
                  className=""
                  key="menu"
                >
                  <Link
                    href={`/${router.query.username}/menu`}
                    className="flex items-end gap-1 text-gray-800 font-medium"
                  >
                    <MenuBoard className="w-5 h-5" variant={"Bulk"} />
                    <span className="leading-none">منو</span>
                  </Link>
                </Dropdown.Item>
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
                    <User className="w-5 h-5" variant={"Bulk"} />
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
                    <LoginCurve className="w-5 h-5" variant={"Bulk"} />
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
                    <Building className="w-5 h-5" variant={"Bulk"} />
                    <span className="leading-none">
                      ورود به بخش مدیریت کافه
                    </span>
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
                  <LogoutCurve className="w-5 h-5" variant={"Bulk"} />
                  <span className="leading-none">خروج از حساب کاربری</span>
                </div>
              </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
            <div
              className="w-11 md:w-14 h-11 md:h-14 rounded-full border border-violet-300 relative cursor-pointer"
              onClick={() => setVisibleCafeInformationModal(true)}
            >
              {cafe?.logo ? (
                <Image
                  src={`http://localhost:7777/${cafe.logo}`}
                  alt=""
                  fill
                  className="rounded-full object-cover object-center"
                />
              ) : (
                <Image
                  src={cafeLogoImg}
                  alt=""
                  fill
                  className="rounded-full object-cover object-center"
                />
              )}
            </div>
          </div>
        )}
      </div>
      {cafe ? (
        <CafeInformationModal
          bindings={bindingsCafeInformationModal}
          setVisible={setVisibleCafeInformationModal}
          cafe={cafe}
        />
      ) : null}
      {/* <GetMobileModal
        setVisible={setVisibleGetMobileModal}
        bindings={bindingsGetMobileModal}
      /> */}
      <NoteBookModal
        setVisible={setVisibleNoteBookModal}
        bindings={bindingsNoteBookModal}
        cafe={cafe as ICafe}
      />
    </nav>
  );
};

export default NavBar;
