import Image from "next/image";

//Images
import chefMakingCoffeeImg from "@/assets/images/hero/chef-making-coffee.png";
import { ArrowLeft, Call, InfoCircle } from "iconsax-react";
import Link from "next/link";
import { Popover } from "@nextui-org/react";

const HeroSection = () => {
  return (
    <section className="w-screen min-h-screen bg-violet-100 flex flex-col items-center justify-between py-8 gap-4">
      <div className="flex flex-col text-7xl font-black text-zinc-700">
        <span>بریم</span>
        <span>کافه</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-[160px] h-[189px] lg:w-[188px] lg:h-[222px] 2xl:w-[220px] 2xl:h-[260px]">
          <Image src={chefMakingCoffeeImg} alt="" fill />
        </div>
        <Popover>
          <Popover.Trigger>
            <button
              type="button"
              className="text-white bg-zinc-700 hover:bg-zinc-900 rounded-full text-4xl lg:text-5xl w-[266px] lg:w-[300px] h-[75px] leading-none flex items-center justify-center font-black hover:scale-105 duration-300"
            >
              بزن بریم
              <ArrowLeft className="w-8 lg:w-9 h-fit mr-1" />
            </button>
          </Popover.Trigger>
          <Popover.Content>
            <div className="text-base lg:text-lg font-semibold text-zinc-900 p-3 max-w-xs text-center">
              <span>
                بزودی شما می‌توانید با کلیک روی این دکمه نقشه ای را پر از کافه
                های اطرافتان مشاهده کنید<div className="br"></div> ممنونیم از
                صبوری شما
              </span>
            </div>
          </Popover.Content>
        </Popover>
      </div>
      <div className="text-zinc-700 font-bold text-4xl xl:text-5xl text-center">
        <span>
          با بریم کافه، کافه
          <br />
          های اطرافتو پیدا کن
        </span>
      </div>
      <div className="text-zinc-700 text-center underline-offset-4 text-xl underline font-bold md:hidden">
        <a href="https://panel.berimcafe.org" target="_blank">
          ورود به بخش فروشندگان
        </a>
      </div>

      <div className="flex items-center justify-around w-full">
        <div className="text-zinc-700 text-center text-xl lg:text-2xl underline underline-offset-4 hover:no-underline font-bold">
          <Link href="/example_cafe/menu">مشاهده نمونه کار منو</Link>
        </div>
        <a
          href="tel:+989127461218"
          className="text-white bg-zinc-700 hover:bg-zinc-900 rounded-full text-4xl w-11 h-11 lg:w-12 lg:h-12 leading-none flex items-center justify-center font-black"
        >
          <Call className="w-5 lg:w-6 h-fit" />
        </a>
        <a
          className="text-zinc-700 text-center text-xl lg:text-2xl underline underline-offset-4 font-bold hidden md:block"
          href="https://panel.berimcafe.org"
          target="_blank"
        >
          ورود به بخش فروشندگان
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
