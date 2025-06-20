import type { RootModel } from ".";
import { RootState } from "../store";
import { createModel } from "@rematch/core";
import { DataFetchService } from "../services/DataFetchService";

const initialState: string = "";

const activeCategory = createModel<RootModel>()({
  state: initialState,
  reducers: {
    update(_, payload: string): string {
      return payload;
    },
  },
  effects: {
    update: (payload: string, state: RootState) => {
      const { activePage } = state;
      /**
       * @note
       * while updating the active category state, fetch data for the active category and the active page
       */
      DataFetchService.fetchBlogArticlesData({
        slug: payload,
        pageNumber: activePage.toString(),
      });
    },
  },
});

export default activeCategory;
