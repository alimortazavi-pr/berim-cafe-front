import { GetServerSideProps } from "next";
import { FC } from "react";
import Head from "next/head";

//Types
import { ICategory } from "@/common/interfaces/categories.interface";
import { menuProps } from "@/common/types/menu.type";
import { ICafe } from "@/common/interfaces/cafes.interface";

//Components
import NavBar from "@/components/layouts/NavBar";
import SearchInput from "@/components/menu/SearchInput";
import TabBar from "@/components/layouts/TabBar";
import CategoriesList from "@/components/menu/CategoriesList";
import ItemsList from "@/components/menu/ItemsList";

//Tools
import api from "@/common/api";

const Menu: FC<menuProps> = ({ categories, cafe }) => {
  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <NavBar title={`منو آنلاین`} cafe={cafe} />
      <Head>
        <title>{cafe?.name} | بریم کافه</title>
      </Head>
      <SearchInput />
      <CategoriesList categories={categories} />
      <ItemsList categories={categories} cafe={cafe} />
      <TabBar cafe={cafe} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  let categories: ICategory[] = [];
  let cafe: ICafe;
  try {
    //Get Cafe
    const cafeResponse = await api.get(`/cafes/profile/${query.username}`);
    cafe = cafeResponse.data.cafe;
    //Get Categories
    const categoriesResponse = await api.get(`/categories/${query.username}`);
    categories = categoriesResponse.data.categories;
  } catch (error: any) {
    if (error.response?.data?.statusCode == 404) {
      return {
        notFound: true,
      };
    } else {
      throw new Error(error.response?.data?.message || error);
    }
  }

  return {
    props: {
      categories,
      cafe,
    },
  };
};

export default Menu;
