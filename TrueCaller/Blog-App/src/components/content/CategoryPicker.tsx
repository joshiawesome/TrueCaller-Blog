import React from "react";

import { Dispatch, RootState } from "../../store";
import { connect } from "react-redux";

import { DropDown } from "../reusables/DropDown";

import { UIConstants } from "../../constants/UIConstants";

import "../../styles/CategoryPicker.css";

const CategoryPicker = (props: StateProps & DispatchProps) => {
  const { blogCategoriesData, updateActiveCategory } = props;

  const handleOnCategorySelect = (value: string) => updateActiveCategory(value);

  return (
    <section className="category-picker-wrapper">
      <DropDown
        options={blogCategoriesData}
        onOptionSelect={handleOnCategorySelect}
        placeHolderText={UIConstants.CATEGORY_PICKER_PLACEHOLDER_TEXT}
        containerClass="category-picker-dropdown-wrapper"
      />
    </section>
  );
};

const mapState = (state: RootState) => ({
  blogCategoriesData: state.blogCategories,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateActiveCategory: dispatch.activeCategory.update,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(CategoryPicker);
