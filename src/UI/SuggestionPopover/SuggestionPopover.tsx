import React from "react";
import { Popover, Overlay } from "react-bootstrap";
import { SearchTagTerm } from "../../types/types";
import { AutocompleteProps } from "../Autocomplete/Autocomplete";

import styles from "./SuggestionPopover.module.css";

interface SuggestionPopoverProps extends AutocompleteProps {
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  currentTarget: any;
  filteredSuggestions: string[];
  onClick: (e: React.MouseEvent<HTMLLIElement>, name: string) => void;
}

export default function SuggestionPopover(props: SuggestionPopoverProps) {
  const {
    showSuggestions,
    setShowSuggestions,
    color,
    currentTarget,
    searchTagTerm,
    value,
    filteredSuggestions,
    onClick,
  } = props;

  let suggestionsListComponent = null;

  if (showSuggestions && searchTagTerm[value as keyof SearchTagTerm]) {
    if (filteredSuggestions.length) {
      let list = [];
      for (let index = 0; index < filteredSuggestions.length; index++) {
        list.push(
          <li key={index} onClick={(e) => onClick(e, value)}>
            {filteredSuggestions[index]}
          </li>
        );
      }
      suggestionsListComponent = <ul className={styles.Suggestions}>{list}</ul>;
    }
  }

  return (
    <Overlay
      target={currentTarget}
      show={showSuggestions && Boolean(suggestionsListComponent)}
      placement="bottom-start"
      rootClose
      onHide={() => {
        setShowSuggestions(false);
      }}
      transition={true}
    >
      <Popover
        id="suggestions"
        className={styles.Popover}
        style={{
          background: color,
        }}
      >
        {suggestionsListComponent}
      </Popover>
    </Overlay>
  );
}
