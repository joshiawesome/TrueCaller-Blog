import React from "react";

import truecallerSvg from "../../assets/truecaller.svg";

import "../../styles/Header.css";

interface IHeaderProps {
  redirectURL?: string;
  imageURL?: string;
}

export const Header = (props: IHeaderProps) => {
  const { redirectURL = "/", imageURL = truecallerSvg } = props;

  return (
    <div className="header-wrapper">
      <a href={redirectURL}>
        <img src={imageURL} className="logo" alt="Header" />
      </a>
    </div>
  );
};
