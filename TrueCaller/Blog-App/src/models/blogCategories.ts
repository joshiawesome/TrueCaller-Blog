import { createModel } from "@rematch/core";
import type { RootModel } from ".";

export type IBlogCategoriesData = {
  value: string;
  label: string;
}[];

const initialState: IBlogCategoriesData = [];

const blogCategories = createModel<RootModel>()({
  state: initialState,
  reducers: {
    update(_, payload: IBlogCategoriesData): IBlogCategoriesData {
      return payload;
    },
  },
});

export default blogCategories;
