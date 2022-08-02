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
  if (suggestions.length)
    allList = (
      <ul className={styles.AllSuggestions}>
        {suggestions
          .sort((a, b) => (a < b ? -1 : 1))
          .map((suggestion, index) => (
            <li key={index} onClick={(e) => onClick(e, value)}>
              {suggestion}
            </li>
          ))}
      </ul>
    );

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
