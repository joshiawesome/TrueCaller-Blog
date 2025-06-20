import type { RootModel } from ".";
import { createModel } from "@rematch/core";

export interface IInitialState {
  isArticlesLoading: boolean;
}

const initialState: IInitialState = {
  isArticlesLoading: false,
};

const loaders = createModel<RootModel>()({
  state: initialState,
  reducers: {
    update(
      state: IInitialState,
      payload: Partial<IInitialState>
    ): IInitialState {
      return { ...state, ...payload };
    },
  },
});

export default loaders;
