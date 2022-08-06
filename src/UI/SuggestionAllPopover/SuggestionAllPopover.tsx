import React from "react";
import { Popover, Overlay } from "react-bootstrap";
import { ShowAll } from "../../types/types";
import { AutocompleteProps } from "../Autocomplete/Autocomplete";

import styles from "./SuggestionAllPopover.module.css";

interface SuggestionAllPopoverProps extends AutocompleteProps {
  currentTarget: any;
  filteredSuggestions: string[];
  onClick: (e: React.MouseEvent<HTMLLIElement>, name: string) => void;
}

export default function SuggestionAllPopover(props: SuggestionAllPopoverProps) {
  const {
    showAll,
    setShowAll,
    suggestions,
    color,
    currentTarget,
    value,
    onClick,
  } = props;

  let allList = null;
  if (suggestions.length) {
    const sortedSuggestions = suggestions.sort((a, b) => (a < b ? -1 : 1));
    let list = [];
    for (let index = 0; index < sortedSuggestions.length; index++) {
      list.push(
        <li key={index} onClick={(e) => onClick(e, value)}>
          {sortedSuggestions[index]}
        </li>
      );
    }
    allList = <ul className={styles.AllSuggestions}>{list}</ul>;
  }

  return (
    <Overlay
      target={currentTarget}
      show={showAll[value as keyof ShowAll] && Boolean(allList)}
      placement="bottom-start"
      rootClose
      onHide={() => {
        setShowAll({
          ...showAll,
          [value as keyof ShowAll]: false,
        });
      }}
      transition={true}
    >
      <Popover
        id="all"
        className={styles.AllPopover}
        style={{
          background: color,
        }}
      >
        {allList}
      </Popover>
    </Overlay>
  );
}
