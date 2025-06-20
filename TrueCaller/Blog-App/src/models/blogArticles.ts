import type { RootModel } from ".";
import { createModel } from "@rematch/core";
import { store } from "../store";

import { IBlogArticleAPIData } from "../services/DataFetchService";

const initialState: IBlogArticleAPIData[] = [];

const blogArticles = createModel<RootModel>()({
  state: initialState,
  reducers: {
    update(_, payload: IBlogArticleAPIData[]): IBlogArticleAPIData[] {
      return payload;
    },
  },
  effects: {
    update: () => {
      // triggering the loader off after fetching the data and hydrating the store
      store.dispatch.loaders.update({ isArticlesLoading: false });
    },
  },
});

export default blogArticles;
