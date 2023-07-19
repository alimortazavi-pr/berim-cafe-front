import { Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { KeyboardEvent, useEffect, useState } from "react";

//Tools
import { SearchNormal1 } from "iconsax-react";

const SearchInputNav = () => {
  //Next
  const router = useRouter();

  //States
  const [search, setSearch] = useState<string>("");

  //Effects
  useEffect(() => {
    if (router.query.search) {
      setSearch(router.query.search as string);
    } else if (!router.query.search && search) {
      setSearch(router.query.search as string);
    }
  }, [router.query.search]);

  //Functions
  function keyHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (!search) {
        router.push(
          `/${router.query.username}/menu${
            router.query.category ? `?category=${router.query.category}` : ""
          }`
        );
      } else {
        router.push(
          `/${router.query.username}/menu?search=${search}${
            router.query.category ? `&category=${router.query.category}` : ""
          }`
        );
      }
    }
  }

  return (
    <div className="hidden lg:block lg:w-[350px] xl:w-[500px]">
      <Input
        contentLeftStyling={false}
        className="!leading-none"
        placeholder="جستجو ... مثلا : اسپرسو"
        contentLeft={
          <div className="pr-3">
            <SearchNormal1 className="w-5 h-fit text-zinc-400" />
          </div>
        }
        width="100%"
        size="lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={keyHandler}
      />
    </div>
  );
};

export default SearchInputNav;
