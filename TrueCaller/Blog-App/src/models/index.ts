import { Models } from "@rematch/core";
import activeCategory from "./activeCategory";
import activePage from "./activePage";
import blogArticles from "./blogArticles";
import blogCategories from "./blogCategories";
import loaders from "./loaders";

export interface RootModel extends Models<RootModel> {
  activeCategory: typeof activeCategory;
  activePage: typeof activePage;
  blogArticles: typeof blogArticles;
  blogCategories: typeof blogCategories;
  loaders: typeof loaders;
}

export const models: RootModel = {
  activeCategory,
  activePage,
  blogArticles,
  blogCategories,
  loaders,
};
