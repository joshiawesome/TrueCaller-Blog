import React from "react";
import { RootState } from "../../../store";
import { connect } from "react-redux";

import { ArticleCard } from "./ArticleCard";
import { IBlogArticleAPIData } from "../../../services/DataFetchService";

import { DUMMY_ARTICLE_DATA } from "../../../constants/ArticlesDataConstants";
import { UIConstants } from "../../../constants/UIConstants";

import "../../../styles/ArticlesList.css";

const ArticlesList = (props: StateProps) => {
  const { blogArticlesData, isArticlesLoading } = props;

  const listData = isArticlesLoading
    ? (DUMMY_ARTICLE_DATA as unknown as IBlogArticleAPIData[])
    : blogArticlesData;

  return (
    <div className="articles-list-wrapper">
      {!isArticlesLoading && !listData.length ? (
        <div className="empty-text">{UIConstants.NO_BLOGS_FOUND}</div>
      ) : (
        listData.map((articleData, index) => {
          return (
            <ArticleCard
              key={`article_${index}`}
              articleData={articleData}
              isDataLoading={isArticlesLoading}
            />
          );
        })
      )}
    </div>
  );
};

const mapState = (state: RootState) => ({
  blogArticlesData: state.blogArticles,
  isArticlesLoading: state.loaders.isArticlesLoading,
});

type StateProps = ReturnType<typeof mapState>;

export default connect(mapState, null)(ArticlesList);
