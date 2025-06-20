import React from "react";

import { Banner } from "../reusables/Banner";
import CategoryPicker from "./CategoryPicker";
import ArticlesList from "./ArticlesList/ArticlesList";
import Footer from "./Footer";

import { UIConstants } from "../../constants/UIConstants";

import "../../styles/HomePage.css";

export const HomePage = () => {
  return (
    <>
      <Banner title={UIConstants.HOME_PAGE_TITLE} />
      <div className="home-page-wrapper">
        <h1 className="title">{UIConstants.CONTENT_TITLE}</h1>
        <CategoryPicker />
        <ArticlesList />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
