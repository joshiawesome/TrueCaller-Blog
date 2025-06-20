import classNames from "classnames";
import React, { useState } from "react";

import { UIConstants } from "../../constants/UIConstants";

import "../../styles/DropDown.css";

export interface IDropDownOption {
  value: string;
  label: string;
}

interface IDropDownProps {
  options: IDropDownOption[];
  onOptionSelect: (value: string) => void;
  placeHolderText?: string;
  containerClass?: string;
}

export const DropDown = (props: IDropDownProps) => {
  const {
    options,
    onOptionSelect,
    placeHolderText = null,
    containerClass = null,
  } = props;
  const [selectedOption, setSelectedOption] = useState("");

  const handleOnOptionSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedOption(value);
    onOptionSelect(value);
  };

  return (
    <div
      className={classNames({
        "dropdown-wrapper": true,
        ...(containerClass && { [containerClass]: true }),
      })}
    >
      <select
        className="dropdown-select-container"
        value={selectedOption}
        onChange={handleOnOptionSelect}
      >
        <option value={""} className="dropdown-option-container">
          {placeHolderText ?? UIConstants.CUSTOM_DROPDOWN_PLACEHOLDER_TEXT}
        </option>
        {options.map((option) => {
          const { value, label } = option;
          return (
            <option
              key={value}
              value={value}
              className="dropdown-option-container"
            >
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
