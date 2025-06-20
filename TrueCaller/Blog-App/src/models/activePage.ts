import type { RootModel } from ".";
import { RootState } from "../store";
import { createModel } from "@rematch/core";
import { DataFetchService } from "../services/DataFetchService";

const initialState: number = 1;

const activePage = createModel<RootModel>()({
  state: initialState,
  reducers: {
    update(_, payload: number): number {
      return payload;
    },
  },
  effects: {
    update: (payload: number, state: RootState) => {
      const { activeCategory } = state;
      /**
       * @note
       * while updating the active page state, fetch data for the active category and the active page
       */
      DataFetchService.fetchBlogArticlesData({
        slug: activeCategory,
        pageNumber: payload.toString(),
      });
    },
  },
});

export default activePage;
