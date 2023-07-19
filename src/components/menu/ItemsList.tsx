import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

//Types
import { itemsListProps } from "@/common/types/menu.type";
import { ICategory } from "@/common/interfaces/categories.interface";
import { IItem } from "@/common/interfaces/menu.interface";

//Components
import SingleItem from "./SingleItem";

const ItemsList: FC<itemsListProps> = ({ categories, cafe }) => {
  //Next
  const router = useRouter();

  //States
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(undefined);
  const [foundItems, setFoundItems] = useState<IItem[] | undefined>(undefined);

  //Effects
  useEffect(() => {
    if (router.query.search && router.query.category) {
      const foundCategory = categories.find(
        (category) => category.title == router.query.category
      );
      if (foundCategory) {
        const searchReg = new RegExp(
          (router.query.search as string).trim(),
          "gi"
        );
        const filterItems: IItem[] = foundCategory.items.filter(
          (item) => item.title.search(searchReg) >= 0
        );
        setFoundItems(undefined);
        setSelectedCategory({ ...foundCategory, items: filterItems });
      } else {
        setSelectedCategory(undefined);
      }
    } else if (router.query.category) {
      const foundCategory = categories.find(
        (category) => category.title == router.query.category
      );
      setFoundItems(undefined);
      if (foundCategory) {
        setSelectedCategory(foundCategory);
      } else {
        setSelectedCategory(undefined);
      }
    } else if (router.query.search) {
      const foundItemsList: IItem[] = [];
      const searchReg = new RegExp(
        (router.query.search as string).trim(),
        "gi"
      );
      categories.forEach((category) =>
        category.items.forEach((item) => {
          if (item.title.search(searchReg) >= 0) {
            foundItemsList.push(item);
          }
        })
      );
      setFoundItems(foundItemsList);
    } else {
      setSelectedCategory(undefined);
      setFoundItems(undefined);
    }
  }, [router.query.category, router.query.search]);

  return (
    <div className="p-3 pt-1 flex-auto overflow-y-auto pb-16 lg:pb-0">
      {foundItems ? (
        <div className="grid grid-cols-12 gap-2 md:gap-3 mb-5">
          {foundItems?.map((item) => (
            <SingleItem key={item._id} cafe={cafe} item={item} />
          ))}
        </div>
      ) : router.query.category ? (
        <div className="grid grid-cols-12 gap-2 md:gap-3 mb-5">
          <div className="text-zinc-900 font-extrabold text-center text-2xl col-span-12 mb-2">
            <span>{selectedCategory?.title}</span>
          </div>
          {selectedCategory?.items?.map((item) => (
            <SingleItem key={item._id} cafe={cafe} item={item} />
          ))}
        </div>
      ) : (
        categories.map((category) =>
          category.items?.length !== 0 ? (
            <div
              key={category._id}
              className="grid grid-cols-12 gap-2 md:gap-3 mb-5"
            >
              <div className="text-zinc-900 font-extrabold text-center text-2xl col-span-12 mb-2">
                <span>{category.title}</span>
              </div>
              {category.items?.map((item) => (
                <SingleItem key={item._id} cafe={cafe} item={item} />
              ))}
            </div>
          ) : null
        )
      )}
    </div>
  );
};

export default ItemsList;
