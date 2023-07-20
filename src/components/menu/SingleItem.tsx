import { FC, useEffect, useState } from "react";
import { Button, Popover } from "@nextui-org/react";
import Image from "next/image";

//Types
import { singleItemProps } from "@/common/types/menu.type";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addNoteBookItem, setNoteBookItemsIds } from "@/store/menu/actions";
import {
  noteItemsIdsSelector,
  noteItemsSelector,
} from "@/store/menu/selectors";

//Tools
import cafeLogoImg from "@/assets/images/cafe-logo.png";
import priceGenerator from "price-generator";
import convertToPersian from "num-to-persian";
import { Heart } from "iconsax-react";
import {
  bg100ColorsVariants,
  bg50ColorsVariants,
  text500ColorsVariants,
} from "@/common/scripts/tailwindColorsList";
import Cookies from "js-cookie";

const SingleItem: FC<singleItemProps> = ({ item, cafe }) => {
  //Redux
  const dispatch = useAppDispatch();
  const noteBookItems = useAppSelector(noteItemsSelector);
  const noteBookItemsIds = useAppSelector(noteItemsIdsSelector);

  //States
  const [notedItemLength, setNotedItemLength] = useState<number>(0);

  //Effects
  useEffect(() => {
    const notedItemsCookies = Cookies.get("noted-items");
    if (notedItemsCookies) {
      const transformedNotedItemsCookies = JSON.parse(
        notedItemsCookies
      ) as string[];
      dispatch(setNoteBookItemsIds(transformedNotedItemsCookies));
    }
  }, []);

  useEffect(() => {
    setNoteBookItemsFunc();
  }, [noteBookItemsIds]);

  //Functions
  async function setNoteBookItemsFunc() {
    if (noteBookItemsIds.length >= 0) {
      let addedItemToList: boolean = !!noteBookItems.find(
        (note) => (note._id as string) == (item._id as string)
      );
      let notedItemCounter = 0;
      for (const i of noteBookItemsIds) {
        if (i == (item._id as string)) {
          if (!addedItemToList) {
            addedItemToList = true;
            await dispatch(addNoteBookItem(item));
          }
          notedItemCounter++;
        }
      }
      setNotedItemLength(notedItemCounter);
    }
  }

  function addToNote() {
    if (notedItemLength >= 99) {
      return;
    }
    Cookies.set(
      "noted-items",
      JSON.stringify([...noteBookItemsIds, item._id as string]),
      {
        expires: 1,
      }
    );
    dispatch(setNoteBookItemsIds([...noteBookItemsIds, item._id as string]));
  }

  function removeFromNote() {
    if (notedItemLength <= 0) {
      return;
    }
    let filterItems = noteBookItemsIds.filter((i) => i == (item._id as string));
    filterItems.pop();
    if (filterItems.length <= 0) {
      Cookies.set(
        "noted-items",
        JSON.stringify([
          ...noteBookItemsIds.filter((i) => i != (item._id as string)),
        ]),
        { expires: 1 }
      );
      dispatch(
        setNoteBookItemsIds([
          ...noteBookItemsIds.filter((i) => i != (item._id as string)),
        ])
      );
    } else {
      Cookies.set(
        "noted-items",
        JSON.stringify([
          ...noteBookItemsIds.filter((i) => i != (item._id as string)),
          ...filterItems,
        ]),
        { expires: 1 }
      );
      dispatch(
        setNoteBookItemsIds([
          ...noteBookItemsIds.filter((i) => i != (item._id as string)),
          ...filterItems,
        ])
      );
    }
  }

  return (
    <div className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 flex items-center justify-center">
      <div
        className={`w-full h-full pt-9 pb-4 shadow ${
          bg50ColorsVariants[item.category.color]
        } rounded-3xl relative flex flex-col items-center justify-center`}
      >
        <div
          className={`min-w-[60px] md:min-w-[75px] h-9 md:h-10 rounded-tr-3xl rounded-bl-3xl ${
            bg100ColorsVariants[item.category.color]
          } flex flex-col items-center justify-center absolute top-0 right-0`}
        >
          <div
            className={`text-sm md:text-base font-bold ${
              text500ColorsVariants[item.category.color]
            }`}
          >
            <span>{convertToPersian(priceGenerator(item.price))}</span>
          </div>
        </div>
        <div className="relative w-24 md:w-28 h-24 md:h-28 rounded-full mb-2">
          {item.thumbnailImage ? (
            <Image
              src={`https://api-panel.berimcafe.org/${item.thumbnailImage}`}
              alt=""
              fill
              className="rounded-full object-cover object-center"
            />
          ) : cafe?.logo ? (
            <Image
              src={`https://api-panel.berimcafe.org/${cafe?.logo}`}
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
        <div className="text-xl md:text-2xl px-2 text-zinc-900 font-extrabold truncate max-w-full">
          <span>{item.title}</span>
        </div>
        <Popover isBordered>
          <Popover.Trigger>
            <div className="text-sm md:text-base px-2 text-zinc-400 mb-4 font-medium truncate max-w-full cursor-pointer hover:text-zinc-600 duration-200">
              <span>{item.description}</span>
            </div>
          </Popover.Trigger>
          <Popover.Content>
            <div className="text-sm md:text-base text-zinc-900 font-medium p-3 max-w-xs">
              <span>{item.description}</span>
            </div>
          </Popover.Content>
        </Popover>

        <div className="flex items-center justify-center px-5 w-full">
          {notedItemLength <= 0 ? (
            <div
              className="text-zinc-900 font-semibold text-sm md:text-base cursor-pointer"
              onClick={addToNote}
            >
              <span className="underline leading-none">افزودن به دفترچه</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                auto
                size={"xs"}
                ghost
                color={"gradient"}
                onClick={addToNote}
              >
                +
              </Button>
              <div className="text-base font-semibold text-zinc-600">
                <span className="leading-none">
                  {convertToPersian(notedItemLength)}
                </span>
              </div>
              <Button
                auto
                size={"xs"}
                ghost
                color={"gradient"}
                onClick={removeFromNote}
              >
                -
              </Button>
            </div>
          )}

          {/* <div>
            <Heart
              className="text-zinc-900 w-[15px] md:w-5 h-fit cursor-pointer"
              variant="Linear"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
