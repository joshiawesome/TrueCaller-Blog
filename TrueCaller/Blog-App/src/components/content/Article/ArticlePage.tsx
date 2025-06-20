import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Banner } from "../../reusables/Banner";
import Loader from "../../reusables/Loader";

import {
  DataFetchService,
  IArticleData,
} from "../../../services/DataFetchService";

import { TimeUtils } from "../../../utils/TimeUtils";

import "../../../styles/ArticlePage.css";

export const ArticlePage = () => {
  const [isArticleDataLoading, setIsArticleDataLoading] = useState(false);

  const location = useLocation();
  const [articleData, setArticleData] = useState<IArticleData>();

  const {
    featured_image = "",
    title = "",
    author,
    date = "",
    content = "",
  } = (articleData as IArticleData) ?? {};
  const { name = "", avatar_URL = "", profile_URL = "" } = author ?? {};

  useEffect(() => {
    const slug = location.state?.slug;

    if (slug) {
      DataFetchService.fetchArticleData({
        slug,
        callBack: (callBackProps) => {
          const { isLoading, data } = callBackProps;
          setIsArticleDataLoading(isLoading);
          if (data) setArticleData(data);
        },
      });
    }
  }, []);

  const renderAuthorAvatar = () => {
    return (
      <div className="author-avatar-container">
        <a href={profile_URL}>
          <img className="author-avatar-image" src={avatar_URL}></img>
        </a>
      </div>
    );
  };

  const renderAuthorArticleDetail = () => {
    return (
      <div className="author-article-detail-container">
        <a href={profile_URL}>
          <p className="author-name">{name}</p>
        </a>
        <p className="article-publish-timestamp">
          {TimeUtils.formatArticlePublishedTimeStamp(date)}
        </p>
      </div>
    );
  };

  const renderArticleHeader = () => {
    return (
      <section>
        <h1 className="article-header">{title}</h1>
        <div className="author-details-container">
          {renderAuthorAvatar()}
          {renderAuthorArticleDetail()}
        </div>
      </section>
    );
  };

  const renderArticleContent = () => {
    return (
      <section className="article-content-container">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>
    );
  };

  return (
    <>
      {isArticleDataLoading ? (
        <div className="article-page-loader-wrapper">
          <Loader />
        </div>
      ) : (
        <>
          <Banner
            imageURL={featured_image}
            containerClass="article-page-banner-image"
          />
          <div className="article-page-wrapper">
            {renderArticleHeader()}
            {renderArticleContent()}
          </div>
        </>
      )}
    </>
  );
};

export default ArticlePage;
