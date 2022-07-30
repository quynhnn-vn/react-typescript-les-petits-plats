import React from "react";
import { Popover, Overlay } from "react-bootstrap";
import { CurrentInput } from "../../types/types";
import { AutocompleteProps } from "../Autocomplete/Autocomplete";

import styles from "./SuggestionPopover.module.css";

interface SuggestionPopoverProps extends AutocompleteProps {
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  currentTarget: any;
  filteredSuggestions: string[];
  activeSuggestion: number;
  onClick: (e: React.MouseEvent<HTMLLIElement>, name: string) => void;
}

export default function SuggestionPopover(props: SuggestionPopoverProps) {
  const {
    showSuggestions,
    setShowSuggestions,
    variant,
    currentTarget,
    currentInput,
    value,
    filteredSuggestions,
    activeSuggestion,
    onClick,
  } = props;

  let suggestionsListComponent = <></>;

  if (showSuggestions && currentInput[value as keyof CurrentInput]) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className={styles.Suggestions}>
          {filteredSuggestions.map((suggestion: string, index: number) => {
            let className: string = "";

            if (index === activeSuggestion) {
              className = styles.SuggestionActive;
            }

            return (
              <li
                className={className}
                key={suggestion}
                onClick={(e) => onClick(e, value)}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className={styles.NoSuggestions}>No suggestions</div>
      );
    }
  }

  return (
    <Overlay
      target={currentTarget}
      show={showSuggestions}
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
          background: variant,
        }}
      >
        {suggestionsListComponent}
      </Popover>
    </Overlay>
  );
}
