import React from "react";
import classNames from "classnames";

import bannerImage from "../../assets/header.jpg";

import "../../styles/Banner.css";

interface IBannerProps {
  imageURL?: string;
  title?: string;
  containerClass?: string;
}

export const Banner = (props: IBannerProps) => {
  const { imageURL = bannerImage, title = null, containerClass = null } = props;

  return (
    <div
      className={classNames({
        "banner-wrapper": true,
        ...(containerClass && { [containerClass]: true }),
      })}
    >
      <header className="banner-wrapper-header">
        <img src={imageURL} className="banner-image" alt="Header" />
        {title && (
          <div className="title-container">
            <h1 className="title">
              <div>{title}</div>
            </h1>
          </div>
        )}
      </header>
    </div>
  );
};
