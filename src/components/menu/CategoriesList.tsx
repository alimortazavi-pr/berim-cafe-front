import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//Types
import { categoriesListProps } from "@/common/types/categories.type";
import Image from "next/image";
import { bg300ColorsVariants } from "@/common/scripts/tailwindColorsList";

const CategoriesList: FC<categoriesListProps> = ({ categories }) => {
  //Next
  const router = useRouter();

  return (
    <div className="px-3 w-full mb-4 h-fit">
      <ul className="flex items-center lg:justify-center gap-2 md:gap-3 flex-nowrap overflow-x-auto pb-2 px-1">
        <li className="">
          <Link
            href={`/${router.query.username}/menu${
              router.query.search ? `?search=${router.query.search}` : ""
            }`}
            className="flex flex-col items-center justify-center"
          >
            <div
              className={`w-16 md:w-20 h-16 md:h-20 rounded-[20px] flex items-center justify-center mb-1 ${
                !router.query.category || router.query.category == undefined
                  ? "bg-violet-300"
                  : "bg-zinc-100"
              }`}
            >
              <div className="relative w-10 md:w-11 h-10 md:h-11">
                <Image
                  src={`https://berimcafe-icons.s3.ir-thr-at1.arvanstorage.ir/icons/grocery-bag.png`}
                  fill
                  alt=""
                  className=""
                />
              </div>
            </div>
            <div
              className={`font-medium text-sm md:text-base  ${
                !router.query.category || router.query.category == undefined
                  ? "text-zinc-800"
                  : "text-zinc-400"
              }`}
            >
              <span>همه</span>
            </div>
          </Link>
        </li>
        {categories?.map((category) => (
          <li key={category._id} className="">
            <Link
              href={`/${router.query.username}/menu?category=${category.title}${
                router.query.search ? `&search=${router.query.search}` : ""
              }`}
              className="flex flex-col items-center justify-center"
            >
              <div
                className={`w-16 md:w-20 h-16 md:h-20 rounded-[20px] flex items-center justify-center mb-1 ${
                  router.query.category &&
                  router.query.category == category.title
                    ? bg300ColorsVariants[category.color]
                    : "bg-zinc-100"
                }`}
              >
                <div className="relative w-10 md:w-11 h-10 md:h-11">
                  <Image src={category.icon} fill alt="" className="" />
                </div>
              </div>
              <div
                className={`font-medium text-sm md:text-base whitespace-nowrap ${
                  router.query.category &&
                  router.query.category == category.title
                    ? "text-zinc-800"
                    : "text-zinc-400"
                }`}
              >
                <span>{category.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
