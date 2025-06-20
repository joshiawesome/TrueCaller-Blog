import React from "react";
import { useNavigate } from "react-router-dom";

import { IBlogArticleAPIData } from "../../../services/DataFetchService";

import { TimeUtils } from "../../../utils/TimeUtils";

import "../../../styles/ArticleCard.css";
import { DataProcessingUtils } from "../../../utils/DataProcessingUtils";

interface IArticleCardProps {
  articleData: IBlogArticleAPIData;
  isDataLoading?: boolean;
}

export const ArticleCard = (props: IArticleCardProps) => {
  const { articleData, isDataLoading = false } = props;
  const navigate = useNavigate();

  const handleScrollToTopAndNavigate = (slug: string) => {
    new Promise(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const checkIfScrollComplete = () => {
        if (window.pageYOffset === 0) {
          navigate(`/article/${slug}`, { state: { slug } });
        } else {
          window.requestAnimationFrame(checkIfScrollComplete);
        }
      };

      window.requestAnimationFrame(checkIfScrollComplete);
    });
  };

  const renderSkeleton = () => {
    return (
      <div className="article-card-wrapper">
        <div className="article-card-container skeleton-card">
          <div className="skeleton header"></div>
          <div className="article-thumbnail-container">
            <div className="skeleton article-thumbnail"></div>
          </div>
          <div className="footer">
            <h4 className="skeleton description"></h4>
            <div className="skeleton time-since"></div>
          </div>
        </div>
      </div>
    );
  };

  const renderDataCard = () => {
    const {
      slug = "",
      post_thumbnail = null,
      title = "",
      categories = {},
      date = new Date(),
    } = articleData ?? {};
    const { URL = null } = post_thumbnail ?? {};
    const { ID, name } = categories?.[Object.keys(categories ?? {})?.[0]] ?? {};

    return (
      <div
        className="article-card-wrapper"
        onClick={() => handleScrollToTopAndNavigate(slug)}
      >
        <div className="article-card-container">
          <div className="header">
            <span
              className="category-tag"
              style={{
                backgroundColor:
                  DataProcessingUtils.categoryToCategoryColorCodeMap.get(ID),
              }}
            ></span>
            <span className="category-name">{name}</span>
          </div>
          <div className="article-thumbnail-container">
            {URL ? (
              <img className="article-thumbnail" src={URL} />
            ) : (
              <div className="article-thumbnail"></div>
            )}
          </div>
          <div className="footer">
            <h4 className="description">{title}</h4>
            <div className="time-since">{TimeUtils.getTimeSince(date)}</div>
          </div>
        </div>
      </div>
    );
  };

  return isDataLoading ? renderSkeleton() : renderDataCard();
};

export default ArticleCard;
