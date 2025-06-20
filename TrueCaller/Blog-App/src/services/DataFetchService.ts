import { store } from "../store";

import { DataProcessingUtils } from "../utils/DataProcessingUtils";

import { APIConstants } from "../constants/APIConstants";

export interface IBlogCategoriesAPIData {
  ID: number;
  name: string;
  slug: string;
}

export interface IBlogArticleAPIData {
  slug: string;
  categories: {
    [key: string]: {
      ID: number;
      name: string;
    };
  };
  post_thumbnail: {
    ID: number;
    URL: string;
  };
  title: string;
  date: Date;
}

export interface IArticleData {
  content: string;
  featured_image: string;
  title: string;
  date: string;
  author: {
    ID: number;
    URL: string;
    avatar_URL: string;
    email: boolean;
    first_name: string;
    last_name: string;
    login: string;
    name: string;
    nice_name: string;
    profile_URL: string;
  };
}

interface IFetchBlogArticlesDataProps {
  pageNumber: string;
  slug?: string;
}

interface IFetchArticleDataProps {
  slug: string;
  callBack?: (props: { isLoading: boolean; data: IArticleData }) => void;
}

interface ITriggerAPIProps {
  url: string;
}

export class DataFetchService {
  static async triggerAPI(props: ITriggerAPIProps) {
    const { url } = props;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch API:", error);
      throw error;
    }
  }

  /**
   * @description
   * fetches the blog articles data based on the choosen category and/or the choosen page
   */
  static async fetchBlogArticlesData(props: IFetchBlogArticlesDataProps) {
    const { pageNumber, slug = null } = props;
    let url = `${APIConstants.BASE_URL}posts?fields=slug,categories,post_thumbnail,title,date&number=${APIConstants.POSTS_PER_PAGE}&page=${pageNumber}`;
    if (slug) url += `&category=${slug}`;

    const { blogArticles, loaders } = store.dispatch;

    // triggering the loader on when fetching the data
    loaders.update({ isArticlesLoading: true });

    DataFetchService.triggerAPI({
      url,
    })
      .then((data) => {
        blogArticles.update(data.posts);
      })
      .catch((error) => {
        loaders.update({ isArticlesLoading: false });
        console.log("Failed to fetch blog articles data", error);
      });
  }

  /**
   * @description
   * fetches the blog categories data
   */
  static async fetchBlogCategoriesData() {
    const url = `${APIConstants.BASE_URL}categories`;

    DataFetchService.triggerAPI({
      url,
    })
      .then((data) => {
        store.dispatch.blogCategories.update(
          DataProcessingUtils.generateCategoriesDropDownData(data.categories)
        );
      })
      .catch((error) => {
        console.log("Failed to fetch blog categories data", error);
      });
  }

  /**
   * @description
   * fetches a article's detailed data for a given post slug
   */
  static async fetchArticleData(props: IFetchArticleDataProps) {
    const { slug, callBack } = props;
    const url = `${APIConstants.BASE_URL}posts/slug:${slug}?fields=featured_image,title,author,content,date`;

    // triggering the loader on when fetching the data
    callBack &&
      callBack({ data: null as unknown as IArticleData, isLoading: true });

    DataFetchService.triggerAPI({
      url,
    })
      .then((data) => {
        // triggering the loader off and hydrating the store after fetching the data
        callBack && callBack({ data, isLoading: false });
      })
      .catch((error) => {
        console.log("Failed to fetch blog article data", error);
      });
  }

  /**
   * @description
   * called on mount of the component
   */
  static async fetchData() {
    await DataFetchService.fetchBlogCategoriesData();
    DataFetchService.fetchBlogArticlesData({
      pageNumber: store.getState().activePage.toString(),
    });
  }
}
