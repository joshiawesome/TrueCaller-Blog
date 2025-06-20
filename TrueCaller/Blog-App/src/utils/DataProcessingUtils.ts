import { IBlogCategoriesAPIData } from "../services/DataFetchService";
import { IBlogCategoriesData } from "../models/blogCategories";

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

export class DataProcessingUtils {
  public static categoryToCategoryColorCodeMap = new Map<number, string>();

  public static generateCategoriesDropDownData = (
    data: IBlogCategoriesAPIData[]
  ): IBlogCategoriesData => {
    DataProcessingUtils.categoryToCategoryColorCodeMap = new Map();
    const dropDownData: IBlogCategoriesData = [];

    data.forEach((item) => {
      const { name = "", slug = "", ID = 0 } = item;

      // storing the color code for each category
      DataProcessingUtils.categoryToCategoryColorCodeMap.set(
        ID,
        getRandomHexColor()
      );

      dropDownData.push({
        value: slug,
        label: name,
      });
    });

    return dropDownData;
  };
}
